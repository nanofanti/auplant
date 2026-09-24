import { useState, type SubmitEvent } from "react";

import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../context/AuthContext";
import { getMe, login } from "../services/authService";

import auPlantLogo from "../assets/AuPlantLogoNew.png";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser, refreshSitterProfile } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      await login(email, password);

      const meResponse = await getMe();

      setUser(meResponse.data);

      await refreshSitterProfile();

      toast.success("Login successful");

      navigate(from, { replace: true });
    } catch {
      toast.error("Email or password is incorrect");
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

          <h1 className="text-3xl font-bold text-auplant-dark">Welcome back</h1>

          <p className="mt-2 text-gray-600">Log in to your AuPlant account.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                placeholder="Your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
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
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-auplant-green hover:text-auplant-dark"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-xl bg-auplant-green px-5 py-3 font-semibold text-white transition hover:bg-auplant-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-auplant-green hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
