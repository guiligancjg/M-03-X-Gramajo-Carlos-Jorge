import { Dispatch, SetStateAction, createContext, useState, ReactNode, useEffect } from "react";
import { registerReq, loginRequest, verifyToken, ingresarNuevoPost, ingresarNuevocomment, traigoUnPost } from '../api/auth';
import User from "../Types/Users";
import Post from "../Types/Posts";
//import Comments from "../Types/Comments";
import mostrarUser from "../Types/User";
import UserLogin from '../Types/login';
import axios from 'axios';
import Cookies from "js-cookie"

//import { postsHomeDatos } from "../../Types/TodosLosPorst"
//import { AxiosResponse } from 'axios';





export interface UserContextInterface {
    user: mostrarUser,
    isAuth: boolean,
    idUser: string,
    idDelPosteo: string,
    idPost?: Post,
    setPost: Dispatch<SetStateAction<Post>>,
    setidDelPosteo: Dispatch<SetStateAction<string>>,
    unPost: (post: string) => void,
    errors: string[],
    setUser: Dispatch<SetStateAction<mostrarUser>>,
    signup: (user: User) => void,
    nuevoPost: (post: Post) => void,
    commentNuevo: (comment: string, post_id: string) => void,
    signin: (user: User) => void,
    //profileUser: () => Promise<void | null>,
    signout: () => void,
    setErrors: Dispatch<SetStateAction<string[]>>,
    setIsAuth: Dispatch<SetStateAction<boolean>>
    //postPublic: () => Promise<postsHomeDatos>; 
}


const defaultState = {
    user: {
        username: '',
        avatarURL: '',
        email: ''
    },
    idPost:{
        title: '',
        description: '',
        imageURL: ''
      },
    unPost: () => { },
    setUser: () => { },
    setPost: () => { },
    setidDelPosteo: () => { },
    signup: () => { },
    commentNuevo: () => { },
    nuevoPost: () => { },
    signin: () => { },
    signout: () => { },
    isAuth: false,
    idUser: '',
    idDelPosteo: '',
    errors: [],
    setErrors: () => { },
    setIsAuth: () => { },
   // profileUser: async () => null, // Ajusta según tu lógica
} as UserContextInterface
/*postPublic: async () => {
        console.warn('Implementación básica de postPublic: Devuelve una promesa resuelta con un objeto vacío.');
        return Promise.resolve({ posts: [], users: [], comments: [] });
      },*/
export const UserContext = createContext(defaultState)


type UserProvideProps = {
    children: ReactNode
}


