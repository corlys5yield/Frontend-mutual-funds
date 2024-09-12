import Swal from "sweetalert2";
import authApi from '../../../api/authApi';

export const addPercentage = async ( percentage, endPeriod, navigate) => {
    try {
        // Realiza la petición POST al endpoint correspondiente en tu backend
        const resp = await authApi.post('/admin/add-porcentagePeriod', {
            endPeriod,
            percentage
            
        });

        // Muestra un mensaje de éxito al usuario
        Swal.fire({
            title: "Porcentaje añadido con éxito",
            text: resp.data.msg || "El porcentaje fue agregado correctamente al fondo.",
            icon: "success",
            background: "#f9f9f9",
            confirmButtonColor: "#ffc107",
            customClass: {
                title: "swal2-title-custom",
                content: "swal2-content-custom",
                confirmButton: "swal2-confirm-custom",
            },
        });

    } catch (error) {
        console.log(error.response?.data?.msg);
        const errorMessage = error.response?.data?.msg || 'Error al añadir el porcentaje';

        // Muestra un mensaje de error al usuario
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

        // Maneja errores de autenticación (opcional)
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }
};