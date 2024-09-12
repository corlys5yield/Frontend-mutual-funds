import Swal from "sweetalert2";
import authApi from "../../../api/authApi";

export const UpdateUs = async (_id,email, userName, lastName,rol, password, navigate) => {
    try {
        const resp = await authApi.put('/admin/updateUser', {
            _id,
          email, 
          userName, 
          lastName,
          rol, 
          password,
        });


          Swal.fire({
            title: 'Usuario actualizado',
            text:  resp.data.msg,
            icon: 'success',
            background: "#f9f9f9",
            confirmButtonColor: "#ffc107",
            confirmButtonText: 'Ok',
        });
        
        

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
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

}