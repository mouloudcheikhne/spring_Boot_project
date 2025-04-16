import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout({usr}) {
    const navigate = useNavigate();
    useEffect(() => {
        const a = localStorage.getItem("user");
        usr(null);
        if (a) {
          localStorage.removeItem("user");
        }
        navigate("/"); // on redirige après suppression
      }, []);
  return (
    <div>logout</div>
  )
}
