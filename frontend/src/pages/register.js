import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) return alert("Fill all fields");
    if (password !== confirm) return alert("Passwords do not match");

    try {
      await registerUser({ name, email, password });
      alert("Registered successfully! Login now.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign Up to continue">
      <h2 style={{ color: "#7f5af0", fontWeight: "bold", marginBottom: "15px" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="email" placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
        <button type="submit">REGISTER</button>
      </form>
      <span className="link" style={{cursor:"pointer"}} onClick={()=>navigate("/login")}>
        Already have an account? Sign In
      </span>
    </AuthLayout>
  );
}
