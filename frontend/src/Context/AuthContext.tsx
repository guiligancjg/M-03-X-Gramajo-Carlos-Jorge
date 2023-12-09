import { Dispatch, SetStateAction, createContext, useState, ReactNode, useEffect } from "react";
import { registerReq, loginRequest, verifyToken, datosUsers } from '../api/auth';
import User from "../Types/Users";
import mostrarUser from "../Types/User";
import UserLogin from '../Types/login';
import axios from 'axios';
import Cookies from "js-cookie"

//import { postsHomeDatos } from "../../Types/TodosLosPorst"
//import { AxiosResponse } from 'axios';




export interface UserContextInterface {
    user: mostrarUser,
    isAuth: boolean,
    errors: string[],
    setUserProfile: Dispatch<SetStateAction<User>>,
    userProfile: User,
    setUser: Dispatch<SetStateAction<mostrarUser>>,
    signup: (user: User) => void,
    signin: (user: User) => void,
    profileUser: Dispatch<SetStateAction<User | undefined>>;
    signout: () => void,
    setErrors: Dispatch<SetStateAction<string[]>>,
    setIsAuth: Dispatch<SetStateAction<boolean>>
    //postPublic: () => Promise<postsHomeDatos>; 
}


const defaultState = {
    userProfile: {
        username: '',
        email: '',
        password: '',
        avatarURL: ''
    },
    user: {
        username: '',
        avatarURL: ''
    },
    setUser: () => { },
    setUserProfile: () => { },
    signup: () => { },
    signin: () => { },
    profileUser: () => { },
    signout: () => { },
    isAuth: false,
    errors: [],
    setErrors: () => { },
    setIsAuth: () => { }
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
        avatarURL: ''
    });

    const [userProfile, setUserProfile] = useState<User> ({
        username: '',
        email: '',
        password: '',
        avatarURL: ''

    });

     //al actualizar se iniciaza en false hay que ver el cache
    const [isAuth, setIsAuth] = useState<boolean>(false);
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
                avatarURL: ''
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
                username: res[0],
                avatarURL: res[1]
              };
              setUser(mostrarUserObj);
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


const profileUser = async () => {
    const token= Cookies.get('token');
    const isTokenValid = typeof token === 'string' && token.trim() !== '';
    if(isTokenValid){
    try {
        const res = await datosUsers(token);
        setIsAuth(true);
        //localStorage.setItem('isAuth', JSON.stringify(true));
        verifyLogin();
        setUserProfile(res);
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
}
};
    //Guardar las Cookies
    useEffect(()=>{
        console.log("Se a ejecutado verifyLogin")
       verifyLogin();
    },[])


    return (
        <UserContext.Provider value={{
            user,
            userProfile,
            isAuth,
            errors,
            setUser,
            setErrors,
            signup,
            signin,
            setIsAuth,
            signout,
            profileUser,
            setUserProfile
        }}>
            {children}
        </UserContext.Provider>
    )
}

