import { PostService } from "../services/postService.js";
import { PostDto } from "../dtos/postDto.js";

class PostController {
    postService = new PostService();
    //Get all posts
    getAllPosts = async (req, res) => {
        try {
            const listPosts = await this.postService.getAllPosts({});
            res.status(200).json(listPosts);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    //Create new post
    createPost = async (req, res) => {
        try {
            const newPost = await this.postService.createPost(req.body);
            res.status(201).json({
                message: "Post criado com sucesso!",
                post: new PostDto(newPost),
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    //Get post by ID
    getPostById = async (req, res) => {
        try {
            const postById = await this.postService.getPostById(req.params.id);
            if (!postById) {
                return res.status(404).send("Post não encontrado!");
            }
            res.status(200).json(new PostDto(postById));
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    //Update post by ID
    updatePost = async (req, res) => {
        try {
            const updatePost = await this.postService.updatedPost(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatePost) {
                return res.status(404).send("Post não encontrado!");
            }
            res.status(201).json({
                message: "Post atualizado com sucesso!",
                post: new PostDto(updatePost),
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    //Delete post by ID
    deletePost = async (req, res) => {
        try {
            await this.postService.deletePost(req.params.id);
            res.status(200).send("Post removido com sucesso!");
        } catch (error) {
            res.status(500).send(error.message);
        }    
    }

    findPostsByKeyword = async (req, res) => {        
    }

}

export default new PostController();