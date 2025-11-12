"use client";

import Link from "next/link";
import { signOutAction } from "@/actions/auth-action";

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-orange-50 items-center w-full px-10 py-5">
      <Link href="/home" className="text-3xl font-bold text-orange-700">
        ☕ Chai Lelo
      </Link>
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
          <button className="cursor-pointer" onClick={() => signOutAction()}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
