"use client"

import Link from "next/link";

export default function Navbar() {
  async function handleLogout() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await response.json();
    if (data.success) {
      console.log("Logout successfully");
    }
  }
  return (
    <nav className="flex justify-between bg-orange-50 items-center w-full px-10 py-5">
      <Link href="/home" className="text-3xl font-bold text-orange-700">☕ Chai Lelo</Link>
      <ul className="flex gap-8 text-lg">
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/home/order">Order</Link>
        </li>
        <li>
          <Link href="/home/qr-scanner">QR Scanner</Link>
        </li>
        <li>
          <Link href="/" onClick={() => handleLogout()}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
