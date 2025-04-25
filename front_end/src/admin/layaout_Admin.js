import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './layout.css';

export default function Layout() {
  const [user, setuser] = useState();
  
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
              <li className='li'> 
                <Link to="/" className="menu-item">
                  <i className="bi bi-house-door-fill me-2"></i> Dashboard
                </Link>
              </li>
              <li className='li'> 
                <Link to="/admin/ticktes" className="menu-item">
                  <i className="bi bi-ticket-perforated-fill me-2"></i>Tickets
                </Link>
              </li>
              <li className='li'> 
                <Link to="/admin/users" className="menu-item">
                  <i className="bi bi-person-circle"></i> User management
                </Link>
              </li>
              <li className='li'> 
                <Link to="/admin/ticktescommit" className="menu-item">
                  <i className="bi bi-chat-dots-fill me-2"></i>Ticket comments
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Updated User Profile Section */}
        <div className="user-profile-horizontal">
          <div className="profile-wrapper">
            {user?.photo ? (
              <img src={user.photo} alt="user" className="avatar-small" />
            ) : (
              <div className="avatar-placeholder-small">
                <i className="bi bi-person-circle"></i>
              </div>
            )}
            <div className="user-info-short">
              <p className="user-name">{user ? `${user.nom} ${user.prenom}` : "Chargement..."}</p>
              <p className="user-role">{user?.role || "User"}</p>
            </div>
          </div>
          <Link to="/logout" className="logout-btn-icon" title="Déconnexion">
            <i className="bi bi-box-arrow-right"></i>
          </Link>
        </div>
      </aside>

      {/* Main Content - unchanged except for class names to match new CSS */}
      <main className="main-content">
        <header className="topbar">
          <div className="user-info">
            <i className="bi bi-bell-fill notification"></i>
            <span>{user ? `${user.nom} ${user.rol}` : "Chargement..."}</span>
          </div>
        </header>
        <section className="content">
          <Outlet/>
        </section>
      </main>
    </div>
  );
}