import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

export const TableInvestors = ({ fund = {} }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Obtener la lista de inversores desde el objeto fund
  const investors = fund.investors || [];
  

  return (
    <>
      <Button className="m-2 rounded-pill" variant="outline-light" onClick={handleShow} >
        Inversores{' '}
        <Badge bg="light" text="dark">
          {investors.length}
        </Badge>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        fullscreen={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className='bg-intro'>
          <Modal.Title className='text-light'>Lista de Inversores</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-intro'>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Monto Invertido</th>
                <th>Rendimiento Generado</th>
              </tr>
            </thead>
            <tbody>
              {investors.length > 0 ? (
                investors.map((investor, index) => (
                  <tr key={investor.user._id}>
                    <td>{index + 1}</td>
                    <td>{investor.user.email}</td>
                    <td>{investor.user.userName}</td>
                    <td>{investor.user.lastName}</td>
                    <td>${investor.mount ? investor.mount.toLocaleString() : 'Monto no disponible'}</td>
                    <td>${investor.yield ? investor.yield.toLocaleString() : 'Ganancia no disponible'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay inversores en este fondo.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};


