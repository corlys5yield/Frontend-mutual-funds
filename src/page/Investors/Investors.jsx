import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export const Investors = () => {

  const navigate = useNavigate();


  const ir_LogOut = () => {
    localStorage.removeItem('token');
    //userName = null;
    navigate('/*')
  }

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 flex-column bg-intro'>
        <Card className="text-center bg-dark text-light">
      <Card.Header> 
        <h1>
        Panel de Inversores
        </h1></Card.Header>
        <hr></hr>
      <Card.Body>
        <Card.Title>dedicadoa sus tareas</Card.Title>
        <Card.Text>
          aqui los inversores podran ver la informacion de los fondos a los que 
          estan subscriptos como asi tambien rendimiento de ssu invercion indibidual , 
          como asi tambien solisitar transacciones es decir depositar o retirar
        </Card.Text>
        <Button variant="primary" onClick={ir_LogOut}>Volver o Salir</Button>
      </Card.Body>
      <hr></hr>
      <Card.Footer className="">2 days ago</Card.Footer>
    </Card>
        </div>
  )
}
