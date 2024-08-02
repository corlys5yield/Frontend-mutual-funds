import React, { useState, useEffect, useRef } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Col, Container, Row } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import '../HomeCss/Home.css';

gsap.registerPlugin(ScrollTrigger);

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const SecRendimiento = () => {
  const [activeKey, setActiveKey] = useState(null);
  const accordionRefs = useRef([]);
  const containerRef = useRef(null);
  const textRef = useRef(null);

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
        <Col xs={12} md={activeKey === '0' ? 12 : 4} className="mb-5 custom-margin-top">
          <Accordion
            ref={(el) => (accordionRefs.current[0] = el)}
            activeKey={activeKey}
            onSelect={handleSelect}
            className="accordion-item shadow-lg "
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header className='main-container '>
                <div className="w-100 d-flex justify-content-between align-items-center ">
                  <span className='text-shadow'>Accordion Item #1</span>
                  <h4><i className="bi bi-bar-chart pe-5 text-secondary"> </i></h4>
                </div>
              </Accordion.Header>
              <Accordion.Body className='bg-dark'>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs={12} md={activeKey === '1' ? 12 : 4} className="mb-5 custom-margin-top">
          <Accordion
            ref={(el) => (accordionRefs.current[1] = el)}
            activeKey={activeKey}
            onSelect={handleSelect}
            className="accordion-item shadow-lg"
          >
            <Accordion.Item eventKey="1">
              <Accordion.Header className='main-container'>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <span className='text-shadow'>Accordion Item #2</span>
                  <h4><i className="bi bi-graph-up-arrow pe-5 text-secondary text-warning"></i></h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs={12} md={activeKey === '2' ? 12 : 4} className="mb-5 custom-margin-top">
          <Accordion
            ref={(el) => (accordionRefs.current[2] = el)}
            activeKey={activeKey}
            onSelect={handleSelect}
            className="accordion-item shadow-lg"
          >
            <Accordion.Item eventKey="2">
              <Accordion.Header className='main-container'>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <span className='text-shadow'>Accordion Item #3</span>
                  <h4><i className="bi bi-bar-chart-fill pe-5"> </i></h4>
                </div>
              </Accordion.Header>
              <Accordion.Body className='fondo'>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs={12} className="custom-margin-top">
          <Accordion
            ref={(el) => (accordionRefs.current[3] = el)}
            activeKey={activeKey}
            onSelect={handleSelect}
            className="accordion-item shadow-lg"
          >
            <Accordion.Item eventKey="3">
              <Accordion.Header className='main-container'>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <span className='text-shadow'>Accordion Item #4</span>
                  <h4><i class="bi bi-graph-down"></i></h4>
                </div>
              </Accordion.Header>
              <Accordion.Body className='fondo'>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Mike" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
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





