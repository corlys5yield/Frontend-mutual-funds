import Swal from "sweetalert2";
import authApi from "../../../api/authApi";

export const addInvestorToFund = async (mutualFundId, user, mount, navigate) => {
    try {
        // Realizar la petición POST a la ruta para añadir un inversor
        const resp = await authApi.post(`/funds/add-investor/${mutualFundId}`, {
            user,
            mount,
        });

        // Verificar si la respuesta es exitosa
        if (resp.data.ok) {

               // Mensaje de éxito general
               Swal.fire({
                title: "Éxito",
                text: "La transacción ha sido aprobada y el inversor ha sido añadido al fondo.",
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
                text: resp.data.msg || "Hubo un problema al agregar el inversor.",
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