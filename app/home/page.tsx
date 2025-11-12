"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  // const { data: session, status } = useSession();
  // if (status === "unauthenticated") {
  //   return redirect("/");
  // }

  // if (!session) {
  //   return <p>Loading...</p>;
  // }

  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center justify-center text-gray-800">
      <section className="flex flex-col md:flex-row items-center justify-between w-full px-10 py-16 max-w-6xl">
        <div className="flex-1">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-orange-700">
            Fresh <span className="text-gray-900">Food Delivery</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Enjoy homemade lunch and dinner meals delivered right to your
            doorstep.
          </p>

          <div className="flex gap-6">
            <Link
              href="/home/order"
              className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-orange-700 transition"
            >
              Order Now
            </Link>
          </div>
        </div>

        <div className="flex-1 mt-10 md:mt-0 relative flex justify-center">
          <Image
            src="/hero.png"
            alt="Food items"
            width={500}
            height={500}
            className="drop-shadow-lg"
          />
        </div>
      </section>
      <footer className="mt-16 text-gray-500 text-sm py-6">
        © 2025 Chai Lelo — Best Chai in Town ☕
      </footer>
    </main>
  );
}
