import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {
  deleteCareRequest,
  getMyCareRequests,
  updateCareRequestStatus,
} from "../services/careRequestService";
import type { CareRequest, CareRequestStatus } from "../types/CareRequest";
import CareRequestCard from "../components/CareRequestCard";
import { toast } from "sonner";
import ConfirmModal from "../components/ConfirmModal";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const [myCareRequests, setMyCareRequests] = useState<CareRequest[]>([]);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadMyCareRequests = async () => {
      try {
        const response = await getMyCareRequests();
        setMyCareRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadMyCareRequests();
  }, []);

  const handleStatusChange = async (
    id: string,
    currentStatus: CareRequestStatus,
  ) => {
    const newStatus: CareRequestStatus =
      currentStatus === "open" ? "closed" : "open";

    try {
      await updateCareRequestStatus(id, newStatus);
      setMyCareRequests((currentRequests) =>
        currentRequests.map((careRequest) =>
          careRequest._id === id
            ? { ...careRequest, status: newStatus }
            : careRequest,
        ),
      );
      toast.success(
        newStatus === "closed"
          ? "Care request closed"
          : "Care request reopened",
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update care request");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCareRequest(id);

      setMyCareRequests((currentRequests) =>
        currentRequests.filter((careRequest) => careRequest._id !== id),
      );

      toast.success("Care request successfully deleted");

      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete care request");
      }

      return false;
    }
  };

  const confirmDelete = async () => {
    if (!requestToDelete) {
      return;
    }

    const deleted = await handleDelete(requestToDelete);

    if (deleted) {
      setRequestToDelete(null);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <section>
        <h2 className="mb-4 text-xl font-semibold">My Profile</h2>

        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Roles:</strong> {user?.roles.join(", ")}
        </p>
      </section>
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">My Care Requests</h2>

        {myCareRequests.length === 0 ? (
          <p>You haven't created any care requests yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {myCareRequests.map((careRequest) => (
              <div key={careRequest._id}>
                <CareRequestCard careRequest={careRequest} />

                <button
                  type="button"
                  onClick={() => {
                    handleStatusChange(careRequest._id, careRequest.status);
                  }}
                  className={`rounded-lg px-4 py-2 text-white ${
                    careRequest.status === "open"
                      ? "bg-red-400 hover:bg-red-600"
                      : "bg-green-400 hover:bg-green-600"
                  }`}
                >
                  {careRequest.status === "open"
                    ? "Close Request"
                    : "Reopen Request"}
                </button>
                <Link
                  to={`/care-requests/${careRequest._id}/edit`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setRequestToDelete(careRequest._id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      {requestToDelete && (
        <ConfirmModal
          title="Delete care request?"
          message="This action cannot be undone."
          onCancel={() => setRequestToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
}

export default Dashboard;
