import Swal from "sweetalert2";
import authApi from "../../../api/authApi";


export const LoadPercentage = async (setPercentage) => {

    try {
        const resp = await authApi.get('/auth/All-percentage'); 

        if (Array.isArray(resp.data.periods)) {
            setPercentage(resp.data.periods);
        } else {
            console.error("Los datos de los periodos no son un array:", resp.data);
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
       
    }


}