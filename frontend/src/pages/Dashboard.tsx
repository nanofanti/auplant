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
import { uploadProfileImage } from "../services/userService";

import type { CareRequest, CareRequestStatus } from "../types/CareRequest";

function Dashboard() {
  const { user, sitterProfile, refreshUser } = useAuth();

  const [myCareRequests, setMyCareRequests] = useState<CareRequest[]>([]);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );

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

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setProfileImagePreview(previewUrl);
  };

  const handleProfileImageUpload = async () => {
    if (!profileImageFile) {
      toast.error("Please select an image first");
      return;
    }

    try {
      await uploadProfileImage(profileImageFile);

      await refreshUser();

      setProfileImageFile(null);
      setProfileImagePreview(null);

      toast.success("Profile picture updated");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to upload profile picture");
      }
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Dashboard header */}
      <header className="mb-10">
        <p className="mb-1 font-semibold uppercase tracking-wider text-auplant-olive">
          My account
        </p>

        <h1 className="text-3xl font-bold text-auplant-dark">
          Welcome {user?.name}
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your profile, sitter information and care requests.
        </p>
      </header>

      {/* Profile cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User profile */}
        <section className="rounded-2xl border border-gray-200 bg-auplant-sage p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-auplant-dark">
            My Profile
          </h2>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                alt="Profile preview"
                className="h-24 w-24 shrink-0 rounded-full object-cover"
              />
            ) : user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                className="h-24 w-24 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-auplant-cream text-2xl font-semibold text-auplant-dark">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <label
                htmlFor="profileImage"
                className="mb-2 block text-sm font-semibold text-auplant-green"
              >
                Profile picture
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="block max-w-full text-sm text-auplant-dark"
              />
            </div>
          </div>

          {profileImageFile && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Selected: {profileImageFile.name}
              </p>

              <button
                type="button"
                onClick={handleProfileImageUpload}
                className="mt-3 cursor-pointer rounded-lg bg-auplant-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-auplant-dark"
              >
                Upload picture
              </button>
            </div>
          )}

          <div className="mt-6 border-t border-auplant-olive pt-4">
            <p className="text-auplant-text-black">
              <span className="font-semibold text-auplant-green">Name:</span>{" "}
              {user?.name}
            </p>

            <p className="mt-2 text-auplant-text-black">
              <span className="font-semibold text-auplant-green">Email:</span>{" "}
              {user?.email}
            </p>

            <div className="mt-4">
              <span className="font-semibold text-auplant-green">Roles</span>

              <div className="mt-2 flex flex-wrap gap-2">
                {user?.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-auplant-cream px-3 py-1 text-sm capitalize text-auplant-green"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sitter profile */}
        {sitterProfile ? (
          <section className="rounded-2xl border border-gray-200 bg-auplant-sage p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-auplant-dark">
                My Sitter Profile
              </h2>

              <span
                className={
                  sitterProfile.availability
                    ? "rounded-full bg-auplant-green px-3 py-1 text-sm font-medium text-white"
                    : "rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-600"
                }
              >
                {sitterProfile.availability ? "Available" : "Not available"}
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-auplant-green">
                Location
              </p>

              <p className="mt-1 text-auplant-text-black">
                {sitterProfile.location}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-auplant-green">Bio</p>

              <p className="mt-1 text-auplant-text-black">
                {sitterProfile.bio}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-auplant-green">
                Experience
              </p>

              <p className="mt-1 text-auplant-text-black">
                {sitterProfile.experience}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-auplant-green">
                Services
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {sitterProfile.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-auplant-cream px-3 py-1 text-sm text-auplant-green"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-auplant-olive pt-4">
              <div>
                <span className="text-2xl font-bold text-auplant-green">
                  {sitterProfile.pricePerDay} €
                </span>

                <span className="ml-1 text-sm text-gray-600">/ day</span>
              </div>

              <Link
                to="/sitter-profile/edit"
                className="mt-5 inline-block rounded-lg bg-auplant-green px-4 py-2 font-semibold text-white transition-colors hover:bg-auplant-dark"
              >
                Edit Sitter Profile
              </Link>
            </div>
          </section>
        ) : (
          <section className="flex flex-col justify-center rounded-2xl border border-dashed border-auplant-sage bg-auplant-cream p-6">
            <p className="font-semibold text-auplant-dark">
              Become a Plant Sitter
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Create a sitter profile and help other plant owners while they're
              away.
            </p>

            <Link
              to="/become-sitter"
              className="mt-5 w-fit rounded-lg bg-auplant-green px-4 py-2 font-semibold text-white transition-colors hover:bg-auplant-dark"
            >
              Create Sitter Profile
            </Link>
          </section>
        )}
      </div>

      {/* Care requests */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-auplant-cream p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-auplant-dark">
              My Care Requests
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Manage the plant care requests you've created.
            </p>
          </div>

          <Link
            to="/create-care-request"
            className="rounded-lg bg-auplant-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-auplant-dark"
          >
            + Create Request
          </Link>
        </div>

        {myCareRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-auplant-sage bg-white p-8 text-center">
            <p className="font-semibold text-auplant-dark">
              No care requests yet
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Create a request when you need someone to take care of your
              plants.
            </p>

            <Link
              to="/create-care-request"
              className="mt-4 inline-block font-semibold text-auplant-green transition-colors hover:text-auplant-dark"
            >
              Create your first request →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {myCareRequests.map((careRequest) => (
              <div key={careRequest._id} className="rounded-2xl bg-white p-2">
                <CareRequestCard careRequest={careRequest} />

                <div className="px-4 pb-4">
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(careRequest._id, careRequest.status)
                      }
                      className={
                        careRequest.status === "open"
                          ? "cursor-pointer rounded-lg bg-auplant-sage px-4 py-2 text-sm font-semibold text-auplant-dark transition-colors hover:bg-auplant-olive"
                          : "cursor-pointer rounded-lg bg-auplant-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-auplant-dark"
                      }
                    >
                      {careRequest.status === "open"
                        ? "Close Request"
                        : "Reopen Request"}
                    </button>

                    <Link
                      to={`/care-requests/${careRequest._id}/edit`}
                      className="rounded-lg border border-auplant-green px-4 py-2 text-sm font-semibold text-auplant-green transition-colors hover:bg-auplant-sage"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => setRequestToDelete(careRequest._id)}
                      className="cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
