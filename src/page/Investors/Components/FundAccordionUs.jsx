import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from 'react-bootstrap/Button';
import { createTransaction } from '../Helpers/CreateTrasactions';
import { ModalJoin } from './ModalJoin';
import { ModalRetire } from './ModalRetire';

export const FundAccordionUs = ({ fund, id, navigate, activeAccordion, setActiveAccordion, index  }) => {

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);



  const handleCloseJoinModal = () => setShowJoinModal(false);
  const handleShowJoinModal = () => setShowJoinModal(true);

  const handleCloseWithdrawModal = () => setShowWithdrawModal(false);
  const handleShowWithdrawModal = () => setShowWithdrawModal(true);

  const handleJoinSubmit = async (transaction) => {
    // Aquí puedes hacer el manejo de la transacción de unirse (similarly as `handleSubmit` in the previous example)
    // Llama a createTransaction o cualquier otra lógica de negocio necesaria
    await createTransaction(
      id,
      transaction.transactionType,
      transaction.amount,
      transaction.binanceAlias,
      transaction.orderId,
      fund._id,
      navigate
    );
    
    

    handleCloseJoinModal();
  };

  const handleRetireSubmit = async (transaction) => {
    // Aquí puedes hacer el manejo de la transacción de unirse (similarly as `handleSubmit` in the previous example)
    // Llama a createTransaction o cualquier otra lógica de negocio necesaria
    await createTransaction(
      id,
      transaction.transactionType,
      transaction.amount,
      transaction.binanceAlias,
      transaction.orderId,
      fund._id,
      navigate
    );
    
    

    handleCloseWithdrawModal();
  };





 

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

  const isInvestor = fund.investors.some(investor => investor.user._id === id);

  const chartData = fund.betHistory.map((bet) => ({
    date: new Date(bet.date).toLocaleDateString(),
    earnings: bet.earnings,
  }));

  if (fund.betHistory.length > 0) {
    const firstDate = new Date(fund.betHistory[0].date);
    const initialDataPoint = {
      date: firstDate.toLocaleDateString(),
      earnings: 0
    };
    chartData.unshift(initialDataPoint);
  }

    // Obtener los datos del inversor actual
    const currentInvestor = fund.investors.find(investor => investor.user._id === id);
    const investorInvestment = currentInvestor ? currentInvestor.mount : 0;
    const investorEarnings = currentInvestor ? currentInvestor.yield : 0

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
              <div><strong>Estado:</strong> {fund.status === 'current' ? 'Activo' : 'Finalizado'}</div>
              <div><strong>Fecha de Finalización:</strong> {new Date(fund.endDate).toLocaleDateString()}</div>
              <div><strong>Máximo de Inversores:</strong> {fund.maxInvestors}</div>
              <div><strong>Mínimo de Inversión:</strong> ${fund.minInvestmentAmount.toLocaleString()}</div>
            </div>
          </div>
        </Accordion.Header>

        <Accordion.Body>
          <div className="d-flex flex-column flex-sm-row justify-content-center mb-3">
           


            <Button
              className="m-2 rounded-pill"
              variant={isInvestor && fund.status === 'finalized' ? 'outline-success' : isInvestor ? 'outline-danger' : 'outline-light'}
              onClick={isInvestor ? handleShowWithdrawModal : handleShowJoinModal}
            >
              {isInvestor && fund.status === 'finalized' ? 'Retirar' : isInvestor ? 'Retiro' : 'Invertir'}
            </Button>

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
                name="Gnancias o crecimiento del fondo"
              />
            </LineChart>
          </ResponsiveContainer>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <p className="text-light"><strong>Monto Invertido:</strong> ${investorInvestment.toLocaleString()}</p>
          <p className="text-light"><strong>Ganancias Totales:</strong> ${investorEarnings.toLocaleString()}</p>
            <p className="text-light"><strong>Porcentaje de ganancia del fondo:</strong> %{fund.returnPercentage.toLocaleString()}</p>
          </div>

  {/* Modal Unirse */}
  <ModalJoin
        show={showJoinModal}
        handleClose={handleCloseJoinModal}
        handleSubmit={handleJoinSubmit}
      />

       {/* Modal Retiro */}
  <ModalRetire
        show={showWithdrawModal}
        handleClose={handleCloseWithdrawModal}
        handleSubmit={handleRetireSubmit}
      />




        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};


