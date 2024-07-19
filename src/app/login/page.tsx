"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/common/Loader";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  const onLogin = async () => {
    console.log("hello");

    if (!user.email || !user.password) {
      if (!user.email) {
        toast.error("Please enter your Email");
      }
      if (!user.password) {
        toast.error("Please enter your Password");
      }
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log(response);
        if (response.data.tokenData.role == "admin") {
          router.push("/");
        } else {
          alert("Wrong Credential");
        }
      } catch (error: any) {
        setUser({
            email : "",
            password : ""
        })
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center py-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="text-gray-800 mb-4 text-center text-3xl font-semibold">
            {loading ? "Login" : "Processing..."}
          </h1>
          <hr className="mb-4" />

          <label
            htmlFor="email"
            className="text-gray-700 mb-1 block text-sm font-medium"
          >
            Email Address
          </label>
          <input
            className="border-gray-300 mb-4 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />

          <label
            htmlFor="password"
            className="text-gray-700 mb-1 block text-sm font-medium"
          >
            Password
          </label>
          <input
            className="border-gray-300 mb-6 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />

          <button
            className="w-full cursor-pointer rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600 focus:outline-none"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}