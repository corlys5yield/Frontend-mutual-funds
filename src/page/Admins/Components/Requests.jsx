import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { aprovedTransaction } from '../Helpers/AproveTransact';
import { rejectedTransaction } from '../Helpers/RejectedTransact';
import { addInvestorToFund } from '../Helpers/AddInvestor';
import { retireInvestorToFund } from '../Helpers/retireInvestor';

export const RequestButton = ({ transactions = [], navigate,setNewFund ,setNewTrans }) => {
  const [show, setShow] = useState(false);
  const [localTransactions, setLocalTransactions] = useState(transactions); // Estado local para las transacciones

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Filtrar transacciones pendientes
  const pendingTransactions = localTransactions.filter(transaction => transaction.status === 'pending');

  // Función para manejar la aprobación o rechazo
  const handleTransactionAction = (transaction, actionType) => {
    // Verificar el tipo de transacción
    if (transaction.type === 'deposit') {
      if (actionType === 'approve') {
        // Llamada al backend para aprobar la transacción de depósito
        aprovedTransaction(setNewTrans, transaction._id);
        // Añadir al inversor al fondo
        addInvestorToFund(transaction.mutualFundId, transaction.user, transaction.amount, navigate);
        // Actualizar el estado del fondo
        setNewFund(true);
      } else if (actionType === 'reject') {
        // Llamada al backend para rechazar la transacción de depósito
        rejectedTransaction(setNewTrans, transaction._id);
      }
    } else if (transaction.type === 'withdrawal') {
      if (actionType === 'approve') {
        // Llamada al backend para aprobar la transacción de retiro
        aprovedTransaction(setNewTrans, transaction._id);
        //metodo para restr del fondo
        retireInvestorToFund(transaction.mutualFundId, transaction.user, transaction.amount, navigate);

        setNewFund(true);
        
      } else if (actionType === 'reject') {
        // Llamada al backend para rechazar la transacción de retiro
        rejectedTransaction(setNewTrans, transaction._id);
      }
    }
  
    // Actualizar el estado eliminando la transacción de la lista de pendientes
    setLocalTransactions(prevTransactions =>
      prevTransactions.map(t =>
        t._id === transaction._id ? { ...t, status: actionType === 'approve' ? 'approved' : 'rejected' } : t
      )
    );
  };

  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  return (
    <>
      <Button className="m-2 rounded-pill" variant="outline-light" onClick={handleShow} >
        Transacciones Pendientes{' '}
        <Badge  bg="light" text="dark">
          {pendingTransactions.length}
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
          <Modal.Title className='text-light'>Transacciones Pendientes</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-intro'>
        <Table striped bordered hover variant="dark">
    <thead>
        <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Email</th>
            <th>Alias de Binance</th> {/* Nueva columna para el alias de Binance */}
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        {pendingTransactions.length > 0 ? (
            pendingTransactions.map((transaction, index) => (
                <tr key={transaction._id}>
                    <td>{index + 1}</td>
                    <td>{transaction.date ? new Date(transaction.date).toLocaleDateString() : 'Fecha no disponible'}</td>
                    <td>{transaction.user.email}</td>
                    <td>{transaction.aliasBn}</td> {/* Mostrar el alias de Binance */}
                    <td>{transaction.user.userName}</td>
                    <td>
                        {transaction.type === 'deposit' ? 'Depósito' : 
                        transaction.type === 'withdrawal' ? 'Retiro' : 
                        transaction.type}
                    </td>
                    <td>${transaction.amount ? transaction.amount.toLocaleString() : 'Monto no disponible'}</td>
                    <td>
                        {transaction.status === 'pending' ? 'Pendiente' : 
                        transaction.status === 'approved' ? 'Aprobado' : 
                        transaction.status === 'rejected' ? 'Rechazado' : 
                        transaction.status}
                    </td>
                    <td>
                        <Button 
                            variant="success" 
                            onClick={() => handleTransactionAction(transaction, 'approve')} 
                            disabled={transaction.status !== 'pending'}
                        >
                            Aprobar
                        </Button>{' '}
                        <Button 
                            variant="danger" 
                            onClick={() => handleTransactionAction(transaction, 'reject')} 
                            disabled={transaction.status !== 'pending'}
                        >
                            Rechazar
                        </Button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="9">No hay transacciones pendientes.</td>
            </tr>
        )}
    </tbody>
</Table>
        </Modal.Body>
      </Modal>
    </>
  );
};
