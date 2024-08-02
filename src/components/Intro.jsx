import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/FondoComunIcon.png';

const Intro = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const tl = gsap.timeline();
  
    // Seleccionar cada letra individualmente
    const chars = textRef.current.querySelectorAll('.char');
  
    // Animación del logo
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 3.0, ease: 'power3.out' }
    ).fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: {
          each: 0.05,
          from: "random"
        },
      },
      '-=1'
    );
  }, []);
  
  const ir_Login = () => {
    navigate('/login');
  };
  
  // Función para dividir el texto en caracteres envueltos en spans
  const splitText = (text, highlightChar) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={char === highlightChar ? 'char highlight' : 'char'}
        style={{ color: char === highlightChar ? '#ffc107' : 'inherit' }}
      >
        {char}
      </span>
    ));
  };
  

  return (
    <div ref={containerRef} className="intro-container">
      <img ref={logoRef} src={Logo} alt="Logo" style={{ width: '200px' }} />
      <div ref={textRef} style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1 className='text-light'>
          {splitText('5yield', '5')}
        </h1>
        <p className='text-light'>
          {splitText('Chupala barbuda trola, responsable: "Erick" Santiago Armando Abdala', ' ')}
        </p>
      </div>
    </div>
  );
};

export default Intro;
