import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, NavDropdown, Form } from 'react-bootstrap';
import Swal from "sweetalert2";
import Logo from '../../../assets/FondoComunIcon.png'; // Asegúrate de ajustar la ruta al logo
import { HistoryTransUserModal } from './HistoryTransUser';


export const NavbarUser = ({ email, id, navigate }) => {

    const [showTransModal, setShowTransrModal] = useState(false);


    const ir_LogOut = () => {



        Swal.fire({
            title: '¿Estás seguro de salir?',
            text: 'al salir se cerrara la sesion .',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, Salir',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                email = null;
                navigate('/*');

            }
        });


    };

    return (
        <>
            {email !== null ? (
                <Navbar collapseOnSelect expand="lg" className="custom-navbar" >
                    <Container fluid>
                        <Navbar.Brand onClick={ir_LogOut} style={{ cursor: 'pointer' }}>
                            <img className="Logo" style={{ width: '165px' }} src={Logo} alt="Logo" />
                        </Navbar.Brand>
                        <Navbar.Brand className='pe-4 text-light' onClick={ir_LogOut} style={{ cursor: 'pointer' }}>
                            <h3 className="welcome-text text-shadow text-light">
                                <span className="text-warning text-shadow">5</span>yield
                            </h3>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='custom-navbar-toggle text-light' />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <div className="d-none d-lg-flex">

                                    <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => setShowTransrModal(true)}>Historial de transacciones</Button>
                                </div>

                                <div className="d-lg-none">
                                    <Dropdown>
                                        <Dropdown.Toggle className="m-2 rounded-pill custom-dropdown-toggle" variant="outline-light" id="dropdown-basic">Opciones</Dropdown.Toggle>
                                        <Dropdown.Menu>

                                            <NavDropdown.Item onClick={() => setShowTransrModal(true)}>Historial de transacciones</NavDropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Nav>

                            <Form className="d-flex">
                                <div className='me-5'>
                                    <Button className="m-2 rounded-pill" variant="outline-danger" onClick={ir_LogOut}>
                                        <i className="bi bi-box-arrow-left"> </i>
                                        Salir
                                    </Button>
                                </div>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            ) : (
                <h1>usted no tiene acceso</h1>
            )}
            <HistoryTransUserModal show={showTransModal} setShow={setShowTransrModal} id={id} navigate={navigate} />


        </>
    );
};
