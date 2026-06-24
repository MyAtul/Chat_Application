import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import ProtectedRoute from './routes/ProtectedRoute'
import Home from './pages/Home'
import Register from './pages/Register'

const App = () => {
  return (
    <div className='bg-black text-white min-h-screen'>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/chat' 
        element={
          <ProtectedRoute>
            <Chat/>
          </ProtectedRoute>
        }
      />
    </Routes>
    </div>
    
  )
}

export default App