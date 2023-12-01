import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },

  avatarURL: {
    type: String,
  }
},{
    timestamps: true,
    versionKey: false
});


//Generar los metodos para cifrar las contraseñas y desencriptar, compara para validar
//Utizar el metodo estatico para evitar instanciar
userSchema.statics.encryptPassword = async(password) => {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
};

userSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password,receivedPassword);
}



export default model("User",userSchema);


