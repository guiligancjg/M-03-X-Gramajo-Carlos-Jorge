import { Dispatch, SetStateAction, createContext, useState, ReactNode, useEffect} from "react";
import { registerReq, loginRequest } from "../../api/auth";
import User from "../../Types/Users";
import UserLogin from '../../Types/login';
import axios from 'axios';


export interface UserContextInterface {
    user: User,
    isAuth: boolean,
    errors: string[],
    setUser: Dispatch<SetStateAction<User>>,
    signup: (user: User) => void;
    signin: (user: User) => void;
    setErrors: Dispatch<SetStateAction<string[]>>;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}


const defaultState = {
    user: {
        username: '',
        email: '',
        password: '',
        avatarURL: ''
    },
    setUser: () => { },
    signup: () => { },
    signin: () => { },
    isAuth: false,
    errors: [],
    setErrors: () => [],
    setIsAuth: () => {},
} as UserContextInterface

export const UserContext = createContext(defaultState)


type UserProvideProps = {
    children: ReactNode
}


export default function UserProvider({ children }: UserProvideProps) {

    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        password: '',
        avatarURL: ''
    });

    const [isAuth, setIsAuth] = useState<boolean>(false);



    const [errors, setErrors] = useState<string[]>([]);

    const signup = async (user: User) => {
        try {
            const res = await registerReq(user);
            //actualizamos al user con este setUser
            setUser(res.data);
            setIsAuth(true);
        } catch (error) {

            // Comprobación de tipo para 'error'
            if (axios.isAxiosError(error)) {
                console.error('Error en el registro:', error);
                setErrors(error.response?.data); 
            } else {
                console.error('Error desconocido en el registro:', error);
            }
        }
        };


 const signin = async (user: UserLogin) => {
            try {
              const res = await loginRequest(user);
              
              setUser(res.data);
              setIsAuth(true);
            } catch (error) {
                console.log("paso los datos a loginResquest en el archivo AuthContex.tsx",error);
           if (axios.isAxiosError(error)) {
                //console.log('Error en el registro signin en el archivo AuthContexto:', error);
                setErrors(error.response?.data); // O ajusta según la estructura de tu error
            } else {
                console.log('Error desconocido en el registro:', error);
            }
            }
          };



  //este useEffect es para manejar el tiempo del error y limpiar pasado el tiempo estipulado
  useEffect(() => {
    if (errors.length > 0) {
      //el uso de timers en react es peligroso por eso generamos lo siguiente
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);


  
return (
            <UserContext.Provider value={{
                user,
                isAuth,
                errors,
                setUser,
                setErrors,
                signup,
                signin,
                setIsAuth
                
            }}>
                {children}
            </UserContext.Provider>
        )
    }

