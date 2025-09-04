import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { logger } from "../lib/logger";

const log = logger("ManageDoctors");

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      const snap = await getDocs(collection(db, "doctors"));
      setDoctors(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      log.error(err);
    }
  }

  async function addDoctor(e) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addDoc(collection(db, "doctors"), {
        name,
        createdAt: new Date().toISOString(),
      });
      setName("");
      fetchDoctors();
    } catch (err) {
      log.error(err);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-lg mx-auto">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">
        Manage Doctors
      </h4>

      <form onSubmit={addDoctor} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Doctor name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {doctors.map((d) => (
          <li
            key={d.id}
            className="bg-gray-50 px-4 py-2 rounded-lg shadow-sm text-gray-700"
          >
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
