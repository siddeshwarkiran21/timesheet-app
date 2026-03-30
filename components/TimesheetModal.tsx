"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function TimesheetModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: any) {
  const [week, setWeek] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editData) {
      setWeek(editData.week);
      setDate(editData.date);
      setStatus(editData.status);
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!week || !date) {
      alert("All fields required");
      return;
    }

    if (editData) {
      await axios.put(`/api/timesheets/${editData.id}`, {
        week,
        date,
        status,
      });
    } else {
      await axios.post("/api/timesheets", {
        week,
        date,
        status,
      });
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-lg mb-4">
          {editData ? "Edit" : "Add"} Timesheet
        </h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 w-full mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full p-2"
        >
          Save
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full border p-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}