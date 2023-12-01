interface Comment {
  _id: string;
  author: {
    _id: string;
    username: string;
    // Otros campos del modelo de usuario si los hay
  };
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    username: string;
    // Otros campos del modelo de usuario si los hay
  };
  comments: Comment[];
  imageURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatarURL?: string;
  createdAt: Date;
  updatedAt: Date;
}



export interface ApiResponse {
  posts: Post[];
  users: User[];
  comments: Comment[];
 
}