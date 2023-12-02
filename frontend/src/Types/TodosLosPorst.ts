interface postsHomeDatos {
  _id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    username: string;
    email: string;
    avatarURL: string;
    // Otros campos del modelo de usuario si los hay
  };
  comments: [{
    _id: string;
    author: {
      _id: string;
      username: string;
      email: string;
      avatarURL: string;
      // Otros campos del modelo de usuario si los hay
    };
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }];
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}




export default postsHomeDatos