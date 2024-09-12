import Swal from "sweetalert2";
import authApi from "../../../api/authApi";


export const starCreateFund = async (name, startDate, endDate, maxInvestors, minInvestmentAmount,setNewFund, navigate) => {
    try {
        const resp = await authApi.post('/funds/new-fund', {
          name, 
          startDate, 
          endDate, 
          maxInvestors,
          minInvestmentAmount
        });

        Swal.fire({
            title: "se ah creado un fondo con exito",
            text: "ahora vera a las transacciones de los inversores que se sumaran al fondo",
            icon: "success",
            background: "#f9f9f9",
            confirmButtonColor: "#ffc107",
            customClass: {
              title: "swal2-title-custom",
              content: "swal2-content-custom",
              confirmButton: "swal2-confirm-custom",
            },
          });
        
        setNewFund(true)

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
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
      }
  
        
    }

}