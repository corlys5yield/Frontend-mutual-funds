import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { LoadTransactionsByUs } from '../Helpers/LoadTransByUser';

export const HistoryTransUserModal = ({ show, setShow, id, navigate }) => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () => setShow(false);

    useEffect(() => {
        LoadTransactionsByUs(setTransactions, id, navigate); // Cargar transacciones
    }, [navigate, id]);

    // Filtrar transacciones en base a los términos de búsqueda
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para traducir el tipo de transacción
    const translateType = (type) => {
        switch (type) {
            case 'deposit':
                return 'Depósito';
            case 'withdrawal':
                return 'Retiro';
            default:
                return type;
        }
    };

    // Función para traducir el estado de la transacción
    const translateStatus = (status) => {
        switch (status) {
            case 'approved':
                return 'Aprobada';
            case 'rejected':
                return 'Rechazada';
            case 'pending':
                return 'Pendiente';
            default:
                return status;
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} fullscreen={true} centered>
                <Modal.Header closeButton className='bg-intro d-flex justify-content-center'>
                    <Modal.Title className='text-light'>Historial de Transacciones</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-intro'>
                    <Form.Group className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                            <Form.Control
                                type="text"
                                placeholder="Buscar por tipo o estado..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th> {/* Fecha primero */}
                                <th>Email del Usuario</th> {/* Email del usuario */}
                                <th>Alias de Binance</th> {/* Alias de Binance */}
                                <th>Estado</th> {/* Estado */}
                                <th>Tipo</th> {/* Tipo */}
                                <th>Monto</th> {/* Monto */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction, index) => (
                                    <tr key={transaction._id}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td>{transaction.user.email}</td> {/* Mostrar el email del usuario */}
                                        <td>{transaction.aliasBn}</td> {/* Mostrar el alias de Binance */}
                                        <td>{translateStatus(transaction.status)}</td> {/* Estado */}
                                        <td>{translateType(transaction.type)}</td> {/* Tipo */}

                                        {/* Monto con color condicional */}
                                        <td
                                            className={
                                                transaction.type === 'deposit'
                                                    ? 'text-warning'  // Depósitos: texto amarillo
                                                    : transaction.type === 'withdrawal' && transaction.status === 'approved'
                                                        ? 'text-success'  // Retiros aprobados: texto verde
                                                        : ''  // Otros casos: sin color especial
                                            }
                                        >
                                            {transaction.amount}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No hay transacciones registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
};
