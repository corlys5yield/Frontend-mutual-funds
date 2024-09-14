import React, { useEffect, useRef } from 'react';
import { Card, Accordion, Row, Col, Container } from 'react-bootstrap';
import { gsap } from 'gsap';
import '../HomeCss/Home.css';

export const SecFaq = () => {
  const faqs = [
    {
      question: "¿Qué es 5Yield?",
      answer: " 5Yield es una plataforma donde los inversores pueden unir sus recursos para que nosotros realizemos apuestas deportivas con cuotas extremadamente bajas. El objetivo es generar ganancias consistentes a través de una estrategia de apuestas escalonadas, reinvirtiendo las ganancias diariamente. ",
    },
    {
      question: "¿Cómo funciona la estrategia de apuestas?",
      answer: "La estrategia implica apostar el 10% del fondo inicial cada día en apuestas con cuotas muy bajas. Las ganancias se reinvierten en una escalera de apuestas, realizando dos apuestas en el día para maximizar el retorno de inversión.",
    },
    {
      question: "¿Cuál es el retorno de inversión esperado?",
      answer: "El retorno de inversión mensual es del 25%. pudiendo llegar hasta un 40 o 50%.",
    },
    {
      question: "¿Cómo puedo invertir en el fondo?",
      answer: "Puedes invertir a través de nuestra pagina de web. Actualmente, aceptamos depósitos a través de Binance.",
    },
    {
      question: "¿Cómo se gestionan y comunican las ganancias?",
      answer: "Las ganancias se calculan semanalmente y se informan a los inversores a través de la plataforma.Cada inversor recibirá un informe detallado de sus respectivas ganancias.",
    },
    {
      question: "¿Es seguro invertir en el fondo?",
      answer: "Nuestro equipo de expertos en apuestas deportivas utiliza un análisis riguroso para seleccionar las mejores apuestas con cuotas bajas, minimizando los riesgos. Sin embargo, como toda inversión,existe un nivel de riesgo que los inversores deben considerar.",
    },
    {
      question: "¿Cómo puedo retirar mis ganancias?",
      answer: "Las ganancias se pueden retirar directamente a través de la plataforma.Los fondos se transferirán a la cuenta de Binance del inversor.",
    },
    {
      question: "¿Qué sucede si una apuesta no gana?",
      answer: "Aunque trabajamos para minimizar las pérdidas, entendemos que las apuestas deportivas siempre tienen un grado de incertidumbre. Si una apuesta no gana, ajustaremos la estrategia para recuperar las pérdidas en las siguientes apuestas",
    },
    {
      question: "¿Cómo puedo contactar al equipo de soporte?",
      answer: "Puedes contactar a nuestro equipo de soporte a través de la sección de ayuda en la plataforma o enviando un correo electrónico a [aqui va el email].",
    },
    {
      question: "¿Qué requisitos hay para participar en el fondo?",
      answer: "Para participar, debes tener una cuenta en Binance y ser mayor de edad según las leyes de tu país. Además, debes aceptar los términos y condiciones del fondo. El deposito minimo es de 50 usd.",
    },
    {
      question: "¿Por qué debería confiar en 5Yield?",
      answer: "Nuestro fondo común de inversión es completamente confiable, respaldado por estrategias sólidas y transparentes, ademas de contar con estadisticas semanales y mensuales. A diferencia de los esquemas piramidales basados en el esquema de Ponzi, nuestro fondo no depende de la entrada de nuevos inversores para generar rendimientos. Siempre aconsejamos tener cuidado con los fondos comunes de inversión que prometen retornos excesivamente altos sin una base financiera clara, ya que podrían ser estafas.",
    },
    {
      question: "¿Cuál es el límite de depósito en su fondo común de inversión?",
      answer: "Para proteger a nuestros inversores y promover una inversión responsable, hemos establecido límites de depósito. Esto ayuda a evitar comportamientos ambiciosos o ludópatas. Recomendamos a todos nuestros clientes que solo inviertan dinero que estén dispuestos a perder, asegurando así que las decisiones financieras sean sensatas y seguras.",
    },
  ];

  const faqRefs = useRef([]);

  useEffect(() => {
    faqRefs.current.forEach((faq, index) => {
      gsap.fromTo(
        faq,
        {
          opacity: 0,
          rotateY: 90
        },
        {
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: faq,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <div className='sec-News d-flex justify-content-center align-items-center'>
      <div className="overlay"></div>
      <Container className="mt-5 text-container text-start">
    <Card className="p-4 shadow-lg">
      <h2 className="text-center text-shadow">Conoce mas de 5yield</h2>
      <p className="text-center ">Conoce lo que hacemos y encuentra respuestas a preguntas frecuentes.</p>
      <Row>
        {faqs.map((faq, index) => (
          <Col xs={12} md={6} lg={3} className="mb-4" key={index}>
            <Accordion className='custom-accordion-item' ref={el => faqRefs.current[index] = el}>
              <Accordion.Item eventKey="0" className="custom-accordion-item">
                <Accordion.Header className="custom-accordion-header">{faq.question}</Accordion.Header>
                <Accordion.Body className="custom-accordion-body">{faq.answer}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        ))}
      </Row>
    </Card>
  </Container>
    </div>
    
  );
};

export default SecFaq;

