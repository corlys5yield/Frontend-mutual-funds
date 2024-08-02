import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/icono_blanco.png'; // Asegúrate de ajustar la ruta al logo
import './compcss/components.css';

const MainNavbar = ({ handleShowModal }) => {

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
  <Container fluid>
    <Navbar.Brand href="/">
      <img className="Logo" style={{ width: '165px' }} src={Logo} alt="Logo" />
    </Navbar.Brand>
    <Navbar.Brand className='pe-4 text-light' as={Link} to="/">5yield</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" className='custom-navbar-toggle text-light'/>
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto"></Nav>
      <Nav>
        {/* Botones visibles solo en pantallas grandes */}
        <div className="d-none d-lg-flex">
          
          <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => scrollToSection('faq')}>FAQ / Nosotros</Button>
          <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => scrollToSection('goals')}>Objetivos</Button>
          <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => scrollToSection('rendimiento')}>Rendimientos anteriores</Button>
          <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => scrollToSection('news')}>Novedades</Button>
        </div>
        
        {/* Dropdown visible solo en pantallas pequeñas */}
        <div className="d-lg-none">
          <Dropdown>
            <Dropdown.Toggle className="m-2 rounded-pill custom-dropdown-toggle" variant="outline-light" id="dropdown-basic">Sobre Nosotros</Dropdown.Toggle>
            <Dropdown.Menu>
              <NavDropdown.Item onClick={() => scrollToSection('faq')}>FAQ</NavDropdown.Item>
              <NavDropdown.Item onClick={() => scrollToSection('goals')}>Objetivos</NavDropdown.Item>
              <NavDropdown.Item onClick={() => scrollToSection('rendimiento')}>Rendimientos anteriores</NavDropdown.Item>
              <NavDropdown.Item onClick={() => scrollToSection('news')}>Novedades</NavDropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Botón de iniciar sesión visible en todas las pantallas */}
        <Button className="m-2 rounded-pill" variant="outline-warning" onClick={handleShowModal}>Iniciar</Button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    </div>
  );
};

export default MainNavbar;
