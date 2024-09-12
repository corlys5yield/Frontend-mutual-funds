import Swal from "sweetalert2";
import authApi from '../../../api/authApi';

export const aprovedTransaction = async (setNewTrans,TransId) => {
    try {
        console.log(TransId)
        const resp = await authApi.put('/transactions/trans-confirm', {
          _id:TransId 
        });

        
        
          setNewTrans(true)

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

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
  }


}