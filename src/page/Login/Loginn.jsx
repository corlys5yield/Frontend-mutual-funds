import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ForularioLogin } from './Components/FormularioLogin';
import'./css/Login.css'

export const Loginn = () => {
    const slogans = [
        { title: '$ Multiplica tu Futuro: Invierte en Nuestro Fondo Común Hoy $', description: 'Aprovecha oportunidades excepcionales y asegúrate un futuro financiero sólido con nosotros..' },
        { title: '$ Invierte con Confianza: Tu Dinero, Nuestro Compromiso $', description: 'Descubre el poder de la inversión inteligente y asegura el crecimiento de tu capital.' },
        { title: '$ El Éxito Financiero Empieza Aquí: Únete a Nuestro Fondo Común $', description: 'Transforma tus sueños en realidad con inversiones estratégicas y rentables.' },
        // Agrega más frases según sea necesario
      ];
    
      const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
      const [key, setKey] = useState(0);
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
          setKey((prevKey) => prevKey + 1);
        }, 5000);
    
        return () => clearInterval(intervalId);
      }, []);

    return (
        <div className='bg-dark'>
            
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <Row>
                    <Col key={key} className='m-auto p-5 text-color-slogans' style={{ animation: 'tracking-in-expand-forward-top 1s ease-out' }}>
                    <h1>{slogans[currentSloganIndex].title}</h1>
            <h4>{slogans[currentSloganIndex].description}</h4>
                    </Col>
                    <Col className='m-auto p-5'>
                    <ForularioLogin/> 
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
