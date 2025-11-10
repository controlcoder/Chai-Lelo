"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "ritik@gmail.com",
    password: "1234",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const res: Response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Login successfully");
        router.push("/home");
      }
    } catch (err: any) {
      console.log("Something went wrong", err);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Login to Chai Lelo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-amber-900">
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
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/accounts/register"
            className="text-orange-600 font-semibold hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </section>
  );
}
