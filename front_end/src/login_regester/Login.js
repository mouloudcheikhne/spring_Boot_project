import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./login.css";
export default function Login({ usr }) {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const [userTemp, setUserTemp] = useState(null); // stocke temporairement l'utilisateur après login

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email.current.value,
      password: password.current.value
    };

    try {
      const res = await axios.post("http://localhost:8093/auth/login", loginData);
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      setUserTemp(user); // on stocke temporairement
    } catch (error) {
      console.log("Erreur :", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (userTemp) {
      usr(userTemp); // met à jour dans App.js
      if (userTemp.rol === "USER") {
        navigate("/");
      } else if (userTemp.rol === "ADMIN") {
        navigate("/admin");
      }
    }
  }, [userTemp, usr, navigate]);

  return (
    <div className="login-container">
  <h3 className="login-title">Connexion</h3>
  <form onSubmit={handleSubmit} className="login-form">
    <div className="input-group">
      <input
        type="text"
        ref={email}
        name="email"
        placeholder="Entrer email"
        className="input-field"
      />
    </div>
    <div className="input-group">
      <input
        type="password"
        ref={password}
        name="password"
        placeholder="Entrer mot de passe"
        className="input-field"
      />
    </div>
    <button type="submit" className="submit-button">Valider</button>
  </form>
</div>

  );
}
