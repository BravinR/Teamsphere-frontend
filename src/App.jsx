import { useState } from 'react'
import Login from './pages/login/Login'
import Signup from './pages/signup/SignUp'
import Home from './pages/home/Home'
import Chat from './pages/chat/Chat'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const { authUser } = useAuthContext(); 
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={authUser ? <Navigate to='/chat' /> : <Login />} />
          <Route path='/signin' element={authUser ? <Navigate to='/chat' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/chat' /> : <Signup />} />
          <Route path='/chat' element={authUser ? <Chat /> : <Navigate to='/login' />} />
        </Routes>
        <Toaster />
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