export default function UserProvider({ children }: UserProvideProps) {

    const [user, setUser] = useState<mostrarUser> ({
        username: '',
        avatarURL: '',
        email: ''
    });

 
     //al actualizar se iniciaza en false hay que ver el cache
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [idUser, setidUser] = useState<string>('');
    const [idDelPosteo, setidDelPosteo] = useState<string>('');
    const [idPost, setPost] = useState<Post> ({
        title: '',
        description: '',
        imageURL: ''
    });


    
/******************************************************************************** */


    const [errors, setErrors] = useState<string[]>([]);

    const signup = async (user: User) => {
        try {
          
           const res = await registerReq(user);
           
           return res;
            //actualizamos al user con este setUser
            //
            
        } catch (error) {

            // Comprobación de tipo para 'error'
            if (axios.isAxiosError(error)) {
                console.error('Error en el registro:', error);
                setErrors(error.response?.data);
            } else {
                console.error('Error desconocido en el registro:', error);
            }
            return false;
           
        }
    };



    const commentNuevo = async (comment: string, post_id: string) => {
        try {
            console.error('Esto es lo que paso a commentNuevo en el archivo AuthContext', comment);
           const res = await ingresarNuevocomment(comment, post_id);
           console.error('En el archivo AuthContext lo que paso por res', res);
           return res;
            //actualizamos al user con este setUser
            //
            
        } catch (error) {

            // Comprobación de tipo para 'error'
            if (axios.isAxiosError(error)) {
                console.error('Error al crear el Comentario:', error);
                setErrors(error.response?.data);
            } else {
                console.error('Error desconocido al crear el Comentario:', error);
            }
            return false;
           
        }
    };


    const nuevoPost = async (post: Post) => {
        try {
          
           const res = await ingresarNuevoPost(post);
           
           return res;
            //actualizamos al user con este setUser
            //
            
        } catch (error) {

            // Comprobación de tipo para 'error'
            if (axios.isAxiosError(error)) {
                console.error('Error al crear el Post:', error);
                setErrors(error.response?.data);
            } else {
                console.error('Error desconocido al crear el post:', error);
            }
            return false;
           
        }
    };


    const unPost = async (post: string) => {
        console.log("entro en un post funcion")
        try {
           setidDelPosteo(post);
           const res = await traigoUnPost(post);
           console.log("Aqui traigo el post del servidor: ",res)
           setPost(res)
           return res;

            
        } catch (error) {

            // Comprobación de tipo para 'error'
            if (axios.isAxiosError(error)) {
                console.error('Error al crear el Post:', error);
                setErrors(error.response?.data);
            } else {
                console.error('Error desconocido al crear el post:', error);
            }
            return false;
           
        }
    };

    const signin = async (user: UserLogin) => {
        
        try {
            const res = await loginRequest(user);
            setIsAuth(true);
            //localStorage.setItem('isAuth', JSON.stringify(true));
            verifyLogin();
            return res;
            
            //setUser(res.data);
            //setErrors([]);
        } catch (error) {
            console.log("paso los datos a loginResquest en el archivo AuthContex.tsx", error);
            if (axios.isAxiosError(error)) {
                //console.log('Error en el registro signin en el archivo AuthContexto:', error);
                setErrors(error.response?.data); // O ajusta según la estructura de tu error
            } else {
                console.log('Error desconocido en el registro:', error);
            }

            return false;
        }
    };



        const signout = () => {
            Cookies.remove('token');
            setIsAuth(false);
            setUser({
                username: '', 
                avatarURL: '',
                email: ''
            });
        }
    /*
    const postPublic = async () => {
                try {
                  const res = await potsHomePublic();
                 
                  console.log("potsHomePublic AuthContex.tsx",res);
                  //setIsAuth(true);
                  return res;
                  
                } catch (error) {
                    console.log("potsHomePublic AuthContex.tsx",error);
               if (axios.isAxiosError(error)) {
                    //console.log('Error en el registro signin en el archivo AuthContexto:', error);
                    setErrors(error.response?.data); // O ajusta según la estructura de tu error
                } else {
                    console.log('Error desconocido en el registro:', error);
                }
                }
              };
    */
    //este useEffect es para manejar el tiempo del error y limpiar pasado el tiempo estipulado
 /*   useEffect(() => {
        if (errors.length > 0) {
            //el uso de timers en react es peligroso por eso generamos lo siguiente
            const timer = setTimeout(() => {

                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

*/
 async function verifyLogin(){
    const token: string = Cookies.get('token');
    const isTokenValid = typeof token === 'string' && token.trim() !== '';
    console.log(token);
    if(isTokenValid){
        try {
            const res = await verifyToken(token);
            setIsAuth(true);
            //Aqui paso el vector res a mostrarUser, para mostrar el usuario y la foto en la navbarPrivado
            const mostrarUserObj: mostrarUser = {
                username: res[1],
                avatarURL: res[2],
                email: res[3]
              };
              setUser(mostrarUserObj);
              setidUser(res[0]);
            console.log("Aqui muestro res en el archivo AuthContextffsadf",res)
            return true;
        } catch (error) {
            console.log('Error al verificar el token estoy en AuhtContext:', error);
            return false
        }
    }else {
        //setIsAuth(false);
        console.log('La cookie "token" no está presente.');
        return false
    }
    
   }

/*
const profileUser = async () => {
    const token= Cookies.get('token');
    const isTokenValid = typeof token === 'string' && token.trim() !== '';
    if (isTokenValid) {
        try {
          const res = await datosUsers(token);
          //setIsAuth(true);
          console.log('Esto son los datos de Users', res);
          return res;
        } catch (error) {
          console.log("paso los datos a loginRequest en el archivo AuthContext.tsx", error);
          if (axios.isAxiosError(error)) {
            setErrors(error.response?.data);
          } else {
            console.log('Error desconocido en el registro:', error);
          }
          throw error;
        }
      } else {
        return null;
      }
};*/
    //Guardar las Cookies
    useEffect(()=>{
        console.log("Se a ejecutado verifyLogin")
       verifyLogin();
    },[])


    return (
        <UserContext.Provider value={{
            user,
            isAuth,
            errors,
            idUser,
            idPost,
            idDelPosteo,
            setidDelPosteo,
            unPost,
            setPost,
            setUser,
            setErrors,
            signup,
            signin,
            setIsAuth,
            signout,
            nuevoPost,
            commentNuevo,
        }}>
            {children}
        </UserContext.Provider>
    )
}

