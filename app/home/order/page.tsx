"use client";

import { useState, useEffect } from "react";

export default function OrderPage() {

  const [orderText, setOrderText] = useState("");
  const [orders, setOrders] = useState<any>({});
  const [dates, setDates] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderText.trim()) return alert("Please write your order!");
    const res: Response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: orderText }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Order placed successfully!");
      setOrderText("");
      fetchOrders();
    } else {
      alert("Failed to place order");
    }
  };

  const handlePayment = async (e: any, orderId: string, userEmail: object) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userEmail", JSON.stringify(userEmail));
      formData.append("orderId", orderId);
      const res = await fetch("/api/payment", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      }
    }
  };

  const handleDelete = async (orderId: string) => {
    const res = await fetch("/api/order", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();
    if (data.success) {
      fetchOrders();
    }
  };

  const handleUpdate = async (orderId: string, food: string) => {
    setOrderText(food);
    handleDelete(orderId);
  };

  const fetchOrders = async () => {
    const res = await fetch("/api/order");
    const responseData = await res.json();
    const dates = Object.keys(responseData.grouped);
    setOrders(responseData.grouped);
    setDates(dates);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="flex flex-col items-center min-h-screen bg-orange-50 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-4 text-orange-700 ">
          Place Your Order ☕
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={orderText}
            onChange={(e) => setOrderText(e.target.value)}
            placeholder="Write your order here..."
            className="border w-full p-3 rounded-md h-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            Submit Order
          </button>
        </form>
      </div>

      <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-orange-700">
          All Orders
        </h3>
        <div className="p-4 space-y-10 justify-center">
          {Object.keys(orders).length === 0 ? (
            <p className="text-gray-600 text-center">No orders yet.</p>
          ) : (
            dates.map((date) => (
              <div key={date}>
                <h2 className="font-bold text-2xl mb-4 text-orange-700">
                  {date}
                </h2>

                <div className="space-y-3">
                  {
                    <ul className="space-y-3">
                      {orders[date]?.map(
                        ({ orderedBy, createdAt, food, _id, status }: any) => {
                          const date = new Date(createdAt);
                          const formattedTime = date.toLocaleTimeString();
                          return (
                            <div
                              key={_id}
                              className="bg-white p-5 rounded-xl shadow flex flex-col gap-3 border border-gray-100 w-full max-w-2xl"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div>
                                    <h3 className="font-semibold">
                                      {orderedBy.email}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      {formattedTime}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-5">
                                  <button
                                    onClick={() => handleDelete(_id)}
                                    className="text-sm cursor-pointer text-gray-500 hover:text-black"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={() => handleUpdate(_id, food)}
                                    className="text-sm cursor-pointer text-gray-500 hover:text-black"
                                  >
                                    Edit
                                  </button>
                                  <div className="flex items-center gap-3">
                                    <label className="cursor-pointer">
                                      <input
                                        onChange={(e) =>
                                          handlePayment(e, _id, orderedBy)
                                        }
                                        type="file"
                                        className="hidden"
                                        disabled={status === "uploaded"}
                                      />
                                      <span
                                        className={`px-4 py-2 ${
                                          status === "pending"
                                            ? `bg-yellow-400`
                                            : status === "uploaded"
                                            ? `bg-blue-600`
                                            : `bg-green-600`
                                        } text-white rounded-md`}
                                      >
                                        {status === "pending"
                                          ? "Upload Proof"
                                          : "Proof Uploaded"}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {food}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </ul>
                  }
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
