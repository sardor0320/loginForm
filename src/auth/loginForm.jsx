import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formdata, setFormData] = useState({
    login: "",
    password: "",
  });
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://64.226.108.80:8090/auth/login", formdata);

      if (res.data) {
        sessionStorage.setItem('token', res.data.token);
        console.log('Login successful:', res);
        navigate('/table');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("Login failed: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value, 
    });
  };

  return (
    <div className="pt-20 w-full h-screen flex justify-center items-center">
      <h1>Login</h1>
      <input
        className=""
        type="text"
        name="login"
        value={formdata.login}
        onChange={handleChange}
        placeholder="Username"
        
      />
      <input
        type="password"
        name="password"
        value={formdata.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
