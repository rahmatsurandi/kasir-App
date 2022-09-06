import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Sukses } from './pages/index'
import NavbarComponents from '../src/components/NavbarComponents'

function App() {
  return (
    <>
      <NavbarComponents />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/sukses' element={<Sukses />} />
      </Routes>
    </>
  )
}

export default App