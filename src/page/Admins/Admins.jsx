import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Admins = () => {
  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 flex-column bg-intro '>

<Card className="text-center bg-dark text-light">
      <Card.Header> 
        <h1>
        Panel de Administrador
        </h1></Card.Header>
        <hr></hr>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      <hr></hr>
      <Card.Footer className="">2 days ago</Card.Footer>
    </Card>

       
        </div>
  )
}
