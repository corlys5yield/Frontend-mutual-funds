import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Spinner, Form, Container } from "react-bootstrap";

const Captcha = ({ onSuccess }) => {
  const [clicked, setClicked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const spinnerRef = useRef(null);
  const textRef = useRef(null);

  // Simulación de procesamiento de la verificación
  useEffect(() => {
    if (processing) {
      // Ocultar el texto y el checkbox con GSAP
      gsap.to(textRef.current, { opacity: 0, duration: 0.5 });

      // Activar la animación del spinner
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "linear",
      });

      // Simular el procesamiento y mostrar la verificación exitosa después de 2 segundos
      setTimeout(() => {
        setProcessing(false); // Detiene el spinner
        setClicked(true); // Muestra el texto de verificación exitosa
        onSuccess(); // Llama a la función de éxito
      }, 2000);
    }
  }, [processing, onSuccess]);

  // Maneja el clic en el captcha (checkbox)
  const handleCaptchaClick = () => {
    if (!clicked) {
      setProcessing(true); // Inicia el proceso de verificación
    }
  };

  return (
    <Container className="captcha-container bg-light text-dark p-4 rounded border border-secondary text-center">
      {/* Texto y checkbox de "No soy un robot" */}
      {!clicked && (
        <div
          ref={textRef}
          className="captcha-box d-flex align-items-center justify-content-center mb-3"
          onClick={handleCaptchaClick}
          style={{ cursor: "pointer" }}
        >
          <Form.Check
            type="checkbox"
            id="captcha-checkbox"
            custom="true"
            className="me-2"
            disabled={clicked || processing} // Deshabilita después de clic
          />
          <span className="captcha-text fw-bold">No soy un robot </span>
          
          {/* Separación del icono con margen y negrita */}
          <h3 className="ms-3 fw-bold">
            <i className="bi bi-shield-exclamation"></i>
          </h3>
        </div>
      )}

      {/* Spinner de verificación */}
      <div
        ref={spinnerRef}
        className={`spinner-container ${
          processing ? "d-block" : "d-none"
        } mt-3`}
      >
        <Spinner animation="border" variant="warning" />
      </div>

      {/* Mensaje de verificación exitosa */}
      {clicked && !processing && (
        <div className="text-success">
          {/* Separación de los elementos con margen y negrita */}
          <div className="d-flex justify-content-center align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-check-circle"
              viewBox="0 0 16 16"
            ></svg>
            
          </div>

          <span className="ms-2 fw-bold">Verificación exitosa</span>

          {/* Separación del nuevo icono con margen y negrita */}
          <h3 className="mt-3 fw-bold">
            <i className="bi bi-shield-check"></i>
          </h3>
        </div>
      )}
    </Container>
  );
};

export default Captcha;


