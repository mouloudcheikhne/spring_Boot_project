import React,{useState,useEffect} from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../user/layout.css'; // à créer pour les styles

export default function LayoutAGENT() {
      const[user,setuser]=useState();
          useEffect(() => {
            const user = localStorage.getItem("user");
            if (user) {
              const a = JSON.parse(user);
              setuser(a);
              console.log(a);
            }
          }, []);
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
  <div className="sidebar-top">
    <div className="logo"><i className="bi bi-bank me-2"></i> TicketFlow</div>
    <nav className="menu">
      <ul className='ul'>
        <li className='li'> <Link to="/" className="menu-item"><i className="bi bi-house-door-fill me-2"></i> Dashboard</Link></li>
        <li className='li' > 
      <Link to="/tickets" className="menu-item"><i className="bi bi-ticket-perforated-fill me-2"></i>Agent</Link></li>
        <li className='li'> <Link to="/agent/ticktes" className="menu-item"><i className="bi bi-ticket-perforated-fill me-2"></i>ticktes</Link>
       </li>
      </ul>
     
      
      
    </nav>
  </div>

  <div className="user-profile">
    {/* <img src="/logo512.png" alt="user" className="avatar" /> */}
    <i className="bi bi-person-circle p-4 h"></i>
    <p><p>{user ? `${user.nom} ${user.prenom}` : "Chargement..."}</p></p>
    <Link to="/logout" className="logout icon"><i className="bi bi-box-arrow-left me-3 icon"></i>log out</Link>
  </div>
</aside>


      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="user-info">
          <i class="bi bi-bell-fill notification"></i>
            <span><p>{user ? `${user.nom} ${user.rol}` : "Chargement..."}</p></span>
          </div>
        </header>
        <section className="content">
         
          <Outlet/>
        </section>
      </main>
    </div>
  );
}
