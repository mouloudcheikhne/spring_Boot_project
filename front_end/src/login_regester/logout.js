import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ usr }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer l'utilisateur et réinitialiser l'état
    localStorage.removeItem("user");
    usr(null);

    
    navigate("/"); 
    window.location.reload();
   

  }, [usr, navigate]);

  return <div>Logging out...</div>;
}