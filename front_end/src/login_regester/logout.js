import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ usr }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer l'utilisateur et réinitialiser l'état
    localStorage.removeItem("user");
    usr(null);

    // Redirection après un léger délai
    setTimeout(() => {
      navigate("/"); // Rediriger vers la page d'accueil après déconnexion
    }, 200); // Légère temporisation pour permettre la mise à jour de l'état

  }, [usr, navigate]);

  return <div>Logging out...</div>;
}