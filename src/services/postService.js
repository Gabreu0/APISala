import { PostRepository } from "../repositories/postRepository.js";
import { AuthorRepository } from "../repositories/authorRepository.js";
import { PostDto } from "../dtos/postDto.js";

export class PostService {
    postRepository = new PostRepository();
    authorRepository = new AuthorRepository();

    getAllPosts = async () => {
        return await this.postRepository.findAll();
    }

    createPost = async (postData) => {
        const foundAuthor = await this.authorRepository.findById(postData.author);
        if (!foundAuthor) {
            throw new Error("Autor informado não existe.");
        }
        const completePost = {
            ...PostDto.fromRequest(postData),
            author: { ...foundAuthor._doc },
        }
        return await this.postRepository.create(completePost);
    }

    getPostById = async (id) => {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new Error("Post não encontrado");
        }
        return post;
    }

    updatedPost = async (id, postData) => {
        let updateData = { ...postData };

        if (postData.author) {
            const foundAuthor = await this.authorRepository.findById(postData.author);
            if (!foundAuthor) {
                throw new Error("Autor não encontrado!");
            }
            updateData.author = { ...foundAuthor._doc };
        }

        const updatedPost = await this.postRepository.update(id, updateData);
        if (!updatedPost) {
            throw new Error("Postagem não encontrada");
        }
        return updatedPost;
    }

    deletePost = async (id) => {
        const deletedPost = await this.postRepository.delete(id);
        if (!deletedPost) {
            throw new Error("Postagem não encontrada");
        }
        return deletedPost;
    }

    searchPostsByKeyword = async (keyword) => {
        if (!keyword) {
            throw new Error("Palavra-chave não informada.")
        }
        return await this.postRepository.searchByKeyword(keyword);
    }
}