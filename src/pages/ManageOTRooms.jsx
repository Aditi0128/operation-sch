// src/pages/ManageOTRooms.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function ManageOTRooms() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

  // Fetch OT Rooms from Firestore
  const fetchRooms = async () => {
    try {
      const snapshot = await getDocs(collection(db, "otRooms"));
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRooms(list);
    } catch (err) {
      console.error("Error fetching OT rooms:", err);
    }
  };

  // Add new OT Room
  const addRoom = async () => {
    if (!roomName.trim()) return alert("Please enter OT room name");
    try {
      await addDoc(collection(db, "otRooms"), { name: roomName });
      setRoomName("");
      fetchRooms();
    } catch (err) {
      console.error("Error adding OT room:", err);
    }
  };

  // Delete OT Room
  const removeRoom = async (id) => {
    if (!window.confirm("Delete this OT room?")) return;
    try {
      await deleteDoc(doc(db, "otRooms", id));
      fetchRooms();
    } catch (err) {
      console.error("Error deleting OT room:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h3 className="mb-2">Manage OT Rooms</h3>

      {/* OT Room Input */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter OT room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button onClick={addRoom}>Add</button>
      </div>

      {/* OT Room List */}
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="flex justify-between mb-1">
            {room.name}
            <button onClick={() => removeRoom(room.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
