import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../assets/FondoComunIcon.png'; // Asegúrate de ajustar la ruta al logo

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
          

          <div className='d-flex justify-content-center align-items-center p-5 p-sm-4 mb-1'>
          <img className="Logo" style={{ width: '250px' }} src={Logo} alt="Logo" />
          </div>
          <h3 className="welcome-text text-shadow text-light d-flex justify-content-center align-items-center p-sm-4 mb-1">
                <span className="text-warning text-shadow">5</span>yield
              </h3>
          
          <p className="mb-1 text-secondary">
              ¡Invierte con confianza y observa cómo crece tu capital!
            </p>

          
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Innovación y Seguridad</h5>
            <ul className="list-unstyled">
              <li>
                <p className="text-secondary">
                  Animate a invertir en nosotros a través de Binance, estamos orgullosos de trabajar con una de las principales plataformas de intercambio de criptomonedas más grandes del mundo.
                </p>
              </li>
              <li>
                <p className="text-secondary">
                  Nuestro enfoque innovador en el mercado de apuestas deportivas está diseñado para maximizar el retorno de tu inversión.
                </p>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5>Contacto de Soporte</h5>
            <p>Para cualquier consulta o problema no dudes en contactarnos:</p>
            <a href="mailto:soporte@5yield.com" className="text-secondary">soporte@5yield.com</a>
            <ul className="list-unstyled mt-2">
              <li><a href="mailto:soporte@5yield.com?subject=Olvido%20de%20Contraseña" className="text-secondary"> • Olvido de Contraseña</a></li>
              <li><a href="mailto:soporte@5yield.com?subject=Problema%20con%20Solicitud%20de%20Depósito" className="text-secondary">• Problemas con Solicitudes de Depósito</a></li>
              <li><a href="mailto:soporte@5yield.com?subject=Problema%20con%20Solicitud%20de%20Retiro" className="text-secondary">• Problemas con Solicitudes de Retiro</a></li>
              <li><a href="mailto:soporte@5yield.com?subject=Problema%20con%20la%20Plataforma" className="text-secondary">• Problemas con la Plataforma</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="text-center">
            <hr />
            <p className="mb-0">
              &copy; 2024 5Yield. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
