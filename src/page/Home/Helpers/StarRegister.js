import Swal from "sweetalert2";
import authApi from '../../../api/authApi';

export const starRegister = async (userName, aliasBN, password, navigate) => {
    try {
        const resp = await authApi.post('/auth/new', {
            userName,
            aliasBN,
            password,
        });

        Swal.fire({
            title: "se ah registrado con exito",
            text: "ahora podra loguearse",
            icon: "success",
            background: "#f9f9f9",
            confirmButtonColor: "#ffc107",
            customClass: {
              title: "swal2-title-custom",
              content: "swal2-content-custom",
              confirmButton: "swal2-confirm-custom",
            },
          });
        
        navigate("/*");

    } catch (error) {
        console.log(error.response.data.msg);
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