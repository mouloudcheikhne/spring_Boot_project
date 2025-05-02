import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './layout.css'; // Using the same CSS file

export default function LayoutAGENT() {
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
                <Link to="/" className="menu-item"><i className="bi bi-house-door-fill me-2"></i> Dashboard</Link>
              </li>
              {/* <li className='li'> 
                <Link to="/tickets" className="menu-item"><i className="bi bi-ticket-perforated-fill me-2"></i>Agent</Link>
              </li> */}
              <li className='li'> 
                <Link to="/agent/ticktes" className="menu-item"><i className="bi bi-ticket-perforated-fill me-2"></i>Tickets</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Updated User Profile */}
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
              <p className="user-name">{user ? `${user.nom} ${user.prenom}` : "Loading..."}</p>
              <p className="user-role">Agent</p>
            </div>
          </div>
          <Link to="/logout" className="logout-btn-icon" title="Logout">
            <i className="bi bi-box-arrow-right"></i>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="user-info">
            <i className="bi bi-bell-fill notification"></i>
            <span>{user ? `${user.nom} (Agent)` : "Loading..."}</span>
          </div>
        </header>
        <section className="content">
          <Outlet/>
        </section>
      </main>
    </div>
  );
}