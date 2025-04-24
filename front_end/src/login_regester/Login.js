import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
const API_URL = process.env.REACT_APP_API_URL;
export default function Login({ usr }) {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const [userTemp, setUserTemp] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const res = await axios.post(`${API_URL}/auth/login`, loginData);
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
        navigate("/");
      }
    }
  }, [userTemp, usr, navigate]);

  return (
    <div className='containerlogin'>
    <div className="login-container">
      <h3 className="login-title">Connexion</h3>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input
            type="email"
            ref={email}
            name="email"
            placeholder="Entrer email"
            className="input-field form-control"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            ref={password}
            name="password"
            placeholder="Entrer mot de passe"
            className="input-field form-control"
          />
        </div>
        <button type="submit" className="submit-button btn btn-primary">Valider</button>
      </form>
    </div>
    </div>
  );
}
