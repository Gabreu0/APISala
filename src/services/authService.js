import { user } from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";

const { compare } = bcryptjs;

class AuthService {
    async login(dto) {
        try {
            const objUser = await user.findOne({
                email: dto.email,
            }).select("id email password");

            if (!objUser) {
                throw new Error("Usuário não cadastrado.");
            }
            const passwordMatch = await compare(dto.password, objUser.password);
            if (!passwordMatch) {
                throw new Error("Usuário ou senha inválido.");
            }
            const acessToken = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                jsonSecret.secret,
                {
                    expiresIn: 86400,
                }
            );
            return { acessToken };

        } catch (error) {
            throw new Error(error.message);
        }
    }
}
export default AuthService;