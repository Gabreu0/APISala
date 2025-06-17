import { AuthorRepository } from "../repositories/authorRepository.js";
import { AuthorDto } from "../dtos/authorDto.js";

export class AuthorService {
    constructor() {
        this.authorRepository = new AuthorRepository();
    }

    createAuthor = async (authorData) => {
        const author = AuthorDto.fromRequest(authorData);
        return await this.authorRepository.create(author);
    }

    getAllAuthors = async () => {
        return await this.authorRepository.findAll();
    }

    getAuthorById = async (id) => {
        const foundAuthor = await this.authorRepository.findById(id);
        if (!foundAuthor) {
            throw new Error("Autor não encontrado.");
        }
        return foundAuthor;
    }

    updateAuthor = async (id, authorData) => {
        const updateAuthor = await this.authorRepository.update(id, authorData);

        if (!updateAuthor) {
            throw new Error("Autor não encontrado.");
        }
        return updateAuthor;
    }

    deleteAuthor = async (id) => {
        const deletedAuthor = await this.authorRepository.delete(id);
        if (!deletedAuthor) {
            throw new Error("Autor não encontrado.");
        }
        return deletedAuthor;
    }

    searchAuthorByName = async (name) => {
        if (!name || name.trim() === "") {
            throw new Error("Informar o nome do Autor para busca.");
        }
        return await this.authorRepository.searchByName(name);
    }
}