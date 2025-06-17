export class UserDto {
    constructor(user) {
        this.id = user._id || user.id;
        this.nome = user.name || user.nome; // Aceita ambos os formatos
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        // Não expor senha no DTO de resposta
    }

    static fromRequest(body) {
        // Aceita tanto o formato português quanto inglês
        return {
            name: body.nome || body.name, // Prioriza 'nome' (português)
            email: body.email,
            password: body.senha || body.password // Prioriza 'senha' (português)
        };
    }
}