import { useState } from "react";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await login(email, password);
    console.log(response);
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
