import { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "sonner";

import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await forgotPassword({ email });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to request password reset:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to request password reset. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-auplant-cream px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-auplant-sage bg-white p-8 shadow-sm">
        {!submitted ? (
          <>
            {/* Header */}
            <div className="text-center">
              <p className="font-semibold uppercase tracking-wider text-auplant-olive">
                Account recovery
              </p>

              <h1 className="mt-2 text-3xl font-bold text-auplant-dark">
                Forgot your password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Enter the email address associated with your AuPlant account and
                we'll send you instructions to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-auplant-dark"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-auplant-sage px-4 py-3 text-auplant-dark outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full cursor-pointer rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition-colors hover:bg-auplant-dark disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? "Sending..." : "Send reset link"}
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
              ✉️
            </div>

            <h1 className="mt-5 text-2xl font-bold text-auplant-dark">
              Check your email
            </h1>

            <p className="mt-3 leading-7 text-gray-600">
              If an account exists for{" "}
              <span className="font-semibold text-auplant-dark">{email}</span>,
              we've sent password reset instructions.
            </p>

            <p className="mt-3 text-sm text-gray-500">
              The reset link will expire after 15 minutes.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-block rounded-xl bg-auplant-green px-6 py-3 font-semibold text-white transition-colors hover:bg-auplant-dark"
            >
              Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
