import Comment from "../models/comment.model.js"
import Post from "../models/post.model.js";



//BUSCAR TODOS LOS POSTS

export const getAllComment = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log('UserID:', userId);
  
      const comments = await Comment.find({ author: userId });
      res.json(comments);
  
  
    } catch (error) {
      res.status(400).json({ message: "Error al obtener los comentarios del usuario...", error: error.message });
    }
  };


//CREAR UN COMENTARIO
export const createComment = async (req, res) =>{
    try {
        const { description } = req.body;
        const userId = req.user.id; // Paso el id usuario "656408429f8e3dfb86d74bc0"
        const { postId } = req.params; // Paso el id del POST "6564774b31728eca8755cfa8"
        
        const newComment = new Comment({
            author: userId,
            description,
        });
        
    const commentSaved = await newComment.save();

    // Asocia el comentario al post
    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: commentSaved._id } },
        { new: true }
      );
      console.log(postId);

      res.status(200).json({ message: "El comentario se creo exitosamente!!!", comment: commentSaved, post: updatedPost });

    } catch (error) {
        
        
        res.status(400).json({message: "Error al crear el comentario", error});
    }
    
};



//ACTUALIZAR UN COMENTARIOS
export const updateComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const comment = req.body;
      const userId = req.user.id;
  
      // Verificar si el usuario autenticado es el mismo que creó el post
      const existingComment = await Comment.findOne({ _id: commentId, author: userId });
  
      if (!existingComment) {
        return res.status(403).json({ message: "No tienes permiso para actualizar este Comentario." });
      }
  
      const updatedComment = await Comment.findByIdAndUpdate(commentId, comment, {
        new: true,
      });
      console.log(userId);
      res.status(200).json({ message: "El comentario se actualizo exitosamente!!!.", updatedComment });
    } catch (error) {
      res.status(400).json({ message: "No se pudo actualizar el comentario..." });
    }
  };


  //EMILINAR UN COMENTARIO

export const deleteCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;
    
        // Verificar si el usuario autenticado es el mismo que creó el post
        const existingPost = await Comment.findOne({ _id: commentId, author: userId });
        console.log(existingPost)
    
        if (!existingPost) {
          return res.status(403).json({ message: "No tienes permiso para eliminar este comentario." });
        }
  
      const deletedComment = await Post.findByIdAndDelete(commentId);
      res.status(200).json({ message: "Comentario Eliminado..." });
    } catch (error) {
      res.status(404).json({ message: "Error al eliminar el comentario" });
    }
  };
  