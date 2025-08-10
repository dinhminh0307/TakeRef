import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Router, Routes, Route, useNavigate } from 'react-router-dom'
import WelComePage from './pages/WelcomePage/Content'
import Footer from './components/Footer/Footer'
import AuthPage from './pages/Auth/Content'
import SubscriptionPageContent from './pages/SubscriptionPage/Content'
import CitationPage from './pages/Citation/Content'
import checkTokenExpired from './utils/cookies/checkToken'

function App() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(() => {
    const savedLoginState = localStorage.getItem('isLogin');
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
  }, [isLogin])

  useEffect(() => {
    const validToken = checkTokenExpired();
    if(validToken && isLogin) {
      setLogin(false);
      navigate('/login')
    }
  }, []);
  
  return (
    <>
    <NavBar />
      
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
    </>
  )
}

export default App