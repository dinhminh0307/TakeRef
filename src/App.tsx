import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import WelComePage from './pages/WelcomePage/Content'
import Footer from './components/Footer/Footer'
import AuthPage from './pages/Auth/Content'
import StudentDashBoardPage from './pages/DashBoard/Content'

function App() {
  const [isLogin, setLogin] = useState();
  return (
    <>
      <NavBar />
      <main>
        <BrowserRouter>
          <Routes>
            {isLogin && <Route path='/' element={<StudentDashBoardPage/>}/>}
            {!isLogin && <Route path='/' element={<WelComePage/>}/>}
            <Route path='/auth' element={<AuthPage setLogin={setLogin}/>}/>
            <Route path='/login' element={<AuthPage setLogin={setLogin}/>}/>
            <Route path='/signup' element={<AuthPage setLogin={setLogin}/>}/>
            
          </Routes>
        </BrowserRouter>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
