"use client";

import { useState } from "react";

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  selectedDay,
}: any) {
  const [project, setProject] = useState("Project Name");
  const [type, setType] = useState("Bug fixes");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(4);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!description) {
      alert("Description is required");
      return;
    }

    onSave({
      project,
      type,
      description,
      hours,
      date: selectedDay,
    });

    setDescription("");
    setHours(4);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Entry</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select Project *</label>
            <select
              className="w-full border rounded-lg p-2 mt-1"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option>Project Name</option>
              <option>Project A</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Type of Work *</label>
            <select
              className="w-full border rounded-lg p-2 mt-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Bug fixes</option>
              <option>Feature</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Task description *
            </label>
            <textarea
              className="w-full border rounded-lg p-2 mt-1 h-24"
              placeholder="Write text here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Hours *</label>
            <div className="flex items-center mt-1 border rounded-lg w-fit">
              <button
                className="px-3"
                onClick={() => setHours((h) => Math.max(0, h - 1))}
              >
                -
              </button>
              <span className="px-4">{hours}</span>
              <button
                className="px-3"
                onClick={() => setHours((h) => h + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Add entry
          </button>

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}