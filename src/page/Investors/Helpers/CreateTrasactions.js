import Swal from "sweetalert2";
import authApi from '../../../api/authApi';

export const createTransaction = async (userId, type, amount, aliasBn, idOrder,mutualFundId, navigate) => {
    try {
        const resp = await authApi.post('/transactions/new-trans', {
            user: userId,
            type, 
            amount,
            aliasBn,
            id_order: idOrder,
            mutualFundId
        });

        Swal.fire({
            title: "Transacción realizada con éxito",
            text: resp.data.msg || "Hubo un problema al realizar la solicitud.",
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
        console.log(error.response.data.msg);
        const errorMessage = error.response?.data?.msg || 'Error en la transacción';
    
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
}