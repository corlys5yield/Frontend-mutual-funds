import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, NavDropdown, Form, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";
import Logo from '../../../assets/FondoComunIcon.png'; // Asegúrate de ajustar la ruta al logo
import { starCreateFund } from '../Helpers/StarCreateFund';
import { UserManagementButton } from './UsersManagment';
import { addPercentage } from '../Helpers/Addporcentage';

export const NavbarAdmin = ({ email, id, setNewFund, navigate }) => {

    const [showModal, setShowModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showPercentageModal, setShowPercentageModal] = useState(false); // Estado para el modal de porcentaje

    const [fundDetails, setFundDetails] = useState({
        period: '',
        startDate: '',
        endDate: '',
        maxInvestors: '',
        minInvestmentAmount:''
    });

    const [percentageDetails, setPercentageDetails] = useState({
        percentage: '',
        endDate: '',
    });

    const handleInputChange = (e) => {
        setFundDetails({
            ...fundDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handlePercentageInputChange = (e) => {
        setPercentageDetails({
            ...percentageDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateFund = () => {
        // Aquí puedes manejar el envío de los detalles del fondo
        if (
            fundDetails.period.trim() === "" ||
            fundDetails.startDate.trim() === "" ||
            fundDetails.endDate.trim() === "" ||
            fundDetails.maxInvestors.trim() === "" ||
            fundDetails.minInvestmentAmount.trim() === ""
        ){
            Swal.fire({
                title: "ERROR",
                text: "Todos los campos son obligatorios",
                icon: "error",
                background: "#f9f9f9",
                confirmButtonColor: "#ffc107",
                customClass: {
                    title: "swal2-title-custom",
                    content: "swal2-content-custom",
                    confirmButton: "swal2-confirm-custom",
                },
            });
        } else {
            Swal.fire({
                title: '¿Estás seguro de crear el fondo con estos datos?',
                text: `${fundDetails.period}, ${fundDetails.startDate}, ${fundDetails.endDate}, ${fundDetails.maxInvestors}, ${fundDetails.minInvestmentAmount}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, crear',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    starCreateFund(fundDetails.period, fundDetails.startDate, fundDetails.endDate, fundDetails.maxInvestors, fundDetails.minInvestmentAmount, setNewFund, navigate);
                    setShowModal(false);
                }
            });
        }
    };

    const handleAddPercentage = () => {
        if ( percentageDetails.percentage.trim() === "" || percentageDetails.endDate.trim() === "") {
            Swal.fire({
                title: "ERROR",
                text: "Todos los campos son obligatorios",
                icon: "error",
                background: "#f9f9f9",
                confirmButtonColor: "#ffc107",
                customClass: {
                    title: "swal2-title-custom",
                    content: "swal2-content-custom",
                    confirmButton: "swal2-confirm-custom",
                },
            });
        } else {
            Swal.fire({
                title: '¿Estás seguro de añadir este porcentaje?',
                text: `${percentageDetails.percentage}% hasta ${percentageDetails.endDate}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, añadir',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Aquí deberías manejar el guardado del porcentaje
                    addPercentage(percentageDetails.percentage,percentageDetails.endDate,navigate)
                    console.log('Añadir porcentaje:', percentageDetails);
                    setShowPercentageModal(false);
                }
            });
        }
    };

    const ir_LogOut = () => {
        Swal.fire({
            title: '¿Estás seguro de salir?',
            text: 'Al salir se cerrará la sesión.',
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
                <Navbar collapseOnSelect expand="lg" className="custom-navbar">
                    <Container fluid>
                        <Navbar.Brand onClick={ir_LogOut} style={{ cursor: 'pointer' }}>
                            <img className="Logo" style={{ width: '165px' }} src={Logo} alt="Logo" />
                        </Navbar.Brand>
                        <Navbar.Brand className='pe-4 text-light' onClick={ir_LogOut} style={{ cursor: 'pointer' }}>
                        <h3 className="welcome-text text-shadow text-light">
                <span className="text-warning text-shadow">5</span>yield
              </h3>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='custom-navbar-toggle text-light'/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <div className="d-none d-lg-flex">
                                    <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => setShowModal(true)}>Crear Fondo común</Button>
                                    <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => setShowPercentageModal(true)}>Añadir Porcentaje</Button>
                                    <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => setShowUserModal(true)}>Usuarios</Button>
                                </div>

                                <div className="d-lg-none">
                                    <Dropdown>
                                        <Dropdown.Toggle className="m-2 rounded-pill custom-dropdown-toggle" variant="outline-light" id="dropdown-basic">Opciones</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <NavDropdown.Item onClick={() => setShowModal(true)}>Crear Fondo común</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => setShowPercentageModal(true)}>Añadir Porcentaje</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => setShowUserModal(true)}>Usuarios</NavDropdown.Item>
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

            {/* Modal para Crear Fondo común */}
            <Modal show={showModal} onHide={() => setShowModal(false)} className="shadow-lg welcome-text text-shadow text-light">
                <Modal.Header closeButton className="bg-dark border-warning">
                    <Modal.Title>Crear Fondo común</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                    <Form>
                        <Form.Group controlId="formPeriod">
                            <Form.Label>Periodo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Periodo (ej. Agosto)"
                                name="period"
                                value={fundDetails.period}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStartDate" className="mt-3">
                            <Form.Label>Fecha de inicio</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={fundDetails.startDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndDate" className="mt-3">
                            <Form.Label>Fecha de fin</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={fundDetails.endDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMaxInvestors" className="mt-3">
                            <Form.Label>Cantidad máxima de inversores</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxInvestors"
                                value={fundDetails.maxInvestors}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMinInvestmentAmount" className="mt-3">
                            <Form.Label>Monto mínimo de inversión</Form.Label>
                            <Form.Control
                                type="number"
                                name="minInvestmentAmount"
                                value={fundDetails.minInvestmentAmount}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='bg-dark justify-content-center border-0'>
                    <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => setShowModal(false)}>Cerrar</Button>
                    <Button className="m-2 rounded-pill" variant="outline-warning" onClick={handleCreateFund}>Crear Fondo</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Añadir Porcentaje */}
            <Modal show={showPercentageModal} onHide={() => setShowPercentageModal(false)} className="shadow-lg welcome-text text-shadow text-light">
                <Modal.Header closeButton className="bg-dark border-warning">
                    <Modal.Title>Añadir Porcentaje de Período</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                    <Form>
                        <Form.Group controlId="formPercentage" className="mt-3">
                            <Form.Label>Porcentaje</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Porcentaje (ej. 10%)"
                                name="percentage"
                                value={percentageDetails.percentage}
                                onChange={handlePercentageInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPercentageEndDate" className="mt-3">
                            <Form.Label>Fecha que finalizo el periodo</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={percentageDetails.endDate}
                                onChange={handlePercentageInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='bg-dark justify-content-center border-0'>
                    <Button className="m-2 rounded-pill" variant="outline-light" onClick={() => setShowPercentageModal(false)}>Cerrar</Button>
                    <Button className="m-2 rounded-pill" variant="outline-warning" onClick={handleAddPercentage}>Añadir Porcentaje</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Usuarios */}
            <UserManagementButton show={showUserModal} setShow={setShowUserModal} navigate={navigate} />
        </>
    );
};






  
