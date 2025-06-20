import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function WardenDashboard() {
  const [pendingPasses, setPendingPasses] = useState([]);
  const [approvedPasses, setApprovedPasses] = useState([]);
  const { user } = useAuth();

  const fetchPending = async () => {
    try {
      const res = await api.get("/warden/gatepass/pending");
      setPendingPasses(res.data.content || []);
    } catch (err) {
      console.error("Failed to fetch pending passes", err);
    }
  };

  const fetchApproved = async () => {
    try {
      const res = await api.get("/warden/gatepass/approved");
      setApprovedPasses(res.data.content || []);
    } catch (err) {
      console.error("Failed to fetch approved passes", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.post(`/warden/gatepass/${id}/approve`);
      fetchPending();
      fetchApproved();
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post(`/warden/gatepass/${id}/reject`);
      fetchPending();
    } catch (err) {
      console.error("Rejection failed", err);
    }
  };

  useEffect(() => {
    fetchPending();
    fetchApproved();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className="w-screen min-h-screen pt-24 px-4 pb-10"
      style={{ background: "linear-gradient(to right, #d4fc79, #96e6a1)" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <input
          type="text"
          placeholder="Search by reason, name, roll no"
          className="w-full p-3 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Pending Gatepasses</h2>
            {pendingPasses.length === 0 ? (
              <p className="text-gray-500">No pending gatepasses</p>
            ) : (
              <ul className="space-y-4">
                {pendingPasses.map((pass) => (
                  <li
                    key={pass.id}
                    className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
                  >
                    <div>
                      <p><strong>Reason:</strong> {pass.reason}</p>
                      <p className="text-sm text-gray-600">Requested on: {formatDate(pass.requestDate)}</p>
                      <p className="text-sm text-gray-600">Student: {pass.studentName || "N/A"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(pass.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(pass.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Approved Gatepasses</h2>
            {approvedPasses.length === 0 ? (
              <p className="text-gray-500">No approved passes</p>
            ) : (
              <ul className="space-y-3">
                {approvedPasses.map((pass) => (
                  <li
                    key={pass.id}
                    className="p-3 bg-green-100 rounded-lg shadow-sm flex justify-between"
                  >
                    <span className="font-medium">{pass.reason}</span>
                    <span className="text-sm text-gray-600">{formatDate(pass.issuedDate)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
