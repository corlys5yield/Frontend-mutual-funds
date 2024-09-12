import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import refer from '../../../assets/refer.jpg';
import promos from '../../../assets/promo.jpg';
import fondos from '../../../assets/nuefon.webp';
import '../HomeCss/Home.css';

gsap.registerPlugin(ScrollTrigger);

const novedades = [
  {
    title: "Sistema de Referidos",
    description: "Invita a tus amigos a unirse a nuestro fondo común y gana recompensas especiales por cada referido.",
    image: refer,
    link: "#"
  },
  {
    title: "Promociones de Ingreso",
    description: "Aprovecha nuestras promociones exclusivas al realizar tu primer depósito en nuestro fondo común.",
    image: promos,
    link: "#"
  },
  {
    title: "Posibles Nuevos Fondos",
    description: "Explora las oportunidades de inversión en nuestros nuevos fondos disponibles próximamente.",
    image: fondos,
    link: "#"
  }
];

const SecNews = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      });
    });
  }, []);

  return (
    <div className='sec-News '>
      <div className="overlay"></div>
      <Container className="mt-5 text-container text-start">
        <h2 className="text-center text-shadow mb-4">Novedades</h2>
        <p className="text-center mb-5">Mantente al día con nuestras últimas promociones y noticias.</p>
        <Row>
          {novedades.map((novedad, index) => (
            <Col xs={12} md={6} lg={4} key={index} className="mb-4">
              <Card ref={(el) => (cardRefs.current[index] = el)} className="h-100 bg-dark shadow-lg">
                <Card.Img variant="top" src={novedad.image} />
                <Card.Body>
                  <Card.Title className='text-white text-shadow' >{novedad.title}</Card.Title>
                  <Card.Text className='text-secondary'>{novedad.description}</Card.Text>
                  <Button className='rounded-pill' variant="outline-warning"  href={novedad.link}>Más información</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SecNews;
