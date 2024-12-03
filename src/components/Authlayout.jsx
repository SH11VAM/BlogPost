import React from 'react'
import { useState, useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authservice from '../appwrite/auth'

function Protected({children, authentication=true}) {

    const navigate= useNavigate();
    const [loading , setLoading]= useState(true);
    const authStatus=useSelector( state => state.auth.status);

    useEffect(()=>{

      if(authentication && authStatus !== authentication){
        navigate("/login")
      }else if(!authentication && authStatus !== authentication){
navigate("/");

      }

      setLoading(false); 
    }, [authStatus , navigate, authentication
      
    ]);
  return (
    loading ? <h1>.....loading..</h1>: <>{children}</>
  )
}

export default Protected