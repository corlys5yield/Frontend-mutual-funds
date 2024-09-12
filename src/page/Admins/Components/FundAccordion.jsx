import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { TableInvestors } from './TableInvestors';
import { LoadTransactionsFund } from '../Helpers/LoadTransactionsFund';
import { RequestButton } from '../Components/Requests';
import { addBetResult } from '../Helpers/AddBetResult';
import { finalizedFund } from '../Helpers/FinalizedFund';

export const FundAccordion = ({ fund, setNewFund, navigate, activeAccordion, setActiveAccordion, index }) => {
  const [show, setShow] = useState(false);
  const [transactions, setTransactions] = useState([]); // Estado para almacenar las transacciones

  const [newTrans, setNewTrans] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State para manejar los campos del formulario
  const [result, setResult] = useState({
    amount: '',
    earnings: '',
  });

  // Manejar cambios en los campos del formulario
  const onInputChange = (e) => {
    setResult({
      ...result,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();
    const { amount, earnings } = result;

    // Validación simple
    if (amount.trim() === "" || earnings.trim() === "") {
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


      addBetResult(fund._id, result.amount, result.earnings, navigate)
      //starLogin(user.email, user.password, navigate); //llama al metodo starLogin del helper
      setNewFund(true)
      setNewTrans(true);
      handleClose(); // Cerrar el modal

    }
  };

  // Advertencia de SweetAlert2 para finalizar el período
  const onFinalizePeriod = () => {
    Swal.fire({
      title: '¿Estás seguro de finalizar el periodo de este fondo común?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama a la función para finalizar el período en el backend
        finalizedFund(fund._id); // No necesitas manejar la promesa
        setNewFund(true); // Actualiza el estado según tus necesidades
      }
    });
  };



  // Función para determinar la clase del acordeón según el estado
  const getAccordionClass = (status) => {
    switch (status) {
      case 'current':
        return 'border border-warning bg-warning bg-opacity-10 p-2 m-2 rounded';
      case 'finalized':
        return 'border border-success bg-success bg-opacity-10 p-2 m-2 rounded';
      default:
        return '';
    }
  };


  // Transformar betHistory para el gráfico
  const chartData = fund.betHistory.map((bet) => ({
    date: new Date(bet.date).toLocaleDateString(), // o "bet.date" si prefieres el formato original
    earnings: bet.earnings,
  }));

  // Verificar si hay datos en betHistory
  if (fund.betHistory.length > 0) {
    // Obtener la fecha del primer registro en betHistory
    const firstDate = new Date(fund.betHistory[0].date);

    // Crear un punto inicial con earnings en 0, usando una fecha anterior a la primera fecha
    const initialDataPoint = {
      date: firstDate.toLocaleDateString(),
      earnings: 0
    };

    // Insertar el punto inicial al inicio del array chartData
    chartData.unshift(initialDataPoint);
  }

  // Cargar las transacciones cuando se monta el componente
  useEffect(() => {



    if (newTrans) {
      LoadTransactionsFund(setTransactions, fund._id, navigate);

      setNewTrans(false);
    } else {
      LoadTransactionsFund(setTransactions, fund._id, navigate);
    }

  }, [fund.investors, newTrans]);


  return (
    <Accordion activeKey={activeAccordion} onSelect={() => setActiveAccordion(activeAccordion === index ? null : index)} className="mb-3 fund-accordion">
      <Accordion.Item eventKey={index} className={getAccordionClass(fund.status)}>
        <Accordion.Header>
          <div style={{ width: '100%' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Periodo: {fund.name}</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px'
              }}>
              <div>
                <strong>Estado:</strong> {fund.status === 'current' ? 'Activo' : 'Finalizado'}
              </div>
              <div>
                <strong>Fecha de Finalización:</strong> {new Date(fund.endDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Máximo de Inversores:</strong> {fund.maxInvestors}
              </div>
              <div>
                <strong>Mínimo de Inversión:</strong> ${fund.minInvestmentAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </Accordion.Header>

        <Accordion.Body>
          <div className="d-flex flex-column flex-sm-row justify-content-center mb-3">
            <Button className="m-2 rounded-pill" variant="outline-light" onClick={handleShow}>
              Cargar Resultados
            </Button>

            {transactions.length > 0 ? (
              <RequestButton
                transactions={transactions.filter(transaction => transaction.mutualFundId === fund._id)}
                navigate={navigate}
                setNewFund={setNewFund}
                setNewTrans={setNewTrans}
              />
            ) : (
              <Button className="m-2 rounded-pill" variant="outline-light">
              No hay transacciones disponibles para este fondo.
            </Button>
              
            )}

            {fund.investors && fund.investors.length > 0 ? (
              <TableInvestors fund={fund} />
            ) : (
              <Button className="m-2 rounded-pill" variant="outline-light">
                No hay inversores disponibles para este fondo.
              </Button>
            )}

            {/* Solo mostrar este botón si el fondo no está finalizado */}
            {fund.status !== 'finalized' && (
              <Button className="m-2 rounded-pill" variant="outline-danger" onClick={onFinalizePeriod}>
                Finalizar Periodo
              </Button>
            )}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="1" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'dataMax + 10']} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#1E90FF"
                activeDot={{ r: 8 }}
                name="Ganancias" // Cambia el nombre en la leyenda y tooltip
              />
            </LineChart>
          </ResponsiveContainer>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <p className="text-light"><strong>Monto Invertido:</strong> ${fund.totalInvestmentAmount.toLocaleString()}</p>
            <p className="text-light"><strong>Ganancias Totales:</strong> ${fund.totalEarnings.toLocaleString()}</p>
            <p className="text-light"><strong>porcentaje de ganancia del fondo</strong> %{fund.returnPercentage.toLocaleString()}</p>
          </div>



          <Modal show={show}
            onHide={handleClose}
            centered
            className="shadow-lg welcome-text text-shadow text-light">

            <Modal.Header closeButton className="bg-dark border-warning">
              <Modal.Title  >Cargar resultados del día</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formMonto" className="mt-3">
                  <Form.Label>Monto Apostado</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Monto apostado"
                    name="amount"
                    value={result.amount}
                    onChange={onInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formGanancia" className="mt-3">
                  <Form.Label>Ganancia/Rendimiento</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ganancia o rendimiento"
                    name="earnings"
                    value={result.earnings}
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="bg-dark justify-content-center border-0">
              <Button className="m-2 rounded-pill" variant="outline-light" onClick={handleClose}>
                Cancelar
              </Button>
              <Button className="m-2 rounded-pill" variant="outline-warning" onClick={onSubmit}>
                Guardar Resultados
              </Button>
            </Modal.Footer>
          </Modal>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

