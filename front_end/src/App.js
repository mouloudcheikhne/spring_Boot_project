
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
function App() {
  const [user,setUser]=useState({"email":"ali@gmail.com","rol":"user"});
  
  
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(user));
    console.log(localStorage.getItem("user"));
    
  },[user])
  const getRout=()=>{
    if(user.rol=="user"){
      return [ {path:"/",element:<Layout/>,children:[
        {index:true,element:<Tout_service/>},
        {path:"/login",element:<Login/>},
        {path:"/notification",element:<Notification/>},
        {path:"/profile",element:<Profile/>},
      ]}]
    }
    else if(user.rol=="admin"){
      return [{path:"/",element:<Admin/>}]
    }
    else{
      return [{path:"/",element:<Layout/>,children:[
        {index:true,element:<Tout_service/>}]}]
    }
  }
  const user_connect="user";
  const routing=createBrowserRouter(getRout())
  return (
   <RouterProvider router={routing} />
    
   
  
    
  );
}

export default App;
