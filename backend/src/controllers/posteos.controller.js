import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js"
import User from "../models/user.post.model.js";

//Logica necesaria para recibir peticiones del cliente y dar respues del servidor

//BUSCAR TODOS LOS POSTS

export const getAllPosteos = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('UserID:', userId);

    const posts = await Post.find({ author: userId });
    res.json(posts);


  } catch (error) {
    res.status(400).json({ message: "Error al obtener los posts del usuario...", error: error.message });
  }
};


//BUSCAR TODOS LOS POSTS

export const getAllPosteosSinToken = async (req, res) => {
  try {


    // Utiliza populate para poblar los detalles del autor y los comentarios
    const posts = await Post.find().populate({
      path: 'author',
      select: 'username email', // Selecciona los campos que deseas mostrar del autor
    }).populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'username email', // Selecciona los campos que deseas mostrar del autor del comentario
      },
    });

    res.json(posts);


  } catch (error) {
    res.status(400).json({ message: "Error al obtener los posts del usuario...", error: error.message });
  }
};


//BUSCAR UN POST POR ID

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    return res.json({ message: "Error al buscar un post por id" });
  }
};

//CREAR UN POST
export const createPost = async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;
    const userId = req.user.id;

    const newPost = new Post({
      title,
      description,
      author: userId,
      comments: [],
      imageURL,
    });

    const postSaved = await newPost.save();
    res.status(201).json(postSaved);
  } catch (error) {
    console.log(req.body);

    res.status(400).json({ message: "Error al crear el post", error });
  }
};

//ACTUALIZAR UN POST
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = req.body;
    const userId = req.user.id;

    // Verificar si el usuario autenticado es el mismo que creó el post
    const existingPost = await Post.findOne({ _id: postId, author: userId });

    if (!existingPost) {
      return res.status(403).json({ message: "No tienes permiso para actualizar este post." });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      new: true,
    });
    console.log(userId);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: "No se pudo actualizar el post" });
  }
};

//EMILINAR UN POST

export const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Verificar si el usuario autenticado es el mismo que creó el post
    const existingPost = await Post.findOne({ _id: postId, author: userId });
    console.log(existingPost)

    if (!existingPost) {
      return res.status(403).json({ message: "No tienes permiso para eliminar este post." });
    }


    const deletedPost = await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post Eliminado..." });
  } catch (error) {
    res.status(404).json({ message: "Error al eliminar el post" });
  }
};
