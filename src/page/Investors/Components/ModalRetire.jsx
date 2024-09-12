import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";

export const ModalRetire = ({ show, handleClose, handleSubmit }) => {
  const [transaction, setTransaction] = useState({
    binanceAlias: '',
    amount: '',
    orderId: '7777777',
    transactionType: 'withdrawal'
  });
  const [modalStep, setModalStep] = useState(1); // 1: Instrucciones, 2: Formulario

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    setModalStep(2);
  };

  const handlePreviousStep = () => {
    setModalStep(1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      transaction.binanceAlias.trim() === "" ||
      transaction.amount.trim() === "" ||
      transaction.orderId.trim() === "" ||
      !['deposit', 'withdrawal'].includes(transaction.transactionType)
    ) {
      return Swal.fire({
        title: "ERROR",
        text: "Todos los campos son obligatorios y deben estar correctamente llenos.",
        icon: "error",
        background: "#f9f9f9",
        confirmButtonColor: "#ffc107",
        customClass: {
          title: "swal2-title-custom",
          content: "swal2-content-custom",
          confirmButton: "swal2-confirm-custom",
        },
      });
    }

    Swal.fire({
      title: '¿Estás seguro de tu solicitud con estos datos?',
      html: 'Alias: ' + transaction.binanceAlias + '<br/>Monto a retirar: $' + transaction.amount + '<br/>Tipo de transacción: Retiro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(transaction);
        handleClose(); // Cierra el modal después de enviar

      }
    });


  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="shadow-lg welcome-text text-shadow text-light"
    >
      <Modal.Header closeButton className="bg-dark border-warning">
        <Modal.Title>{modalStep === 1 ? 'Instrucciones' : 'Realizar Transacción'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        {modalStep === 1 ? (
          <div>
            <h4>Reglas sobre el Retiro de la Inversión y los Fondos</h4>

            <p>
              Antes de proceder, es fundamental que comprendas las reglas y limitaciones relacionadas con el retiro de tu inversión en el fondo común.
            </p>

            <ol>
              <li>
                <strong>Unica Solicitud de Retiro:</strong><br />
                Solo podrás efectuar una única solicitud de retiro en el fondo común, puede realizarla antes o después de la finalización del período del fondo, sin envargo le recomendamos que sea una vez el fondo comun haya concluido, de esta manera podra solicitar el retiro de sus fondos totales es decir lo invertido y el rendimiento o ganancias generadas.
              </li>
              <br />
              <li>
                <strong>Retiro Antes de la Finalización:</strong><br />
                Si decides solicitar el retiro antes de que finalice el período del fondo común, es decir previo a la fecha de finalizacion, solo se reintegrará la cantidad invertida. Cualquier ganancia obtenida se perderá.
              </li>
              <br />
              <li>
                <strong>Errores en la Cantidad:</strong><br />
                Asegúrate de no cometer errores en las cantidades al solicitar el retiro. La plataforma no se hará responsable de tales errores, lo que puede ocasionar que la solicitud sea rechazada.
              </li>
              <br />
              <li>
                <strong>Tiempo de Procesamiento:</strong><br />
                La verificación de datos y la aceptación de tu solicitud de retiro pueden tardar hasta <strong>24 horas</strong>.
              </li>
              <br />
              <li>
                <strong>Soporte:</strong><br />
                Si encuentras algún inconveniente con tu solicitud de retiro, no dudes en contactarte con nuestro equipo de soporte vía email. Envíanos un correo a [email@example.com] con el asunto "Problemas con la Solicitud de Retiro" para que podamos asistirte.
              </li>
            </ol>

            <Button className="m-2 rounded-pill" variant="outline-warning" onClick={handleNextStep}>Continuar</Button>
          </div>
        ) : (
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBinanceAlias">
              <Form.Label> Alias de Binance a donde se realizara la transferencia de sus fondos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alias de Binance"
                name="binanceAlias"
                value={transaction.binanceAlias}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Monto"
                name="amount"
                value={transaction.amount}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTransactionType" className="mt-3">
              <Form.Label>Tipo de Transacción</Form.Label>
              <Form.Control
                as="select"
                name="transactionType"
                value={transaction.transactionType}
                onChange={handleInputChange}
              >
                <option value="withdrawal">Retiro</option>

              </Form.Control>
            </Form.Group>
            <Button className="m-2 rounded-pill mt-4" variant="outline-warning" type="submit" >
              Confirmar
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark justify-content-center border-0">
        {modalStep === 1 ? (
          <p></p>
        ) : (
          <>
            <Button className="m-2 rounded-pill" variant="outline-light" onClick={handlePreviousStep}>
              Volver
            </Button>

          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};