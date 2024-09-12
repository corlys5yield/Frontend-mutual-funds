import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner'; // Importar el spinner
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Pagination, Row } from 'react-bootstrap';
import { NavbarUser } from './Components/NavbarUsers';
import { LoadFundsUs } from './Helpers/LoadFundsUs';
import { FundAccordionUs } from './Components/FundAccordionUs';
import { gsap } from 'gsap';




export const Investors = () => {

  const location = useLocation();
  const { email, id } = location.state || {};

  const [mutualfunds, setMutualfunds] = useState([]);
  const [newFund, setNewFund] = useState(false);
  const [numPage, setNumPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null); // Estado para controlar el acordeón activo
  const fundsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const loadAndSetFunds = async () => {
      setLoading(true);
      await LoadFundsUs(setMutualfunds,id, navigate);
      setLoading(false);
      setNewFund(false);
    };

    loadAndSetFunds();
  }, [newFund]);

  const sortedFunds = [...mutualfunds].reverse();

  const startIndex = (numPage - 1) * fundsPerPage;
  const endIndex = startIndex + fundsPerPage;
  const fundsToDisplay = sortedFunds.slice(startIndex, endIndex);
  const numPages = Math.ceil(mutualfunds.length / fundsPerPage);

  const cambiarPagina = (pageNumber) => {
    setLoading(true);

    setTimeout(() => {
      setNewFund(true);
      setNumPage(pageNumber);

      setLoading(false);
    }, 1000);
  };

  const Paginacion = () => {
    return (
      <Pagination className="d-flex justify-content-center mt-3 custom-pagination pb-5" border="light">
        {Array.from({ length: numPages }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === numPage}
            onClick={() => cambiarPagina(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  useEffect(() => {
    if (!loading && fundsToDisplay.length > 0) {
      gsap.fromTo(
        '.fund-accordion',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
      );
    }
  }, [loading, fundsToDisplay]);

  return (
    <div className="justify-content-center align-items-center bg-intro">
      <NavbarUser email={email} id={id} navigate={navigate} />
      <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
        <Container>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
              <Spinner animation="grow" variant="warning" />
            </div>
          ) : mutualfunds.length > 0 ? (
            <div>
              <Row>
                {fundsToDisplay.map((fund, index) => (
                  <FundAccordionUs
                    key={index}
                    fund={fund}
                    id={id}
                    navigate={navigate}
                    activeAccordion={activeAccordion} // Pasar el acordeón activo actual
                    setActiveAccordion={setActiveAccordion} // Pasar el setter del acordeón activo
                    index={index} // Pasar el índice de este acordeón
                  />
                ))}
              </Row>
              <Paginacion />
            </div>
          ) : (
            <Alert variant="danger">No hay fondos disponibles.</Alert>
          )}
        </Container>
      </div>
    </div>
  );
}
