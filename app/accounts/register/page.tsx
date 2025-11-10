"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { username, email, password, role } = form;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/accounts/login");
      }
    } catch (err: any) {
      console.log("Something went wrong");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-amber-900">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="border w-full p-2 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border w-full p-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border w-full p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a
            href="/accounts/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </section>
  );
}
