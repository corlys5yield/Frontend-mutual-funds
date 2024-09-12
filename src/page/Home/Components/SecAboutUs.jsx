import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Alert from 'react-bootstrap/Alert';

import '../HomeCss/Home.css';

gsap.registerPlugin(ScrollTrigger);

export const SecAboutUs = () => {
  const [activeKey, setActiveKey] = useState(null);
  const accordionRefs = useRef([]);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const alertRef = useRef(null); 

  useEffect(() => {
    accordionRefs.current.forEach((ref, index) => {
      ScrollTrigger.create({
        trigger: ref,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.fromTo(
            ref,
            { scale: 0.8, rotate: -10, opacity: 0 },
            {
              duration: 1.5,
              scale: 1,
              rotate: 0,
              opacity: 1,
              ease: 'power3.out',
            }
          );
        },
        onLeaveBack: () => {
          gsap.to(ref, { opacity: 0, scale: 0.8, rotate: 10 });
        }
      });
    });

    ScrollTrigger.create({
      trigger: textRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.fromTo(
          textRef.current,
          { scale: 0.8, rotate: -10, opacity: 0 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.5, ease: 'power3.out' }
        );
      },
      onLeaveBack: () => {
        gsap.to(textRef.current, { opacity: 0, scale: 0.8, rotate: 10 });
      }
    });

    // Animación para el Alert
    ScrollTrigger.create({
      trigger: alertRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.fromTo(
          alertRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
        );
      },
      onLeaveBack: () => {
        gsap.to(alertRef.current, { scale: 0.9, opacity: 0 });
      }
    });

  }, []);

  useEffect(() => {
    if (activeKey !== null) {
      gsap.to(accordionRefs.current, {
        scale: (index) => (index.toString() === activeKey ? 1 : 0.8),
        rotate: (index) => (index.toString() === activeKey ? 0 : 10),
        opacity: (index) => (index.toString() === activeKey ? 1 : 0),
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(containerRef.current, {
        height: 'auto',
        duration: 0.8,
        ease: 'power3.out',
      });
    } else {
      gsap.to(accordionRefs.current, {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.to(containerRef.current, {
        height: 'auto',
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [activeKey]);

  return (
    <Container>
      <div className="custom-container2" ref={containerRef}>
        <h2 ref={textRef} className="d-flex justify-content-center align-items-center text-dark p-3 text-shadow">
          Sobre Nosotros
        </h2>

        {/* Ref aplicado al componente Alert */}
        <Alert variant="dark" ref={alertRef}>
          <Alert.Heading>
            <h2 className="welcome-text text-shadow text-dark">
              <span className="text-warning text-shadow">5</span>yield
            </h2>
          </Alert.Heading>
          <hr />
          <p className="d-flex justify-content-center align-items-center text-dark mb-5">
            Bienvenidos a 5Yield donde ofrecemos una forma confiable de invertir con cuotas extremadamente bajas. Nuestra
            estrategia se basa en la reinversión constante de las ganancias mediante una 'escalera' de apuestas, maximizando
            el retorno de inversión de manera segura y calculada.
            En 5yield, nos comprometemos con la transparencia y la seguridad de nuestros inversores. Implementamos límites
            de depósitos para evitar comportamientos impulsivos, asegurando una inversión responsable. Nos diferenciamos de
            los esquemas piramidales al ofrecer un sistema legítimo respaldado por un análisis riguroso y gestión experta.
            Únete a nosotros y descubre cómo nuestra metodología innovadora puede hacer crecer tus inversiones con confianza.
          </p>
        </Alert>
      </div>
    </Container>
  );
};

export default SecAboutUs;
