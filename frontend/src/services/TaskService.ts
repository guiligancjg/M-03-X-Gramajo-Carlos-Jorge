import { Comment, User , Post } from "../Types/TodosLosPorst"

const BASE_URL = "http://localhost:4010/getAllPosteosSinToken";

interface ApiResponse {
    posts: Post[];
    comments: Comment[];
    users: User[];
  }


export const TaskService =  {
    getAllPosts: async (): Promise<ApiResponse> => {
        try {
          const response = await fetch(BASE_URL);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error; 
        }
      },
    };