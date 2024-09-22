"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

interface LoginData {
  user_name: string;
  password: string;
}

export default function Home() {
  const [loginData, setLoginData] = useState<LoginData>({
    user_name: "",
    password: "",
  });

  const signUpStatus = () => {
    const sessionStorage = JSON.parse(
      window.sessionStorage.getItem("sessionStorage") || "{}"
    );
    if (sessionStorage.signUpStatus === true) {
      window.sessionStorage.removeItem("sessionStorage");
      toast.success("Login Successful");
    }
  };

  useEffect(() => {
    signUpStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.user_name || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: loginData.user_name,
        password: loginData.password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 200) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="w-[35%] h-fit p-7 bg-white rounded-md shadow-lg border border-gray-200">
          <div>
            <h1 className="text-center text-2xl font-bold mb-4">SIGN IN</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <label className="block font-semibold mb-1 text-gray-700">
                User Name
              </label>
              <input
                type="text"
                name="user_name"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              />

              <label className=" block mb-1 font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              />

              <div>
                <button className="w-full font-bold px-3 py-2 bg-blue-500 text-white rounded-md mb-5">
                  Login
                </button>
              </div>
            </form>
          </div>

          <div className="w-full text-center">
            <p className="text-sm">Don't have an account</p>
            <Link href="/signup" className="text-blue-500 font-bold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
