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
import SubscriptionPageContent from './pages/SubscriptionPage/Content'
import CitationPage from './pages/Citation/Content'

function App() {
  const [isLogin, setLogin] = useState();
  return (
    <>
    <NavBar />
      <BrowserRouter>
        <Routes>
          {/* Full screen routes without navbar/footer */}
          {isLogin && <Route path='/' element={<CitationPage/>}/>}
          
          {/* Routes with navbar/footer */}
          {!isLogin && <Route path='/' element={
            <>
              <main>
                <WelComePage/>
              </main>
              <Footer />
            </>
          }/>}
          <Route path='/auth' element={
            <>
              <main>
                <AuthPage setLogin={setLogin}/>
              </main>
              <Footer />
            </>
          }/>
          <Route path='/login' element={
            <>
              <main>
                <AuthPage setLogin={setLogin}/>
              </main>
              <Footer />
            </>
          }/>
          <Route path='/signup' element={
            <>
              <main>
                <AuthPage setLogin={setLogin}/>
              </main>
              <Footer />
            </>
          }/>
          <Route path='/prices' element={
            <>
              <main>
                <SubscriptionPageContent/>
              </main>
              <Footer />
            </>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App