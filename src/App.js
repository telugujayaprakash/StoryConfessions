import './App.css';
import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact'
import Screens from './components/Screens';
import Navbar from './components/navbar';
import Storypage from './components/Storypage';
import Footer from './components/Footer'
import Login from './components/Loginpage';
import Upload from './components/Upload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"


function App() {
  return (
    <>
      <BrowserRouter>
      <Analytics />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About-Us' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Screens' element={<Screens />} />
          <Route path='/Storypage' element={<Storypage/>} />
          <Route path='/Upload' element={<Upload/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <hr/>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App