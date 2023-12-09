/// CONSULTAS AL SERVIDOR
import { AxiosResponse } from 'axios';
import User from '../Types/Users';
import UserLogin from '../Types/login';
import postsHomeDatos from '../Types/TodosLosPorst';
import instance from "./setCredentialsAxios"


export const registerReq = async (user: User): Promise<boolean> => {
  try {
    const response = await instance.post(`/signup`, user);
    return response.data.success;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de registro en registerReq:', error);
    throw error;
  }
};

export const loginRequest = async (user: UserLogin): Promise<boolean> =>{
  try {
    const response = await instance.post('/signin', user);
    console.log('Respuesta de loginRequest en el archivo auth.tsx:', response);
    return response.data.success;
  } catch (error) {
    console.error('Error en loginRequest:', error);
    throw error;
  }
};


export const potsHomePublic = async () => {
      const response: AxiosResponse<postsHomeDatos[]> = await instance.get('/postsintoken');
      return response;

};



//Verificamos desde el Backend el TOKEN

export const verifyToken = async (token: string) => {
  try {
    const response: AxiosResponse<string> = await instance.get("/verifyToken", { 
      headers: { Authorization: `${token}` } 
    });
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error en el Token en la verifyToken en el Frontend:', error);
    throw error; // Lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};



export const datosUsers = async (token: string) => {
  try {
    const response: AxiosResponse<User> = await instance.get("/profile", { 
      headers: { Authorization: `${token}` } 
    });
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    console.error('Error en el Token en la verifyToken en el Frontend:', error);
    throw error; // Lanza el error para que pueda ser manejado por el código que llama a esta función
  }
};

