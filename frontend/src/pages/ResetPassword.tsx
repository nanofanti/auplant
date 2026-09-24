import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { resetPassword } from "../services/authService";

function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error("Invalid password reset link.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      await resetPassword(token, { password });

      setResetSuccessful(true);
    } catch (error) {
      console.error("Failed to reset password:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to reset password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-auplant-cream px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-auplant-sage bg-white p-8 shadow-sm">
        {!resetSuccessful ? (
          <>
            {/* Header */}
            <div className="text-center">
              <p className="font-semibold uppercase tracking-wider text-auplant-olive">
                Account recovery
              </p>

              <h1 className="mt-2 text-3xl font-bold text-auplant-dark">
                Reset your password
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Enter a new password for your AuPlant account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-auplant-dark"
                >
                  New password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-xl border border-auplant-sage px-4 py-3 pr-12 text-auplant-dark outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-auplant-green hover:text-auplant-dark"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Must be at least 8 characters.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-auplant-dark"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-xl border border-auplant-sage px-4 py-3 pr-12 text-auplant-dark outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-auplant-green hover:text-auplant-dark"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition-colors hover:bg-auplant-dark disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? "Resetting..." : "Reset password"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm font-semibold text-auplant-green hover:text-auplant-dark"
              >
                ← Back to login
              </Link>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-auplant-sage text-2xl">
              ✓
            </div>

            <h1 className="mt-5 text-2xl font-bold text-auplant-dark">
              Password reset!
            </h1>

            <p className="mt-3 leading-7 text-gray-600">
              Your password has been changed successfully. You can now log in
              with your new password.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-block rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition-colors hover:bg-auplant-dark"
            >
              Go to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
