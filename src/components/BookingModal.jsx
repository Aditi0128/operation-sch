// src/components/BookingModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    otId: "",
    date: "",
    startTime: "",
    endTime: "",
    procedure: "",
    anesthesiaType: "",
    anesthesiologist: "",
    assistants: [],
    nurses: [],
    preOps: [],
    postOps: [],
    remarks: "",
    notes: "",
    specialItems: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        patientId: initialData?.patientId || "",
        patientName: initialData?.patientName || "",
        doctorId: initialData?.doctorId || "",
        doctorName: initialData?.doctorName || "",
        otId: initialData?.otId || "",
        date: initialData?.start
          ? new Date(initialData.start).toISOString().split("T")[0]
          : "",
        startTime: initialData?.start
          ? new Date(initialData.start).toTimeString().slice(0, 5)
          : "",
        endTime: initialData?.end
          ? new Date(initialData.end).toTimeString().slice(0, 5)
          : "",
        procedure: initialData?.procedure || "",
        anesthesiaType: initialData?.anesthesiaType || "",
        anesthesiologist: initialData?.anesthesiologist || "",
        assistants: initialData?.assistants || [],
        nurses: initialData?.nurses || [],
        preOps: initialData?.preOps || [],
        postOps: initialData?.postOps || [],
        remarks: initialData?.remarks || "",
        notes: initialData?.notes || "",
        specialItems: initialData?.specialItems || "",
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const start =
      formData.date && formData.startTime
        ? new Date(`${formData.date}T${formData.startTime}`).toISOString()
        : null;
    const end =
      formData.date && formData.endTime
        ? new Date(`${formData.date}T${formData.endTime}`).toISOString()
        : null;

    if (!formData.otId) return alert("OT ID is required");
    if (!start || !end) return alert("Start and End time are required");

    onSave({
      ...formData,
      start,
      end,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh] border border-gray-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gradient bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {initialData?.id
                  ? "Edit OT Booking"
                  : "Operation Theater Booking"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4">
              {/* Patient / Doctor Info */}
              {[
                { label: "Patient ID", name: "patientId" },
                { label: "Patient Name", name: "patientName" },
                { label: "Doctor ID", name: "doctorId" },
                { label: "Doctor Name", name: "doctorName" },
                { label: "OT ID", name: "otId" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition duration-150 hover:shadow-md"
                  />
                </div>
              ))}

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition duration-150 hover:shadow-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition duration-150 hover:shadow-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition duration-150 hover:shadow-md"
                  />
                </div>
              </div>

              {/* OT Details */}
              {[
                { label: "Procedure", name: "procedure" },
                { label: "Anesthesia Type", name: "anesthesiaType" },
                { label: "Anesthesiologist", name: "anesthesiologist" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition duration-150 hover:shadow-md"
                  />
                </div>
              ))}

              {/* Comma-separated fields */}
              {[
                { label: "Assistants", name: "assistants" },
                { label: "Nurses", name: "nurses" },
                { label: "Pre-Op Notes", name: "preOps" },
                { label: "Post-Op Notes", name: "postOps" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    {field.label} (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData[field.name].join(", ")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.name]: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      }))
                    }
                    className="border border-gray-300 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition duration-150 hover:shadow-md"
                  />
                </div>
              ))}

              {/* Textareas */}
              {[
                { label: "Remarks", name: "remarks", rows: 2 },
                { label: "Special Items", name: "specialItems", rows: 2 },
                { label: "Notes", name: "notes", rows: 3 },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    {field.label}
                  </label>
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    rows={field.rows}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition duration-150 hover:shadow-md resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
