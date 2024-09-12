import Swal from "sweetalert2";
import authApi from "../../../api/authApi";


export const LoadFundsUs = async (setFunds, userId, navigate) => {
    try {
        if (!userId || typeof userId !== 'string' || !userId.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('El ID del usuario proporcionado no es válido');
        }

        const response = await authApi.get('/auth/funds-Us', {
            params: { userId } // Envía el ID como parámetro de consulta
        });

        if (Array.isArray(response.data.mutualFunds)) {
            setFunds(response.data.mutualFunds);
        } else {
            console.error("Los datos de fondos comunes no son un array:", response.data);
        }

    } catch (error) {
        console.error("Error al obtener los fondos del usuario:", error);

        const errorMessage = error.response?.data?.msg || 'Ocurrió un error inesperado';

        Swal.fire({
            title: "ADVERTENCIA",
            text: errorMessage,
            icon: "warning",
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

}