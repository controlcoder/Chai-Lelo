"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function QRSCANNER() {
  // const { data: session, status } = useSession();
  // if (status === "unauthenticated") {
  //   return redirect("/");
  // }

  // if (!session) {
  //   return <p>Loading...</p>;
  // }

  return (
    <main className="min-h-screen bg-orange-50 text-center flex flex-col justify-center items-center gap-3">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-red-700">
        Scan the QR given below and pay
      </h1>
      <Image
        src="/qr-scanner.jpg"
        alt="qr-image"
        width={300}
        height={300}
      ></Image>
    </main>
  );
}
