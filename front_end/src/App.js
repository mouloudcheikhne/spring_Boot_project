
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NavBar from './Navbar/NavBar';
import AppUser from './user/AppUser';
import Notification from './user/Notification';
import Profile from './user/Profile';
import Login from './login_regester/Login';
import Layout from './user/Layout';
import Tout_service from './user/Tout_service';
import { useEffect, useState } from 'react';
import Admin from './admin/Admin';
import Regester from './login_regester/Regester';
function App() {
  const [user,setUser]=useState(()=>{

    const a=localStorage.getItem("user");
    return a?JSON.parse(a):{};
  }

  );
  
  const getRout=()=>{
    if(!user){
      return [{path:"/",element:<Layout/>,children:[
        {index:true,element:<Tout_service/>},
        
      ]},
      {path:"/regester",element:<Regester/>},
      {path:"/login",element:<Login/>}
        
      ]
    }
    else if(user.rol=="USER"){
      return [ {path:"/",element:<Layout/>,children:[
        {index:true,element:<Tout_service/>},
        {path:"/login",element:<Login/>},
        {path:"/notification",element:<Notification/>},
        {path:"/profile",element:<Profile/>},
      ]}]
    }
    else if(user.rol=="ADMIN"){
      return [{path:"/",element:<Admin/>}]
    }
    else{
      return [{path:"/",element:<Layout/>,children:[
        {index:true,element:<Tout_service/>},
        
      ]},
      {path:"/regester",element:<Regester/>},
      {path:"/login",element:<Login/>}
        
      ]
    }
  
  }

  const routing=createBrowserRouter(getRout())
  return (
   <RouterProvider router={routing} />
    
   
  
    
  );
}

export default App;
