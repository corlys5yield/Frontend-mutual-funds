import Swal from "sweetalert2";
import authApi from "../../../api/authApi";

export const retireInvestorToFund = async (mutualFundId, user, amount, navigate) => {
    try {
        // Realizar la petición POST a la ruta para añadir un inversor
        const resp = await authApi.put(`/funds/retire-investor/${mutualFundId}`, {
            user,
            amount,
        });

        // Verificar si la respuesta es exitosa
        if (resp.data.ok) {
            Swal.fire({
                title: "Éxito",
                text: resp.data.msg,
                icon: "success",
                background: "#f9f9f9",
                confirmButtonColor: "#ffc107",
                customClass: {
                  title: "swal2-title-custom",
                  content: "swal2-content-custom",
                  confirmButton: "swal2-confirm-custom",
                },
            });
        } else {
            Swal.fire({
                title: "Advertencia",
                text: resp.data.msg || "Hubo un problema al realizar el retiro el inversor.",
                icon: "warning",
                background: "#f9f9f9",
                confirmButtonColor: "#ffc107",
                customClass: {
                  title: "swal2-title-custom",
                  content: "swal2-content-custom",
                  confirmButton: "swal2-confirm-custom",
                },
            });
        }

    } catch (error) {
        console.log(error.response.data.msg);
        const errorMessage = error.response?.data?.msg || "Error inesperado al agregar inversor";
        
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

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }
};