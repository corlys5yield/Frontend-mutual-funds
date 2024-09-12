import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { starLogin } from "../Helpers/StarLogin";

export const FormLogin = () => {
  // State para usuario y email del usuario
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Controla los cambios en los campos del formulario
  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Captura lo que envía el formulario y verifica los campos
  const onSubmit = (e) => {
    e.preventDefault();
    if (user.email.trim() === "" || user.password.trim() === "") {
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
      // Llama al método starLogin
      starLogin(user.email, user.password, navigate);
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-center">
          <Form className="rounded m-3" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="text-white"></Form.Label>
              <Form.Control
                type="email"
                placeholder="Correo Electrónico"
                name="email"
                value={user.email}
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label className="text-white"></Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={onInputChange}
              />
              <div className="pt-3">
                <p className="text-white">
                  Si olvidaste tu contraseña, comunícate con soporte al correo{" "}
                  <a
                    href="mailto:soporte@tuempresa.com?subject=Olvidé%20la%20contraseña"
                    className="text-warning"
                  >
                    soporte@5yield.com
                  </a>{" "}
                  con el asunto <strong>• Olvidé la contraseña</strong>.
                </p>
              </div>
            </Form.Group>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-outline-warning m-2 rounded-pill mt-3"
              >
                Iniciar sesión
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
