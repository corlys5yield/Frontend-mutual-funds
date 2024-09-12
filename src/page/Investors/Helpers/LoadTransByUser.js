import Swal from "sweetalert2";
import authApi from "../../../api/authApi";


export const LoadTransactionsByUs = async (setTransactions,userId, navigate) => {

    try {
        
        const resp = await authApi.get(`/transactions/trans-us/${userId}`);

        if (Array.isArray(resp.data.transactions)) {
            setTransactions(resp.data.transactions);
        } else {
            console.error("Los datos de las transacciones no son un array:", resp.data);
        }

    } catch (error) {
        console.log(error.response.data.msg);
        Swal.fire({
            title: "ERROR",
            text: error.response.data.msg,
            icon: "error",
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