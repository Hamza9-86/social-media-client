import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });
    setLoading(false);
    toast.success('Login successful');
    console.log('login result' , response);
    setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
    navigate("/");
  }
  if (loading) return <Loader message="Activation in progress..." />;
  return (
    <div className="Login">
      <div className="Login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" onSubmit={handleSubmit} />
        </form>
        <p className="subheading">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
