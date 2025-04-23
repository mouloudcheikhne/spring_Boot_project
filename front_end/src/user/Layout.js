import React,{useState,useEffect} from 'react';
import { Outlet, Link } from 'react-router-dom';
import './layout.css'; // à créer pour les styles

export default function Layout() {
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
      <Link to="/tickets" className="menu-item"><i className="bi bi-ticket-perforated-fill me-2"></i>Tickets</Link></li>
        <li className='li'> <Link to="/messagairi" className="menu-item"><i className="bi bi-chat-dots-fill me-2"></i> Messages</Link>
        </li>
        <li className='li'> <Link to="/createticktes" className="menu-item"><i className="bi bi-plus-lg me-2"></i>Create Ticket</Link>
        </li>
      </ul>
     
      
      
    </nav>
  </div>

  <div className="user-profile">
    {/* <img src="/logo512.png" alt="user" className="avatar" /> */}
    <i className="bi bi-person-circle p-4 h"></i>
    <p>{user?`${user.nom} ${user.prenom}`:"changeemnt ...."}</p>
    <Link to="/logout" className="logout icon"><i className="bi bi-box-arrow-left me-3 icon"></i>log out</Link>
  </div>
</aside>


      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="user-info">
          <i class="bi bi-bell-fill notification"></i>
            <span>{user?`${user.nom} ${user.rol}`:"changeemnt ...."}</span>
          </div>
        </header>
        <section className="content">
         
          <Outlet/>
        </section>
      </main>
    </div>
  );
}
