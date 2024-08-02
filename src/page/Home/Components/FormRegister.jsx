import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//import Logo from '../../../assets/Logos/LOGO1.png';
// importando react-bootstrap
import Form from "react-bootstrap/Form";
import { starRegister } from "../Helpers/StarRegister";
//import { starLogin } from "../Helpers/StartLogin";

export const FormRegister = () => {

     //state para usuario e email del usuario
  const [user, setUser] = useState({
    userName: "",
    aliasBN:"",
    password: "",
    

  });

    const navigate = useNavigate();


  //controla los cambios que se hagan en los campos del formulario
  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //captura lo el formulario y verifica los campos lanzando una alerta con swal
  const onSubmit = (e) => {
    e.preventDefault();
    if (user.userName.trim() === "" || user.aliasBN.trim() === "" || user.password.trim() === "") {

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
        /*
        Swal.fire({
            title: "Registrado",
            text: user.email +" "+ user.password ,
            icon: "success",
            background: "#f9f9f9",
            confirmButtonColor: "#ffc107",
            customClass: {
              title: "swal2-title-custom",
              content: "swal2-content-custom",
              confirmButton: "swal2-confirm-custom",
            },
          });
        */

        

      console.log("listo para guardar")
      starRegister(user.userName, user.aliasBN, user.password, navigate); //llama al metodo starLogin del helper
    }
  };

  return (
    <div>
<div className="d-flex align-items-center justify-content-center">
          
          <Form className="  rounded  m-3 " onSubmit={onSubmit}>
            
        {/*<img className="logo" style={{ width: '300px' }} src={Logo} alt="Logo" />{' '}*/}
          
            <Form.Group className="mb-3" controlId="formGroupEmail">
              
              <Form.Label className="text-white" ></Form.Label>
              <Form.Control  type="text" placeholder="Nombre de usuario"  name="userName" value={user.userName}
              onChange={onInputChange} />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formGroupEmail">
              
              <Form.Label className="text-white" ></Form.Label>
              <Form.Control  type="text" placeholder="Coloque su alia de Binance"  name="aliasBN" value={user.aliasBN}
              onChange={onInputChange} />
            </Form.Group>

    
            <Form.Group className="mb-3" controlId="formGroupPassword">
              
              <Form.Label   className="text-white"></Form.Label>
              <Form.Control  type="password" placeholder="Password" name="password" value={user.password} 
              onChange={onInputChange}/>
             
            </Form.Group>
    
            <div className="text-center">
              <button type="submit" className="btn btn-outline-warning m-2 rounded-pill mt-3">
                Registrarse
              </button >
              
            </div> 
    
            <div className="text-center">
                
              <div>
                
            </div>
            </div> 
    
          </Form>
          
            
        </div>

    </div>
  )
}
