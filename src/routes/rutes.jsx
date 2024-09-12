import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeWelcome } from '../page/Home/HomeWelcome';
import { gsap } from 'gsap';
import Logo from '../assets/FondoComunIcon.png';
import { Admins } from '../page/Admins/Admins';
import { Investors } from '../page/Investors/Investors';
import Footer from '../components/Footer';

const AppRouter = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  // Animaciones para el logo y el texto
  useEffect(() => {

    gsap.fromTo('.welcome-logo', { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power1.out' });

    gsap.fromTo('.welcome-text',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  // Ejecuta la animación del contenido después de que showWelcome se vuelva false
  useEffect(() => {
    if (!showWelcome) {
      gsap.to('.content-container', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    }
  }, [showWelcome]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000); // Duración de la animación de bienvenida

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <BrowserRouter>
      {showWelcome ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column bg-intro">
          <img
            src={Logo}
            alt="Logo"
            className="welcome-logo"
            style={{ width: '500px' }}
          />
          <h1 className="welcome-text text-light">
            <span className="text-warning">5</span>yield
          </h1>
        </div>
      ) : (
        <div >
          <div className="d-flex flex-column min-vh-100">
            <div className="flex-fill content-container">
              <Routes>
                <Route path="/*" element={<HomeWelcome />} />
                {/* ruta en teoría no habilitada */}
                <Route path="/admins" element={<Admins />} />
                <Route path="/inv" element={<Investors />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;




