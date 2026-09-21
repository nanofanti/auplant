import { useState } from "react";
import { login, getMe } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser, refreshSitterProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(email, password);
      const meResponse = await getMe();
      console.log(meResponse);

      setUser(meResponse.data);
      toast.success("Login successful");
      await refreshSitterProfile();
      navigate(from, { replace: true });
    } catch {
      toast.error("Email or password is incorrect");
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="m-4 p-4 bg-green-700"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="m-4 p-4 bg-green-700"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
