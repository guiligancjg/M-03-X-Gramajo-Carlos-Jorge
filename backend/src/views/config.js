import dotenv from "dotenv";

dotenv.config();


export const settingDotEnv = ()=> {
    return{
        port: process.env.PORT,
        db: {
            host: process.env.DB_HOST,
            localhost: process.env.DB_LOCALHOST
        }
    }
       
};


export const settingTokenSecret = () => {
    return {
        secret: process.env.SECRET_KEY
    }
    
};




