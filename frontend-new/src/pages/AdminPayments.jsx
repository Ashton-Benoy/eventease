import { useEffect, useState } from "react";

export default function AdminPayments() {
  const API_URL = import.meta.env.VITE_API_URL;
  const adminToken = localStorage.getItem("adminToken");
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/payments`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((res) => res.json())
      .then((data) => setPayments(Array.isArray(data) ? data : []))
      .catch(() => setPayments([]));
  }, [API_URL, adminToken]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="mt-1 text-slate-600">
          Admin can view payment records for ticket bookings.
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Event</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Promo</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="p-3">{payment.email}</td>
                  <td className="p-3">
                    {payment.eventId?.title || payment.eventId || "Event"}
                  </td>
                  <td className="p-3">
                    Rs. {((payment.amount || 0) / 100).toFixed(2)}
                  </td>
                  <td className="p-3">
                    Rs. {((payment.discountAmount || 0) / 100).toFixed(2)}
                  </td>
                  <td className="p-3">{payment.promoCode || "-"}</td>
                  <td className="p-3">{payment.status}</td>
                  <td className="p-3">{payment.razorpayPaymentId || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {payments.length === 0 && (
            <p className="p-5 text-slate-500">No payments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
