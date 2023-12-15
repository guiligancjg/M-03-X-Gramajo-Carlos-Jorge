/// CONSULTAS AL SERVIDOR
import { AxiosResponse } from 'axios';
import User from '../Types/Users';
import Post from '../Types/Posts';
import UserLogin from '../Types/login';
import postsHomeDatos from '../Types/TodosLosPorst';
import instance from "./setCredentialsAxios"
import Cookies from "js-cookie"
import DatosUpdate from '../Types/DatosUpdate';
//import { useAccordionButton } from 'react-bootstrap';
//import Comments from '../Types/Comments';



export const eliminarPost = async (post_id: string) => {
  try {
    const response = await instance.delete(`/post/${post_id}`);
    console.log("MUESTRO LO QUE MANDO AL SERVIDOR:",response)
    return response.data.success;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de registro en Comments:', error);
    throw error;
  }
};

export const eliminarUsuario = async () => {
  try {
    const response = await instance.delete(`/profile`);
    console.log("MUESTRO LO QUE MANDO AL SERVIDOR:",response)
    return response.data.success;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de registro en Comments:', error);
    throw error;
  }
};

export const actualizarFotoPerfil = async (avatarURL: string) => {
  try {
    console.log("Este es la imagen URL que paso:",avatarURL)
    const response = await instance.put(`/profile?avatarURL=${encodeURIComponent(avatarURL)}`);// lo mando por query
    console.log("MUESTRO LO QUE MANDO AL SERVIDOR:",response)
    return response.data.success;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de registro en Comments:', error);
    throw error;
  }
};


export const actualizarDatosUsuario = async ( datos: DatosUpdate) => {
  try {
    //console.log("MUESTRO LO QUE MANDO AL SERVIDOR:",datos)
    const response = await instance.put(`/profile`, datos);
    
    return response.data.success;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de registro en Comments:', error);
    throw error;
  }
};


export const ingresarNuevocomment = async (description: string, post_id: string ): Promise<boolean> => {
  try {
    //console.log("Este es el comentario que estoy pasando:",description)
    const response = await instance.post(`/post/${post_id}?description=${encodeURIComponent(description)}`);
    return response.data.success;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de registro en Comments:', error);
    throw error;
  }
};

export const ingresarNuevoPost = async (post: Post): Promise<boolean> => {
  try {
    const response = await instance.post(`/createPost`, post);
    return response.data.success;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de registro en registerReq:', error);
    throw error;
  }
};


export const udatePost = async (post: Post, idpost: string): Promise<boolean> => {
  try {
    const response = await instance.put(`/post/${idpost}`, post);//lo mando por body
    return response.data.success;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error en la solicitud de update:', error);
    throw error;
  }
};

export const traigoUnPost = async (postId: string) => {
  try {
    console.log("Este el numero del post que quiero traer",postId)
    const response = await instance.post(`/postid/${postId}`);// Lo mando por params
    return response.data;
  } catch (error) {
    // Manejar errores aquí, por ejemplo, imprimir en la consola
    console.error('Error al traer un post:', error);
    throw error;
  }
};





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

export const loginRequest = async (user: UserLogin): Promise<boolean> => {
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



export const datosUsers = async () => {
  const token: string = Cookies.get('token');
  const isTokenValid = typeof token === 'string' && token.trim() !== '';
  console.log(token);
  if (isTokenValid) {
    try {
      const response = await instance.get("/profile", {
        headers: { Authorization: `${token}` }
      });
      console.log("Estos datos vienen de auth",response.data)
      return response.data; // Retorna los datos de la respuesta

    } catch (error) {
      console.error('Error en el Token en la verifyToken en el Frontend:', error);
      throw error; // Lanza el error para que pueda ser manejado por el código que llama a esta función
    }
  }//cierre if
};

