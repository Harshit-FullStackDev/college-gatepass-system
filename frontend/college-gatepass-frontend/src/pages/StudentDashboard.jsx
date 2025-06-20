import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard() {
  const [passes, setPasses] = useState([]);
  const [reason, setReason] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/student/gatepass/my");
      setPasses(res.data);
    } catch (error) {
      console.error("Failed to fetch gatepasses", error);
    }
  };

  const submitRequest = async () => {
    if (!reason.trim()) return;
    try {
      await api.post("/student/gatepass/request", { reason });
      setReason("");
      fetchData();
    } catch (error) {
      console.error("Failed to submit gatepass", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="w-screen min-h-screen pt-24 px-4"
      style={{ background: "linear-gradient(to right, #d4fc79, #96e6a1)" }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Request Gatepass</h2>

        <div className="flex gap-3 mb-6 flex-col sm:flex-row">
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter reason"
          />
          <button
            onClick={submitRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Submit
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-3 text-gray-700">My Gatepasses</h3>
        {passes.length === 0 ? (
          <p className="text-gray-500">No gatepass requests yet.</p>
        ) : (
          <ul className="space-y-3">
            {passes.map((pass) => (
              <li
                key={pass.id}
                className="bg-gray-100 rounded-lg px-4 py-2 border border-gray-200 flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">{pass.reason}</span>
                <span className="text-sm text-gray-600">{pass.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
