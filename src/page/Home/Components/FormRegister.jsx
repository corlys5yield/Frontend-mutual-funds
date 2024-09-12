import React, { useState } from "react";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { starRegister } from "../Helpers/StarRegister";
import Captcha from "./Captcha";

export const FormRegister = ({ handleCloseModalR }) => {
  // Estado para el formulario
  const [user, setUser] = useState({
    userName: "",
    email: "",
    confirmEmail: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  // Estado para el modal y aceptación de términos
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);


  // Manejo de cambios en el formulario
  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Calcula la edad del usuario
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  // Mostrar el modal
  const handleShowTermsModal = () => setShowTermsModal(true);
  const handleCloseTermsModal = () => setShowTermsModal(false);

  // Aceptar términos y condiciones
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    handleCloseTermsModal();
    // Aquí llamas al método starRegister después de aceptar términos
    starRegister(user.email, user.userName, user.lastName, user.password);
    handleCloseModalR();
  };

  // Enviar formulario
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      user.userName.trim() === "" ||
      user.email.trim() === "" ||
      user.confirmEmail.trim() === "" ||
      user.lastName.trim() === "" ||
      user.password.trim() === "" ||
      user.confirmPassword.trim() === "" ||
      user.birthDate.trim() === "" ||
      !captchaVerified
    ) {
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
    } else if (user.email !== user.confirmEmail) {
      Swal.fire({
        title: "ERROR",
        text: "Los correos electrónicos no coinciden",
        icon: "error",
        background: "#f9f9f9",
        confirmButtonColor: "#ffc107",
        customClass: {
          title: "swal2-title-custom",
          content: "swal2-content-custom",
          confirmButton: "swal2-confirm-custom",
        },
      });
    } else if (user.password !== user.confirmPassword) {
      Swal.fire({
        title: "ERROR",
        text: "Las contraseñas no coinciden",
        icon: "error",
        background: "#f9f9f9",
        confirmButtonColor: "#ffc107",
        customClass: {
          title: "swal2-title-custom",
          content: "swal2-content-custom",
          confirmButton: "swal2-confirm-custom",
        },
      });
    } else if (calculateAge(user.birthDate) < 18) {
      Swal.fire({
        title: "ERROR",
        text: "Debes tener al menos 18 años",
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
      handleShowTermsModal(); // Mostrar modal para aceptar términos
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Form className="rounded m-3" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formGroupUserName">
          <Form.Label className="text-white">Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="userName"
            value={user.userName}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupLastName">
          <Form.Label className="text-white">Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellido"
            name="lastName"
            value={user.lastName}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label className="text-white">Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            value={user.email}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupConfirmEmail">
          <Form.Label className="text-white">Confirma tu Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Confirma tu Correo Electrónico"
            name="confirmEmail"
            value={user.confirmEmail}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label className="text-white">Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="password"
            value={user.password}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
          <Form.Label className="text-white">Confirma tu Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirma tu Contraseña"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupBirthDate">
          <Form.Label className="text-white">Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            value={user.birthDate}
            onChange={onInputChange}
          />
        </Form.Group>

        <Captcha onSuccess={() => setCaptchaVerified(true)} />

        <div className="text-center">
          <button type="submit" className="btn btn-outline-warning m-2 rounded-pill mt-3">
            Registrarse
          </button>
        </div>
      </Form>

      {/* Modal de Términos y Condiciones */}
      <Modal show={showTermsModal}
        onHide={handleCloseTermsModal}
        centered
        className="shadow-lg welcome-text text-shadow text-light">
        <Modal.Header closeButton className="bg-dark border-warning">
          <Modal.Title>
            <div className="d-flex justify-content-center ">
              <h1 className="welcome-text text-shadow text-light">
                <span className="text-warning text-shadow">5</span>yield
              </h1>
            </div>


          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div>

            <h4>Términos y Condiciones</h4>
            <p>Última actualización: 15/02/2024</p>

            <ol>
              <li>
                <strong>Introducción:</strong><br /> <br />
                Bienvenido a 5yield. Estos términos y condiciones rigen el uso de nuestro sitio web y los servicios proporcionados por 5yield. Al acceder o utilizar nuestra plataforma, aceptas cumplir con estos términos en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no deberías utilizar nuestro sitio web.
              </li><br />

              <li>
                <strong>Definiciones:</strong><br /><br />
                "5yield" se refiere a la plataforma de fondo común de inversión basada en apuestas con cuotas bajas que operamos.<br />
                "Usuario" se refiere a cualquier persona que acceda o utilice nuestros servicios.<br />
                "Fondo Común de Inversión" se refiere a la agrupación de fondos de los usuarios para realizar apuestas en eventos específicos con cuotas bajas.<br />
                "Inversión" se refiere a la cantidad de dinero que un usuario aporta al fondo común.
              </li><br />

              <li>
                <strong>Acceso y Uso de la Plataforma:</strong><br /> <br />
                3.1. Solo las personas mayores de 18 años pueden registrarse y participar en 5yield.<br />
                3.2. Es responsabilidad del usuario asegurarse de que la utilización de los servicios de 5yield cumpla con las leyes locales de su jurisdicción.<br />
                3.3. El acceso a nuestra plataforma es exclusivamente para fines legales y está prohibido utilizarla para cualquier actividad fraudulenta o ilícita.
              </li><br />

              <li>
                <strong>Depósitos y Retiros:</strong><br /><br />
                4.1. Los usuarios pueden depositar fondos en la plataforma a través de Binance. La cantidad mínima y máxima de depósito está sujeta a cambios y se indicará en la página de depósito.<br />
                4.2. Los retiros solo pueden realizarse a la misma cuenta de Binance desde la cual se realizó el depósito.<br />
                4.3. 5yield no se responsabiliza por pérdidas derivadas de errores en la información proporcionada por el usuario al realizar depósitos o retiros.
              </li><br />

              <li>
                <strong>Inversiones y Rendimientos:</strong><br /><br />
                5.1. El fondo común de inversión se basa en la estrategia de apuestas con cuotas extremadamente bajas (≤1.10), donde el 50% del fondo inicial se apuesta diariamente, y las ganancias se reinvierten en una escalera de apuestas.<br />
                5.2. El rendimiento de las inversiones no está garantizado y está sujeto a variaciones según el desempeño de las apuestas realizadas.<br />
                5.3. Los usuarios deben invertir solo lo que están dispuestos a perder. 5yield no se responsabiliza por pérdidas de capital.
              </li><br />

              <li>
                <strong>Comunicación y Gestión de Participación:</strong><br /><br />
                6.1. Los usuarios recibirán actualizaciones semanales sobre el rendimiento de sus inversiones a través de la aplicación móvil asociada a 5yield.<br />
                6.2. 5yield se reserva el derecho de limitar la participación de cualquier usuario que considere que está incurriendo en conductas de riesgo excesivo.
              </li><br />

              <li>
                <strong>Responsabilidad:</strong><br /><br />
                7.1. 5yield no se responsabiliza por decisiones de inversión tomadas por los usuarios ni por las posibles pérdidas derivadas de estas decisiones.<br />
                7.2. Los usuarios reconocen que la participación en un fondo común de inversión basado en apuestas implica riesgos, y que pueden perder parte o la totalidad de su inversión.
              </li><br />

              <li>
                <strong>Privacidad:</strong><br /><br />
                8.1. 5yield recopila y procesa datos personales de acuerdo con nuestra Política de Privacidad.
              </li><br />

              <li>
                <strong>Modificaciones:</strong><br /><br />
                9.1. 5yield se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor a partir de su publicación en este sitio web.
              </li><br />

              <li>
                <strong>Contacto:</strong><br /><br />
                10.1. Para cualquier consulta relacionada con estos términos y condiciones, por favor contáctanos en [Correo Electrónico de Contacto].
              </li>
            </ol>


          </div>




          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Acepto los términos y condiciones"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="custom-checkbox warning-checkbox"
            />

          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-dark justify-content-center border-0">
          <Button
            className="m-2 rounded-pill mt-3"
            variant="outline-warning"
            onClick={() => {
              if (termsAccepted) {
                handleAcceptTerms();
              } else {
                Swal.fire({
                  title: "ERROR",
                  text: "Debes aceptar los términos y condiciones para continuar",
                  icon: "error",
                  background: "#f9f9f9",
                  confirmButtonColor: "#ffc107",
                });
              }
            }}
          >
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

