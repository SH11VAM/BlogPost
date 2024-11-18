import React from 'react'
import { useDispatch } from 'react-redux';
import authservice from '../../appwrite/auth';
import { logout } from '../../store/authslice';

function LogoutButton() {
    
    
    const dispatch= useDispatch();

    const logouHandler = () =>{
        authservice.logout().then(()=>{
            dispatch(logout());
        }).catch((error)=>console.log("logoutButton error ::", error));
        


    };
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-white rounded-full'>Logout</button>
  )
}

export default LogoutButton