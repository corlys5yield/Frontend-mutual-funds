import axios from "axios";

export const authApi=axios.create({
	baseURL: "https://backend-mutual-funds.onrender.com",//en produccion 
    //serverURL: "http://localhost:4007",
	//serverURL: "aqui va el de render o donde se deploye el back",    
});

//envia atraves del header la llave del token que previamente se guardo en el local storage
authApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default authApi;