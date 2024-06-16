import './App.css';
import React from 'react';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact'
import Screens from './components/Screens';
import Navbar from './components/navbar';
import Storypage from './components/Storypage';
// import Upload from './components/Upload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About-Us' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Screens' element={<Screens />} />
          <Route path='/Storypage' element={<Storypage/>} />
          {/* <Route path='/Upload' element={<Upload/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App