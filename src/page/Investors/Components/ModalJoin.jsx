import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";

export const ModalJoin = ({ show, handleClose, handleSubmit }) => {
  const [transaction, setTransaction] = useState({
    binanceAlias: '',
    amount: '',
    orderId: '',
    transactionType: 'deposit'
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
      html: 'Alias: ' + transaction.binanceAlias + '<br/>Monto : $' + transaction.amount + '<br/>Tipo de transacción: Deposito' + '<br/>Numero de orden : ' + transaction.orderId,
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
            <h4>Instrucciones para Participar en el Fondo Común</h4>

            <p>
              Antes de proceder con tu solicitud para unirte a nuestro fondo común, es importante que lea cuidadosamente las siguientes instrucciones:
            </p>

            <ol>
              <li>
                <strong>Operación en Dólares y Binance:</strong><br />
                El fondo común opera exclusivamente en dólares estadounidenses (USD).<br />
                Todas las transacciones se realizan a través de Binance utilizando la criptomoneda <strong>USDT</strong>.
              </li>
              <br />
              <li>
                <strong className='text-shadow text-warning'>Realización de la Inversión:</strong><br />
                Deberás realizar la transferencia de USDT al alias o ID que te proporcionaremos a continuación:

                <div className='text-shadow text-warning'>
                  [ID-AliasBinance].<br />
                </div>


                <br />
                Una vez completada la transacción, necesitarás algunos datos específicos de la misma para llenar el formulario de solicitud de ingreso.
              </li>
              <br />

              <li>
                <strong>Verificación y Confirmación:</strong><br />
                Usaremos los datos que proporciones para verificar que la transacción se haya efectuado correctamente.<br />
                <br />
                <strong>IMPORTANTE:</strong> Solo haz clic en "Continuar" para proceder con el formulario una vez que hayas completado la transacción.
              </li>
              <br />
              <li>
                <strong>Reglas y Limitaciones:</strong><br />
                - Solo puedes participar una vez en un fondo común.<br />
                - La verificación de datos y la aceptación de tu participación pueden tardar hasta <strong>24 horas</strong>.<br />
                - Si solicitas el retiro antes de que finalice el período del fondo común, solo se reintegrará la cantidad invertida. Cualquier ganancia obtenida se perderá.<br />
                - Solo podrás efectuar una única solicitud de retiro en el fondo común, ya sea antes o después de la finalización del período del fondo.<br />
                <br />
                <strong>NOTA IMPORTANTE:</strong> Asegúrate de no cometer errores en las cantidades de las solicitudes tanto de ingreso como retiro, esto puede ocasionar que la solicitud sea rechazada, y la plataforma no se hará responsable de tales errores.
              </li>
              <br />
              <li>
                <strong>Soporte:</strong><br />
                Si encuentras algún inconveniente con tu solicitud de ingreso, no dudes en contactarte con nuestro equipo de soporte vía email. Envíanos un correo a [email@example.com] con el asunto "Problemas con la Solicitud de Ingreso" para que podamos asistirte.
              </li>
            </ol>

            <Button className="m-2 rounded-pill" variant="outline-warning" onClick={handleNextStep}>Continuar</Button>
          </div>
        ) : (
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBinanceAlias">
              <Form.Label> Alias de Binance de donde se realizo la transferencia</Form.Label>
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
            <Form.Group controlId="formOrderId">
              <Form.Label>ID de Orden de la transaccion realizada</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID de Orden"
                name="orderId"
                value={transaction.orderId}
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
                <option value="deposit">Depósito</option>

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
