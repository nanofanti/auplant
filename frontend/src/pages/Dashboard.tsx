import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";
import CareRequestCard from "../components/CareRequestCard";
import ConfirmModal from "../components/ConfirmModal";

import {
  deleteCareRequest,
  getMyCareRequests,
  updateCareRequestStatus,
} from "../services/careRequestService";

import type { CareRequest, CareRequestStatus } from "../types/CareRequest";

function Dashboard() {
  const { user, sitterProfile } = useAuth();
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
      <header className="mb-10">
        <p className="mb-1 text-sm font-medium text-green-700">My account</p>

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your profile, sitter information and care requests.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-green-300 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>

          <div className="mt-5 space-y-3 text-gray-700">
            <p>
              <span className="font-medium">Name:</span> {user?.name}
            </p>

            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>

            <div>
              <span className="font-medium">Roles:</span>

              <div className="mt-2 flex flex-wrap gap-2">
                {user?.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize text-gray-700"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {sitterProfile && (
          <section className="rounded-2xl border border-green-200 bg-green-200 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">My Sitter Profile</h2>
            <p>
              <strong>Location:</strong> {sitterProfile.location}
            </p>
            <p>
              <strong>Bio:</strong> {sitterProfile.bio}
            </p>
            <p>
              <strong>Experience:</strong> {sitterProfile.experience}
            </p>
            <p>
              <strong>Price per day:</strong> {sitterProfile.pricePerDay} €
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {sitterProfile.availability ? "Available" : "Not available"}
            </p>
            <div>
              <strong>Services:</strong>
              <div className="mt-2 flex flex-wrap gap-2">
                {sitterProfile.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize text-gray-700"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/sitter-profile/edit"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Edit Sitter Profile
            </Link>
          </section>
        )}
      </div>
      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              My Care Requests
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Manage the plant care requests you've created.
            </p>
          </div>

          <Link
            to="/create-care-request"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
          >
            + Create Request
          </Link>
        </div>

        {myCareRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center">
            <p className="font-medium text-gray-900">No care requests yet</p>

            <p className="mt-1 text-sm text-gray-600">
              Create a request when you need someone to take care of your
              plants.
            </p>

            <Link
              to="/create-care-request"
              className="mt-4 inline-block font-medium text-green-700 hover:text-green-800"
            >
              Create your first request →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {myCareRequests.map((careRequest) => (
              <div key={careRequest._id}>
                <CareRequestCard careRequest={careRequest} />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(careRequest._id, careRequest.status)
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
                      careRequest.status === "open"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    {careRequest.status === "open"
                      ? "Close Request"
                      : "Reopen Request"}
                  </button>
                </div>
                <Link
                  to={`/care-requests/${careRequest._id}/edit`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setRequestToDelete(careRequest._id)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
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
