"use client";

import TaskModal from "@/components/TaskModal";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// ✅ Dynamic week
const getCurrentWeekDays = () => {
  const today = new Date();
  const day = today.getDay();

  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));

  const week = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    week.push(
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );
  }

  return week;
};

export default function ClientComponent() {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [tasksByDay, setTasksByDay] = useState<any>({});
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<any>(null);

  const days = getCurrentWeekDays();

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`tasks-${id}`);
    if (stored) {
      setTasksByDay(JSON.parse(stored));
    }
  }, [id]);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem(`tasks-${id}`, JSON.stringify(tasksByDay));
  }, [tasksByDay, id]);

  // ➕ Add / Edit
  const handleAddTask = (task: any) => {
    setTasksByDay((prev: any) => {
      if (editTask) {
        const updated = [...prev[task.date]];
        updated[editTask.index] = task;

        return {
          ...prev,
          [task.date]: updated,
        };
      }

      return {
        ...prev,
        [task.date]: [...(prev[task.date] || []), task],
      };
    });

    setEditTask(null);
  };

  // ❌ Delete
  const handleDelete = (day: string, index: number) => {
    setTasksByDay((prev: any) => {
      const updated = [...prev[day]];
      updated.splice(index, 1);

      return {
        ...prev,
        [day]: updated,
      };
    });

    setActiveMenu(null);
  };

  // ✏️ Edit
  const handleEdit = (day: string, index: number) => {
    const task = tasksByDay[day][index];

    setSelectedDay(day);
    setEditTask({ ...task, index });
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  // ⏱ Progress
  const totalHours = Object.values(tasksByDay)
    .flat()
    .reduce((sum: number, task: any) => sum + task.hours, 0);

  const maxHours = 40;
  const progress = (totalHours / maxHours) * 100;

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
          <h1 className="text-lg font-semibold">ticktock</h1>
          <span className="text-sm text-gray-600">John Doe</span>
        </div>

        <div className="p-4 md:p-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
              This week’s timesheet
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {days[0]} - {days[days.length - 1]}
            </p>

            {/* PROGRESS */}
            <div className="flex justify-end items-center mb-4">
              <span className="text-sm mr-3">
                {totalHours}/{maxHours} hrs
              </span>
              <div className="w-40 bg-gray-200 h-2 rounded">
                <div
                  className="bg-orange-500 h-2 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* LIST */}
            {days.map((day) => (
              <div key={day} className="mb-4">
                <h3 className="text-sm font-medium mb-2">{day}</h3>

                {(tasksByDay[day] || []).map(
                  (task: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border rounded p-3 mb-2 relative"
                    >
                      <span>{task.description}</span>

                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {task.hours} hrs
                        </span>

                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {task.project}
                        </span>

                        <button
                          onClick={() =>
                            setActiveMenu(`${day}-${index}`)
                          }
                          className="px-2"
                        >
                          ⋯
                        </button>
                      </div>

                      {activeMenu === `${day}-${index}` && (
                        <div className="absolute right-3 top-12 bg-white border rounded shadow-md w-24 z-10">
                          <button
                            onClick={() =>
                              handleEdit(day, index)
                            }
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(day, index)
                            }
                            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )
                )}

                <div
                  onClick={() => {
                    setSelectedDay(day);
                    setEditTask(null);
                    setIsModalOpen(true);
                  }}
                  className="border-dashed border p-3 text-center text-blue-600 text-sm cursor-pointer"
                >
                  + Add new task
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-gray-400 mt-6">
            © 2024 tentwenty. All rights reserved.
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
        selectedDay={selectedDay}
        editData={editTask}
      />
    </>
  );
}