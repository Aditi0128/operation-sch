// src/modules/OTScheduler.jsx
import React, { useEffect, useState, useCallback } from "react";
import "./OTSchedular.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  listSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../services/otService";
import BookingModal from "../components/BookingModal";
import { logger } from "../lib/logger";
import { useAuth } from "../context/Authcontext";
const log = logger("OTScheduler");

const localizer = momentLocalizer(moment);

export default function OTScheduler({ role = "receptionist" }) {
  const { user, role: myRole, loading } = useAuth();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    try {
      const raw = await listSchedules();
      const ev = raw.map((d) => ({
        id: d.id,
        title: `${d.patientName || "Patient"} • ${d.otId}`,
        start: new Date(d.start),
        end: new Date(d.end),
        allDay: false,
        resource: d,
      }));
      setEvents(ev);
    } catch (err) {
      log.error("fetchEvents failed", err);
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onSelectSlot = (slotInfo) => {
    setSelectedEvent({
      start: slotInfo.start.toISOString(),
      end: slotInfo.end.toISOString(),
    });
    setModalOpen(true);
  };

  const onSelectEvent = (ev) => {
    const resource = ev.resource || {};
    setSelectedEvent({ ...resource, id: resource.id });
    setModalOpen(true);
  };

  const handleDelete = async (ev) => {
    if (!ev || !ev.resource) return;
    if (!window.confirm("Delete this booking?")) return;
    try {
      await deleteSchedule(ev.resource.id);
      fetchEvents();
    } catch (err) {
      alert("Delete failed: " + (err.message || err));
    }
  };

  const handleSave = async (data) => {
    try {
      if (data.id) {
        await updateSchedule(data.id, data);
      } else {
        await createSchedule(data);
      }
      setModalOpen(false);
      setSelectedEvent(null);
      fetchEvents();
    } catch (err) {
      alert("Save failed: " + (err.message || err));
    }
  };

  if (loading || loadingEvents) {
    return <div className="p-6">Loading schedules...</div>;
  }

  const displayedEvents = events.filter((e) => {
    if (role === "doctor") return e.resource?.doctorId === user?.uid || true;
    return true;
  });

  return (
    <div className="scheduler-inner">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">OT Schedule</h3>
        <h4 className="text-gray-500 font-semibold "> Please select the time block on the calender to schedule.</h4>
        {role !== "doctor" && (
          <button
            className="px-3 py-1 border rounded"
            onClick={() => {
              setSelectedEvent(null);
              setModalOpen(true);
            }}
          >
            Add Booking
          </button>
        )}
      </div>

      <div style={{ height: "600px" }}>
        <Calendar
          localizer={localizer}
          events={displayedEvents}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          defaultView="week"
          views={["week", "day", "agenda"]}
          eventPropGetter={(event) => {
            if (role === "doctor" && event.resource?.doctorId === user?.uid) {
              return { className: "event-mine" };
            }
            if (role === "doctor") {
              return { className: "event-others" };
            }
            return {};
          }}
        />
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedEvent(null);
        }}
        onSave={handleSave}
        initialData={selectedEvent}
      />
    </div>
  );
}
