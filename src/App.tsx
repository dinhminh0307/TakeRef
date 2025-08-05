import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import WelComePage from './pages/WelcomePage/Content'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<WelComePage/>}/>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
