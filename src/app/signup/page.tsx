"use client"

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface SignUpData {
  user_name: string;
  password: string;
  confirm_password: string;
}

export default function SignUp() {

  interface responseData {
    status: number;
    message: string;
  }

  const router = useRouter();
  const [signUpData, setSignUpData] = useState<SignUpData>({
    user_name: "",
    password: "",
    confirm_password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      signUpData.user_name === "" ||
      signUpData.password === "" ||
      signUpData.confirm_password === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (signUpData.password !== signUpData.confirm_password) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    const response: Response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { Content_type: "application/json" },
      body: JSON.stringify({
        user_name: signUpData.user_name,
        password: signUpData.password,
      }),
    });
    const data: responseData = await response.json();
    if (data.status === 200) {
      window.sessionStorage.setItem(
        "sessionStorage",
        JSON.stringify({ signUpStatus: true })
      );
      router.push("/");
    } else {
      toast.error(data.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="w-[35%] h-fit p-7 bg-white rounded-md border border-gray-300">
          <h1 className="text-center text-2xl font-bold mb-4">Sign Up</h1>

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

              <label className=" block mb-1 font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
              />
              <div>
                <button className="w-full font-bold px-3 py-2 bg-blue-500 text-white rounded-md mb-5">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="w-full text-center">
            <p className="text-sm">Already have an account</p>
            <Link href="/" className="text-blue-500 font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
