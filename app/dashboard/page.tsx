"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TimesheetModal from "@/components/TimesheetModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [timesheets, setTimesheets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const router = useRouter();


  const { data: session } = useSession();

  const fetchData = async () => {
    const res = await axios.get("/api/timesheets");
    setTimesheets(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Missing":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
        <h1 className="text-lg font-semibold">ticktock</h1>
        <span className="text-sm text-gray-600">
  {session?.user?.name}
</span>
      </div>

      {/* CONTENT */}
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Timesheets</h2>

          {/* FILTERS */}
          <div className="flex gap-3 mb-4">
            <select className="border rounded px-3 py-2 text-sm">
              <option>Date Range</option>
            </select>
            <select className="border rounded px-3 py-2 text-sm">
              <option>Status</option>
            </select>
          </div>

          {/* TABLE */}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">WEEK #</th>
                <th className="py-3">DATE</th>
                <th className="py-3">STATUS</th>
                <th className="py-3 text-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {timesheets.map((item: any) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">{item.week}</td>
                  <td className="py-3">{item.date}</td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 text-right">
                    {/* <button
                      onClick={() => {
                        setEditData(item);
                        setIsOpen(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      {item.status === "Missing" ? "Create" : "Edit"}
                    </button> */}
                    <button
                      onClick={() => router.push(`/timesheet/${item.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      {item.status === "Completed" ? "View" : "Update"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-4">
            <select className="border rounded px-2 py-1 text-sm">
              <option>5 per page</option>
            </select>

            <div className="text-sm text-gray-500">
              Previous 1 2 3 ... Next
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-xs text-gray-400 mt-6">
          © 2024 tentwenty. All rights reserved.
        </div>
      </div>

      {/* MODAL */}
      <TimesheetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={fetchData}
        editData={editData}
      />
    </div>
  );
}