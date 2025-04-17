import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './layout_admin.css';
import { FaHome, FaUsers, FaCogs, FaComments, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

export default function Layaout_Admin() {
  const etatUser = () => {
    return localStorage.getItem('user') ? true : false;
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar-modern">
        <div className="logo">⚙️Admin</div>
        <nav className="nav-items">
          <Link to="/admin" className="nav-item"><FaHome /> <span>Dashboard</span></Link>
          <Link to="/admin/service" className="nav-item"><FaCogs /> <span>Services</span></Link>
          <Link to="/admin/reclamation" className="nav-item"><FaComments /> <span>Réclamations</span></Link>
          <Link to="/admin/users" className="nav-item"><FaUsers /> <span>Utilisateurs</span></Link>
        </nav>
        <div className="auth-section">
          {etatUser()
            ? <Link to="/logout" className="nav-item logout"><FaSignOutAlt /> <span>Logout</span></Link>
            : <Link to="/" className="nav-item login"><FaSignInAlt /> <span>Login</span></Link>}
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
