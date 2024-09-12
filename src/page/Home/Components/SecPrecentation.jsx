import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import ilus from '../../../assets/cos1.jpg';
import ilus2 from '../../../assets/cos2.jpg';
import ilus3 from '../../../assets/cos3.jpg';
import '../HomeCss/Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SecPrecentation = ({ handleShowModal }) => {
  const navigate = useNavigate();

  const textRefs = useRef([]);
  textRefs.current = [];

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const ir_Login = () => {
    navigate('/login');
  };

  const animations = {
    fadeRight: { opacity: 0, x: 50, filter: 'blur(5px)' },
    fadeUp: { opacity: 0, y: 50, filter: 'blur(5px)' },
    fadeLeft: { opacity: 0, x: -50, filter: 'blur(5px)' },
  };

  const animateElement = (elementRef, animation, duration = 2.5) => {
    gsap.fromTo(
      elementRef,
      animation,
      {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration,
        ease: 'power3.out',
      }
    );
  };

  const handleBeforeChange = () => {
    textRefs.current.forEach((element, index) => {
      gsap.to(element, {
        opacity: 0,
        x: index === 2 ? -50 : index < 2 ? 50 : 0,
        y: index === 2 ? 0 : 50,
        filter: 'blur(5px)',
        duration: 1,
        ease: 'power3.in',
      });
    });
  };

  const handleAfterChange = (current) => {
    setTimeout(() => {
      textRefs.current.forEach((element, index) => {
        let animationType;
        if (current === 0) {
          animationType = animations.fadeLeft;
        } else if (current === 1) {
          animationType = animations.fadeUp;
        } else {
          animationType = animations.fadeRight;
        }
        animateElement(element, animationType, index === 2 ? 1.5 : 2.5);
      });
    }, 500);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
    arrows: false,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };

  useEffect(() => {
    handleAfterChange(0);
  }, []);

  return (
    <div className="section text-white text-center position-relative">
      
      <Slider {...settings} className="w-100 h-100">
        <div className="carousel-slide">
          <div className="carousel-image" style={{ backgroundImage: `url(${ilus})` }}>
            <div className="overlay"></div>
            <Container className="d-flex flex-column align-items-start justify-content-center min-vh-100">
              <div className="text-container text-start">
                <h1 ref={addToRefs}>Invierte en Resultados Excepcionales</h1>
                <p ref={addToRefs}>Garantizamos rendimientos constantes y crecimiento financiero.</p>
                <Button ref={addToRefs} variant="outline-warning" className="mt-3 rounded-pill" onClick={handleShowModal}>Únete a nosotras</Button>
              </div>
            </Container>
          </div>
        </div>
        <div className="carousel-slide">
          <div className="carousel-image" style={{ backgroundImage: `url(${ilus2})` }}>
            <div className="overlay"></div>
            <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
              <div className="text-container text-center">
                <h1 ref={addToRefs}>Únete a Nuestra Comunidad de Éxito</h1>
                <p ref={addToRefs}>La colaboración y el trabajo en equipo nos llevan más lejos.</p>
                <Button ref={addToRefs} variant="outline-warning" className="mt-3 rounded-pill" onClick={handleShowModal}>Únete a nosotras</Button>
              </div>
            </Container>
          </div>
        </div>
        <div className="carousel-slide">
          <div className="carousel-image" style={{ backgroundImage: `url(${ilus3})` }}>
            <div className="overlay"></div>
            <Container className="d-flex flex-column align-items-end justify-content-center min-vh-100">
              <div className="text-container text-end">
                <h1 ref={addToRefs}>Alcanza Tus Sueños con Nosotros</h1>
                <p ref={addToRefs}>Transformamos tus metas financieras en realidad.</p>
                <Button ref={addToRefs} variant="outline-warning" className="mt-3 rounded-pill" onClick={handleShowModal}>Únete a nosotras</Button>
              </div>
            </Container>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SecPrecentation;



