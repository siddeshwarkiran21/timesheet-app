"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  
    if (res?.error) {
      alert("Invalid credentials");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-100">
          <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>

          {/* Email */}
          <label className="text-sm text-gray-600">Email</label>
          <input
            className="border rounded-lg p-3 w-full mt-1 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="border rounded-lg p-3 w-full mt-1 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember */}
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Remember me</span>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-lg font-medium"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-blue-600 text-white flex items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">ticktock</h1>
          <p className="text-sm leading-relaxed opacity-90">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours.
            With ticktock, you can effortlessly track and monitor employee
            attendance and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}