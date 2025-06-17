import { UserRepository } from "../repositories/userRepository.js";
import { UserDto } from "../dtos/userDto.js";
import bcrypt from "bcryptjs";

const { hash } = bcrypt;

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    register = async(userData) => {
        console.log('=== DEBUG: UserService.register - dados recebidos ===');
        console.log('userData:', userData);

        // Validação dos dados de entrada
        if (!userData.name || !userData.email || !userData.password) {
            console.log('=== DEBUG: Dados inválidos ===');
            console.log('name:', userData.name);
            console.log('email:', userData.email);
            console.log('password:', userData.password ? 'presente' : 'ausente');
            throw new Error("Dados obrigatórios ausentes: nome, email e senha são obrigatórios");
        }

        // Verificar se o usuário já existe
        const userExists = await this.userRepository.findByEmail(userData.email);
        if (userExists) {
            throw new Error("Usuário já cadastrado!");
        }

        console.log('=== DEBUG: Fazendo hash da senha ===');
        
        // Garantir que a senha é uma string
        const passwordString = String(userData.password);
        const passwordHash = await hash(passwordString, 8);
        
        console.log('=== DEBUG: Hash concluído ===');

        const userToCreate = {
            name: userData.name,
            email: userData.email,
            password: passwordHash,
        };

        console.log('=== DEBUG: Criando usuário no banco ===');
        const createdUser = await this.userRepository.create(userToCreate);
        console.log('=== DEBUG: Usuário criado com sucesso ===');
        
        return new UserDto(createdUser);
    }

    getAllUsers = async () => {
        return await this.userRepository.findAll();
    }

    getUserById = async (id) => {
        const foundUser = await this.userRepository.findById(id);
        if (!foundUser) {
            throw new Error("Usuário não encontrado.");
        }
        return foundUser;
    }

    updateUser = async (id, userData) => {
        const updateUser = await this.userRepository.update(id, userData);

        if (!updateUser) {
            throw new Error("Usuário não encontrado.");
        }
        return updateUser;
    }

    deleteUser = async (id) => {
        const deletedUser = await this.userRepository.delete(id);
        if (!deletedUser) {
            throw new Error("Usuário não encontrado.");
        }
        return deletedUser;
    }

    searchUserByName = async (name) => {
        if (!name || name.trim() === "") {
            throw new Error("Informar o nome do Usuário para busca.");
        }
        return await this.userRepository.searchByName(name);
    }
}