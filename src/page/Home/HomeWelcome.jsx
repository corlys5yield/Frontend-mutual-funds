import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from '../../assets/FondoComunIcon.png';
import { SecPrecentation } from './Components/SecPrecentation';
import { SecRendimiento } from './Components/SecRendimiento';
import SecGoals from './Components/SecGoals';
import SecNews from './Components/SecNews';
import { SecFaq } from './Components/SecFaq';
import MainNavbar from '../../components/MainNavbar';
import { FormLogin } from './Components/FormLogin';
import { FormRegister } from './Components/FormRegister';
import SecAboutUs from './Components/SecAboutUs';


gsap.registerPlugin(ScrollTrigger);

export const HomeWelcome = () => {
  const sectionsRef = useRef([]);
  const [scrolling, setScrolling] = useState(false);
  const [showModalL, setShowModalL] = useState(false);//modal login
  const [showModalR, setShowModalR] = useState(false);//modal register

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    gsap.fromTo('.background-image',
      { opacity: 0 },
      { opacity: 1, duration: 2 }
    );

    gsap.fromTo('.overlay-image',
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 2, delay: 1 }
    );

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleShowModal = () => setShowModalL(true);//ABRE MODAL LOGIN
  const handleCloseModal = () => setShowModalL(false);//CIERRA MODAL LOGIN

  const handleCloseModalR = () => setShowModalR(false);//CIERRA MODAL REG

  const handleShowModalR = () => {
    setShowModalL(false); // Cierra el modal de login
    setTimeout(() => setShowModalR(true), 300); // Abre el modal de registro después de un pequeño retraso
  };

  return (
    <div className="d-flex flex-column min-vh-100">

      <div ref={el => (sectionsRef.current[0] = el)}>
        <div className="navbar-container text-white">
          <MainNavbar handleShowModal={handleShowModal} />
          <hr></hr>
        </div>
        <SecPrecentation handleShowModal={handleShowModal} />
      </div>

      <div id="AboutUs" ref={(el) => (sectionsRef.current[1] = el)} className="section text-white text-center ">

        
          <SecAboutUs />
        


      </div>

      <div id="goals" ref={(el) => (sectionsRef.current[2] = el)} className="section text-white text-center ">
        <SecGoals />
      </div>
      <div id="rendimiento" ref={(el) => (sectionsRef.current[3] = el)} className="section text-white text-center py-5">

        <Container>
          <SecRendimiento />
        </Container>


      </div>
      <div id="faq" ref={(el) => (sectionsRef.current[4] = el)} className="section text-white text-center ">
        
          <SecFaq />
        
      </div>
      
      {/*

      <div id="news" ref={(el) => (sectionsRef.current[5] = el)} className="section text-white text-center">
        
        <SecNews />
      </div>
        
        */}
      
      <Button
        className={`position-sticky fw-bold bottom-0 end-0 ${scrolling ? 'd-block' : 'd-none'}`}
        variant="warning"
        size="sm"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        volver
      </Button>

      <Modal
        show={showModalL}
        onHide={handleCloseModal}
        centered
        className="shadow-lg"
      >
        <Modal.Header closeButton className="bg-dark border-warning">

          <div className="d-flex text-shadow justify-content-start ">
            <img
              src={Logo}
              alt="Logo"
              className="welcome-logo"
              style={{ width: '200px' }}
            />
          </div>
          <div className="d-flex justify-content-center ">
            <h1 className="welcome-text text-shadow text-light">
              <span className="text-warning text-shadow">5</span>yield
            </h1>
          </div>

        </Modal.Header>
        <Modal.Body className="bg-dark">
          <FormLogin />
        </Modal.Body>
        <Modal.Footer className="bg-dark justify-content-center border-0">
          <Button className="m-2 rounded-pill" variant="outline-light" onClick={handleShowModalR}>
            Únete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Registro */}
      <Modal
        show={showModalR}
        onHide={handleCloseModalR}
        centered
        className="shadow-lg"
      >
        <Modal.Header closeButton className="bg-dark border-warning">

          <div className="d-flex text-shadow justify-content-start ">
            <img
              src={Logo}
              alt="Logo"
              className="welcome-logo"
              style={{ width: '200px' }}
            />
          </div>
          <div className="d-flex justify-content-center w-100">
            <h1 className="welcome-text text-light">
              Registro
            </h1>
          </div>


        </Modal.Header>
        <Modal.Body className="bg-dark">

          <FormRegister handleCloseModalR={handleCloseModalR} />

        </Modal.Body>

      </Modal>

    </div>
  );
};

export default HomeWelcome;


