//import { author } from "../models/Author.js";
import { AuthorService } from "../services/authorService.js";
import { AuthorDto } from "../dtos/authorDto.js";

class AuthorController {
    constructor() {
        this.authorService = new AuthorService();
    }

    createAuthor = async (req, res) => {
        try {
            const newAuthor = await this.authorService.createAuthor(req.body);
            res.status(201).json({
                message: "Autor criado com sucesso!",
                author: new AuthorDto(newAuthor),
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    getAllAuthors = async (req, res) => {
        try {
            const listAuthors = await this.authorService.getAllAuthors();
            res.status(200).json(listAuthors.map((author) => new AuthorDto(author)));
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    getAuthorById = async (req, res) => {
        try {
            const authorById = await this.authorService.getAuthorById(req.params.id);
            if (!authorById) {
                return res.status(404).send("Autor não encontrado!");
            }
            res.status(200).json(new AuthorDto(authorById));
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    updateAuthor = async (req, res) => {
        try {
            const updateAuthor = await this.authorService.updateAuthor(
                req.params.id,
                req.body, { new: true });
            if (!updateAuthor) {
                return res.status(404).send("Autor não encontrado!");
            }
            res.status(201).json({
                message: "Autor atualizado com sucesso!",
                author: new AuthorDto(updateAuthor),
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    deleteAuthor = async (req, res) => {
        try {
            await this.authorService.deleteAuthor(req.params.id);

            res.status(200).json({
                message: "Autor removido com sucesso!"
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    searchAuthorByName = async (req, res) => {
        try {
            const { name } = req.params;
            const authors = await this.authorService.searchAuthorByName(name);
            if (authors.length === 0) {
                return res.status(404).json({
                    message: "Nenhum Autor encontrado com o nome informado.",
                    name: name,
                });
            }
            res.status(200).json(authors.map((author) => new AuthorDto(author)));
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

//export default AuthorController;
export default new AuthorController();