import { UserService } from "../services/userService.js";
import { UserDto } from "../dtos/userDto.js";

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    register = async (req, res) => {
        try {
            console.log('=== DEBUG: Register - Dados recebidos ===');
            console.log('req.body:', req.body);
            console.log('req.body type:', typeof req.body);
            
            // Validação básica antes de processar
            if (!req.body) {
                return res.status(400).json({
                    error: "Body da requisição está vazio"
                });
            }

            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    error: "Campos obrigatórios ausentes",
                    received: { nome: !!nome, email: !!email, senha: !!senha }
                });
            }

            console.log('=== DEBUG: Criando DTO ===');
            const dto = UserDto.fromRequest(req.body);
            console.log('DTO criado:', dto);
            
            console.log('=== DEBUG: Chamando userService.register ===');
            const newUser = await this.userService.register(dto);
            console.log('Usuário criado:', newUser);
            
            res.status(201).json({
                message: "Usuário criado com sucesso!",
                user: new UserDto(newUser),
            });
            
        } catch (error) {
            console.error('=== DEBUG: Erro no register ===');
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            console.error('Error name:', error.name);
            
            // Melhor tratamento de diferentes tipos de erro
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    error: "Dados inválidos",
                    details: error.message
                });
            }
            
            if (error.code === 11000) { // Duplicate key error (MongoDB)
                return res.status(400).json({
                    error: "Email já está em uso"
                });
            }
            
            res.status(500).json({
                error: "Erro interno do servidor",
                message: error.message,
                ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
            });
        }
    }

    getAllUsers = async (req, res) => {
        try {
            const listUsers = await this.userService.getAllUsers();
            res.status(200).json(listUsers.map((user) => new UserDto(user)));
        } catch (error) {
            console.error('Erro em getAllUsers:', error);
            res.status(500).json({
                error: "Erro ao buscar usuários",
                message: error.message
            });
        }
    }

    getUserById = async (req, res) => {
        try {
            const userById = await this.userService.getUserById(req.params.id);
            if (!userById) {
                return res.status(404).json({
                    error: "Usuário não encontrado"
                });
            }
            res.status(200).json(new UserDto(userById));
        } catch (error) {
            console.error('Erro em getUserById:', error);
            res.status(500).json({
                error: "Erro ao buscar usuário",
                message: error.message
            });
        }
    }

    updateUser = async (req, res) => {
        try {
            const updateUser = await this.userService.updateUser(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updateUser) {
                return res.status(404).json({
                    error: "Usuário não encontrado"
                });
            }
            res.status(200).json({
                message: "Usuário atualizado com sucesso!",
                user: new UserDto(updateUser),
            });
        } catch (error) {
            console.error('Erro em updateUser:', error);
            res.status(500).json({
                error: "Erro ao atualizar usuário",
                message: error.message
            });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const deletedUser = await this.userService.deleteUser(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({
                    error: "Usuário não encontrado"
                });
            }
            res.status(200).json({
                message: "Usuário removido com sucesso!"
            });
        } catch (error) {
            console.error('Erro em deleteUser:', error);
            res.status(500).json({
                error: "Erro ao remover usuário",
                message: error.message
            });
        }
    }

    searchUserByName = async (req, res) => {
        try {
            const { name } = req.params;
            const users = await this.userService.searchUserByName(name);
            if (users.length === 0) {
                return res.status(404).json({
                    message: "Nenhum usuário encontrado com o nome informado.",
                    name: name,
                });
            }
            res.status(200).json(users.map((user) => new UserDto(user)));
        } catch (error) {
            console.error('Erro em searchUserByName:', error);
            res.status(500).json({
                error: "Erro ao buscar usuários",
                message: error.message
            });
        }
    }
}

export default new UserController();