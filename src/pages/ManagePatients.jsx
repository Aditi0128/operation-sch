import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { logger } from "../lib/logger";

const log = logger("ManagePatients");

export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const snap = await getDocs(collection(db, "patients"));
      setPatients(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      log.error(err);
    }
  }

  async function addPatient(e) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addDoc(collection(db, "patients"), {
        name,
        createdAt: new Date().toISOString(),
      });
      setName("");
      fetchPatients();
    } catch (err) {
      log.error(err);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-lg mx-auto">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">
        Manage Patients
      </h4>

      <form onSubmit={addPatient} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Patient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {patients.map((p) => (
          <li
            key={p.id}
            className="bg-gray-50 px-4 py-2 rounded-lg shadow-sm text-gray-700"
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
