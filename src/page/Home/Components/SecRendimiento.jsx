import React, { useState, useEffect, useRef } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Col, Container, Row } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import '../HomeCss/Home.css';
import { LoadPercentage } from '../Helpers/LoadPercentage';

gsap.registerPlugin(ScrollTrigger);


export const SecRendimiento = () => {
  const [activeKey, setActiveKey] = useState(null);
  const accordionRefs = useRef([]);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const [percentage, setPercentage] = useState([]);

  const handleSelect = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  useEffect(() => {
    accordionRefs.current.forEach((ref, index) => {
      ScrollTrigger.create({
        trigger: ref,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.fromTo(
            ref,
            { y: 50, opacity: 0 },
            {
              duration: 1.5,
              y: 0,
              opacity: 1,
              ease: 'power3.out',
            }
          );
        },
        onLeaveBack: () => {
          gsap.to(ref, { opacity: 0, y: 50 });
        }
      });
    });

    ScrollTrigger.create({
      trigger: textRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
        );
      },
      onLeaveBack: () => {
        gsap.to(textRef.current, { opacity: 0, y: 50 });
      }
    });
  }, []);

  useEffect(() => {
    if (activeKey !== null) {
      gsap.to(accordionRefs.current, {
        y: (index) => (index.toString() === activeKey ? 0 : 100),
        opacity: (index) => (index.toString() === activeKey ? 1 : 0),
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(containerRef.current, {
        height: 'auto',
        duration: 0.8,
        ease: 'power3.out',
      });
    } else {
      gsap.to(accordionRefs.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.to(containerRef.current, {
        height: 'auto',
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [activeKey]);

  useEffect(() => {
    LoadPercentage(setPercentage)
  }, []);




  const chartData = percentage.map((item) => ({
    name: new Date(item.endPeriod,).toLocaleDateString(), // Usar la propiedad enddate en lugar de Periodo
    percentage: item.percentage, // Asegúrate de que esta propiedad existe en tu objeto
  }));


  return (
    <Container>
      <div className="custom-container2" ref={containerRef}>
        <h2 ref={textRef} className="d-flex justify-content-center align-items-center text-dark p-3 text-shadow">Rendimientos Pasados</h2>
        <p className="d-flex justify-content-center align-items-center text-dark mb-5">
          Los rendimientos que ves a continuación muestran el desempeño de nuestros
          fondos comunes durante los últimos periodos. Estos resultados son el reflejo de nuestra
          estrategia de inversión y gestión activa, diseñada para maximizar el crecimiento y ofrecer
          valor a nuestros inversionistas.
        </p>
        <Row>
          <Col xs={12} className="custom-margin-top">
            <Accordion
              ref={(el) => (accordionRefs.current[0] = el)}
              activeKey={activeKey}
              onSelect={handleSelect}
              className="mb-3 fund-accordion"
            >
              <Accordion.Item eventKey="0" className='border border-warning bg-light bg-opacity-10 p-2 m-2 rounded'>
                <Accordion.Header className='main-container'>
                  <div className="w-100 d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <span className='text-shadow mb-2 mb-md-0'>Sigue nuestro crecimiento basado en los rendimientos anteriores</span>
                    <h4>
                      <i className="bi bi-bar-chart text-secondary pe-md-5"></i>
                    </h4>
                  </div>
                </Accordion.Header>
                <Accordion.Body>

                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />

                      {/* Tooltip personalizado */}
                      <Tooltip
                        formatter={(value) => `${value}%`}
                        labelFormatter={(label) => `Periodo: ${label}`}
                      />

                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="percentage"
                        stroke="#1E90FF"
                        activeDot={{ r: 9 }}
                        name="Porcentaje de ganancias o rendimiento"
                      />
                    </LineChart>
                  </ResponsiveContainer>

                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default SecRendimiento;




