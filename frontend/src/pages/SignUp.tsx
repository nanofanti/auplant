import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";
import { register } from "../services/authService";

import { Eye, EyeOff } from "lucide-react";
import auPlantLogo from "../assets/AuPlantLogoNew.png";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name,
        email,
        password,
      });

      await refreshUser();
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-auplant-cream px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8 text-center">
          <a href="/">
            <img
              src={auPlantLogo}
              alt="AuPlant"
              className="mx-auto mb-4 h-24 w-24 object-contain"
            />
          </a>

          <h1 className="text-3xl font-bold text-auplant-dark">
            Create your account
          </h1>

          <p className="mt-2 text-gray-600">
            Join AuPlant and connect with plant lovers near you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-medium text-auplant-dark"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-auplant-dark"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-auplant-dark"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 transition hover:text-auplant-green"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block font-medium text-auplant-dark"
            >
              Confirm password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-auplant-green focus:ring-2 focus:ring-auplant-sage"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 transition hover:text-auplant-green"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {confirmPassword && (
              <p
                className={`mt-2 text-sm ${
                  password === confirmPassword
                    ? "text-auplant-green"
                    : "text-red-600"
                }`}
              >
                {password === confirmPassword
                  ? "Passwords match ✓"
                  : "Passwords do not match"}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-xl bg-auplant-green px-5 py-3 font-semibold text-white transition hover:bg-auplant-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-auplant-green hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default SignUp;
