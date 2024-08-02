import Swal from "sweetalert2";
import authApi from '../../../api/authApi';

export const starLogin = async (userName, password, navigate) => {
  try {
    const resp = await authApi.post('/auth/login', {
      userName,
      password,
    });
    localStorage.setItem('token', resp.data.token);

    if (resp.data.rol === 'user') {
      navigate('/inv', { state: resp.data.email });
    } else {
      navigate("/admins", { state: resp.data.name });
    }

  } catch (error) {
    console.log(error);

    const errorMessage = error.response?.data?.msg || 'Error en el login';
    
    Swal.fire({
      title: "ERROR",
      text: errorMessage,
      icon: "error",
      background: "#f9f9f9",
      confirmButtonColor: "#ffc107",
      customClass: {
        title: "swal2-title-custom",
        content: "swal2-content-custom",
        confirmButton: "swal2-confirm-custom",
      },
    });

    
  }
}

