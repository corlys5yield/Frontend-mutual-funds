import React, { useEffect, useRef } from 'react';
import { Container, Card } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../HomeCss/Home.css';

gsap.registerPlugin(ScrollTrigger);

const SecGoals = () => {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const animateElement = (elementRef, animation, duration = 2.5) => {
      gsap.fromTo(
        elementRef,
        { opacity: 0, ...animation }, // Initial state
        {
          opacity: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elementRef,
            start: 'top 80%',
            toggleActions: 'play none none reset',
            markers: false, // Remove markers if not needed
          },
        }
      );
    };

    animateElement(titleRef.current, { x: -50, filter: 'blur(5px)' }, 2.5);
    animateElement(paragraphRef.current, { x: -50, filter: 'blur(5px)' }, 3);
    animateElement(cardRef.current, { x: 300, opacity: 0, duration: 1, delay: 1 }, 3.5);
  }, []);

  return (
    <div className="sec-goals text-white text-center">
      <Container className="min-vh-100 d-flex align-items-center">
        <div className="row w-100">
          <div className="col-md-6 mt-5 text-container text-start">
            <h1 ref={titleRef} className='mt-5 d-none d-md-block'>Alcanza Tus Metas</h1>
            <p ref={paragraphRef} className='mt-5 d-none d-md-block'>Únete a nuestra comunidad y transforma tus sueños en realidad.</p>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center mt-5">
            <Card ref={cardRef} className="fondo-card shadow-lg w-100">
              <div className="overlay"></div>
              <Card.Body>
                <Card.Title>
                  <h3 className='text-container text-start'>Metas de Inversión</h3>
                </Card.Title>
                <Card.Text>
                  {[
                    {
                      icon: "bi-cash-coin",
                      title: "Aumento del Patrimonio",
                      description: "Incrementa tu capital inicial a través de estrategias de inversión bien planificadas y ejecutadas en el mundo de las apuestas deportivas."
                    },
                    {
                      icon: "bi-bar-chart-line",
                      title: "Generación de Ingresos Pasivos",
                      description: "Disfruta de ingresos adicionales sin esfuerzo diario, permitiendo que nuestras estrategias de inversión en apuestas deportivas trabajen para ti."
                    },
                    {
                      icon: "bi-piggy-bank",
                      title: "Cumplimiento de Objetivos Financieros",
                      description: "Logra tus metas financieras a corto, mediano y largo plazo, a través de rendimientos consistentes."
                    },
                    {
                      icon: "bi-arrow-down-up",
                      title: "Protección contra la Inflación",
                      description: "Protege tu dinero del impacto negativo de la inflación, obteniendo rendimientos superiores a la tasa de inflación promedio mediante inversiones estratégicas en nuestras apuestas deportivas."
                    },
                    {
                      icon: "bi-file-earmark-bar-graph",
                      title: "Transparencia y Confianza",
                      description: "Invierte con tranquilidad gracias a la transparencia en nuestras operaciones y la confianza que brindamos con informes regulares y detallados sobre el rendimiento del fondo."
                    },
                    {
                      icon: "bi-8-circle",
                      title: "Acceso a Expertos en Apuestas Deportivas",
                      description: "Benefíciate de la experiencia y conocimientos de profesionales en apuestas deportivas que gestionan el fondo, maximizando tus probabilidades de éxito."
                    }
                  ].map((item, index) => (
                    <Container key={index} className={`mt-5 text-container text-start ${index >= 3 ? 'd-none d-md-block' : ''}`}>
                      <div className="row w-100 align-items-center">
                        <h1 className="col-auto text-warning">
                          <i className={`bi ${item.icon}`}></i>
                        </h1>
                        <div className="col text-start text-secondary">
                          <h5 className="mb-1 text-warning">{item.title}</h5>
                          <p className="mb-0 text-white">{item.description}</p>
                        </div>
                      </div>
                    </Container>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SecGoals;





