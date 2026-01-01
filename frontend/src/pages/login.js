import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields");

    try {
      const res = await loginUser({ email, password });

      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token); 

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">LOGIN</button>
      </form>
      <span
        className="link"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/register")}
      >
        Don't have an account? Sign Up
      </span>
    </AuthLayout>
  );
}
