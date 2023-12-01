/// CONSULTAS AL SERVIDOR
import axios from 'axios';
import User from '../Types/Users';
import UserLogin from '../Types/login';


export const registerReq = async (user: User) => {
  try {
    const response = await axios.post(`http://localhost:4010/signup`, user);
    return response.data;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de registro:', error);
    throw error;
  }
};

export const loginRequest = async (user: UserLogin) => {
  try {
    const response = await axios.post('http://localhost:4010/signin', user);
    console.log('Respuesta de loginRequest en el archivo auth.tsx:', response);
    return response.data;
  } catch (error) {
    console.error('Error en loginRequest:', error);
    throw error;
  }
};
