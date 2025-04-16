
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NavBar from './Navbar/NavBar';
import AppUser from './user/AppUser';
import Notification from './user/Notification';
import Profile from './user/Profile';
import Login from './login_regester/Login';
import Layout from './user/Layout';
import Tout_service from './user/Tout_service';
import { useEffect, useMemo, useState } from 'react';
import Admin from './admin/Admin';
import Regester from './login_regester/Regester';
import Layaout_Admin from './admin/layaout_Admin';
import Users from './admin/users';
import ServiceCrude from './admin/serviceCrude';
import Logout from './login_regester/logout';
function App() {
  const [user,setUser]=useState(()=>{

    const a=localStorage.getItem("user");
    return a?JSON.parse(a):null;
  }

  );
  
  const getRout=()=>{
    if(!user){
      return [{path:"/",element:<Layout/>,children:[
        {index:true,element:<Tout_service/>},
        
      ]},
      {path:"/regester",element:<Regester/>},
      {path:"/login",element:<Login usr={setUser}/>}
        
      ]
    }
    else if(user.rol=="USER"){
      return [ {path:"/",element:<Layout/>,children:[
        {index:true,element:<Tout_service/>},
        {path:"/notification",element:<Notification/>},
        {path:"/profile",element:<Profile/>},
      ]},
      {path:"/login",element:<Login/>},
      {path:"/logout",element:<Logout usr={setUser}/>}
    ]
    }
    else if(user.rol=="ADMIN"){
      return [{path:"/admin",element:<Layaout_Admin/>,children:[
        {index:true,element:<Admin/>},
        {path:"users",element:<Users/>},
        {path:"service",element:<ServiceCrude/>},
      ]}, {path:"/regester",element:<Regester/>},
      
      {path:"/logout",element:<Logout usr={setUser}/>}
    ]
     
    }
    return [{path:"/",element:<Layout/>,children:[
      {index:true,element:<Tout_service/>},
      
    ]},
    {path:"/regester",element:<Regester/>},
    {path:"/login",element:<Login usr={setUser}/>}
      
    ]
  
  }

  const routing = useMemo(() => createBrowserRouter(getRout()), [user]);
  return (
    <RouterProvider key={user?.rol} router={routing} />
    
   
  
    
  );
}

export default App;
