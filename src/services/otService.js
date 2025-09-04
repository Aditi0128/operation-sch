// src/services/otService.js
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { logger } from "../lib/logger";
const log = logger("otService");

const COL = collection(db, "otSchedules");

/**
 * Convert ISO / Date strings to JS Date safely
 */
function toDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
}

/**
 * checkOverlap: returns true if there's an overlap with any existing schedule
 * for the same otId excluding an optional excludeId (used on update).
 * We query all schedules for otId and test client-side.
 */
export async function checkOverlap({
  otId,
  startIso,
  endIso,
  excludeId = null,
}) {
  const q = query(COL, where("otId", "==", otId));
  const snap = await getDocs(q);
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();

  for (const d of snap.docs) {
    if (excludeId && d.id === excludeId) continue;
    const data = d.data();
    const s = toDate(data.start).getTime();
    const e = toDate(data.end).getTime();
    // overlap if start < e and end > s
    if (start < e && end > s) {
      return { overlap: true, conflict: { id: d.id, ...data } };
    }
  }
  return { overlap: false };
}

/**
 * createSchedule - creates a new OT schedule document with double-book check
 * scheduleData should include start (ISO), end (ISO), otId, patientName, etc.
 */
export async function createSchedule(scheduleData) {
  try {
    const { otId, start, end } = scheduleData;
    if (!otId || !start || !end)
      throw new Error("otId, start and end are required");

    const overlapCheck = await checkOverlap({
      otId,
      startIso: start,
      endIso: end,
    });
    if (overlapCheck.overlap) {
      throw new Error(
        `Double booking detected with schedule ${overlapCheck.conflict.id}`
      );
    }

    const payload = {
      ...scheduleData,
      status: scheduleData.status || "scheduled",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(COL, payload);
    log.info("createSchedule", docRef.id);
    return { id: docRef.id, ...payload };
  } catch (err) {
    log.error("createSchedule failed", err);
    throw err;
  }
}

/**
 * updateSchedule - update fields of a schedule. If changing time/otId, also check overlap
 */
export async function updateSchedule(id, patch) {
  try {
    const ref = doc(db, "otSchedules", id);
    // If changing start/end/otId, run overlap check
    const needsCheck = patch.otId || patch.start || patch.end;
    if (needsCheck) {
      // get existing doc to compute values
      const existingSnap = await getDoc(ref);
      if (!existingSnap.exists()) throw new Error("Schedule not found");
      const existing = existingSnap.data();

      const otId = patch.otId || existing.otId;
      const start = patch.start || existing.start;
      const end = patch.end || existing.end;

      const overlapCheck = await checkOverlap({
        otId,
        startIso: start,
        endIso: end,
        excludeId: id,
      });
      if (overlapCheck.overlap) {
        throw new Error(
          `Double booking detected with schedule ${overlapCheck.conflict.id}`
        );
      }
    }

    await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() });
    log.info("updateSchedule", id, patch);
    return true;
  } catch (err) {
    log.error("updateSchedule failed", err);
    throw err;
  }
}

/**
 * deleteSchedule - remove schedule
 */
export async function deleteSchedule(id) {
  try {
    await deleteDoc(doc(db, "otSchedules", id));
    log.info("deleteSchedule", id);
    return true;
  } catch (err) {
    log.error("deleteSchedule failed", err);
    throw err;
  }
}

/**
 * getSchedule - get single schedule by id
 */
export async function getSchedule(id) {
  const snap = await getDoc(doc(db, "otSchedules", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * listSchedules - basic list query; accepts optional filters:
 * { fromIso, toIso, otId, doctorId, status }
 */
export async function listSchedules({
  fromIso,
  toIso,
  otId,
  doctorId,
  status,
} = {}) {
  // Simple approach: fetch all and filter client-side ordering by start
  const q = query(COL, orderBy("start"));
  const snap = await getDocs(q);
  let arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (otId) arr = arr.filter((s) => s.otId === otId);
  if (doctorId) arr = arr.filter((s) => s.doctorId === doctorId);
  if (status) arr = arr.filter((s) => s.status === status);
  if (fromIso) {
    const fromTs = new Date(fromIso).getTime();
    arr = arr.filter((s) => new Date(s.start).getTime() >= fromTs);
  }
  if (toIso) {
    const toTs = new Date(toIso).getTime();
    arr = arr.filter(
      (s) => new Date(s.end).getTime() <= new Date(toIso).getTime()
    );
  }
  return arr;
}
