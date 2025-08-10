import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Router, Routes, Route, useNavigate } from 'react-router-dom'
import WelComePage from './pages/WelcomePage/Content'
import Footer from './components/Footer/Footer'
import AuthPage from './pages/Auth/Content'
import SubscriptionPageContent from './pages/SubscriptionPage/Content'
import CitationPage from './pages/Citation/Content'
import CitationTypePage from './pages/Citation/CitationType/Content'
import hasValidToken from './utils/cookies/checkToken'
import Notifier, { type NotifierData } from './components/Notifier/Content'

function App() {
  const navigate = useNavigate();
  const [notifier, setNotifier] = useState<NotifierData | null>(null);
  const [isLogin, setLogin] = useState(() => {
    const savedLoginState = localStorage.getItem('isLogin');
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
  }, [isLogin])

  useEffect(() => {
    const checkToken = async () => {
      const validToken = await hasValidToken();
      console.log(validToken)
      if(!validToken) {
        setLogin(false);
        navigate('/login')
        setNotifier({
          type: 'warning',
          message: 'Your session has expired. Please log in again.'
        });
      }
    }

    checkToken();
  }, []);

  const handleCloseNotifier = () => {
    setNotifier(null);
  };
  
  return (
    <>
    <NavBar />
      
        <Routes>
          {/* Full screen routes without navbar/footer */}
          {isLogin && <Route path='/' element={<CitationPage setNotifier={setNotifier}/>}/>}
          {isLogin && <Route path='/citation-types' element={<CitationTypePage/>}/>}
          
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

        <Notifier 
        notifier={notifier} 
        onClose={handleCloseNotifier} 
      />
    </>
  )
}

export default App