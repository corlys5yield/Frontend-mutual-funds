import Swal from "sweetalert2";
import authApi from "../../../api/authApi";


export const LoadFunds = async (setFondosComunes, navigate) => {

    try {
        const resp = await authApi.get('/funds/All-funds'); // Asegúrate de que este sea el endpoint correcto

        if (Array.isArray(resp.data.mutualFunds)) {
            setFondosComunes(resp.data.mutualFunds);
        } else {
            console.error("Los datos de fondos comunes no son un array:", resp.data);
        }

    } catch (error) {
        console.log(error.response.data.msg);
        Swal.fire({
            title: "ADVERTENCIA",
            text: error.response.data.msg,
            icon: "warning",
            background: "#f9f9f9",
            confirmButtonColor: "#ffc107",
            customClass: {
              title: "swal2-title-custom",
              content: "swal2-content-custom",
              confirmButton: "swal2-confirm-custom",
            },
          });
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }


}