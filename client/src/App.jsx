import React from 'react'

import Home from './components/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={
 <ProtectedRoute>
      <Home/>
    </ProtectedRoute>
    }/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
   
   </Routes>
   </BrowserRouter>
  )
}

export default App
