import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
//import Logo from '../../../assets/Logos/LOGO1.png';
// importando react-bootstrap
import Form from "react-bootstrap/Form";
//import { starLogin } from "../Helpers/StartLogin";

export const ForularioLogin = () => {
  //state para usuario e email del usuario
  const [user, setUser] = useState({
    email: "",
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
    if (user.email.trim() === "" || user.password.trim() === "") {
      swal("ERROR", "todos los campos son obligatorios", "error");
      
    } else {
      //swal("FUNCIONA", user.email +" "+ user.password, "success");
      console.log("listo para loguear")
      //starLogin(user.email, user.password, navigate); //llama al metodo starLogin del helper
    }
  };

  return (
    <div>
        
    <div className="d-flex align-items-center justify-content-center customHeigth ">
      
      <Form className=" p-5 p-sm-4 borde-card rounded  m-3 " onSubmit={onSubmit}>
        <h1 className="text-white">LOGO O NOMBRE</h1>

    {/*<img className="logo" style={{ width: '300px' }} src={Logo} alt="Logo" />{' '}*/}
      
        <Form.Group className="mb-3" controlId="formGroupEmail">
          
          <Form.Label className="text-white" ></Form.Label>
          <Form.Control className="custom-input" type="text" placeholder="User Name"  name="email" value={user.email}
          onChange={onInputChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          
          <Form.Label   className="text-white"></Form.Label>
          <Form.Control className="custom-input" type="password" placeholder="Password" name="password" value={user.password} 
          onChange={onInputChange}/>
          <div className="pt-3">

          <a href="#" className="text-white">
            ¿Olvidaste tu contraseña? Clic aquí
          </a>
          </div>
        </Form.Group>

        <div className="text-center">
          <button type="submit" className="btn btn-outline-light mt-3">
            Ingresar
          </button >
          
          <div>
            
        </div>
        </div> 

        <div className="text-center">
          <button type="submit" className="btn btn-outline-light mt-3">
            Registrate aqui
          </button >
          
          <div>
            
        </div>
        </div> 

      </Form>
      
        
    </div>
    
    </div>
    
  );
};