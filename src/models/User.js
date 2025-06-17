import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome do usuário é obrigatório"]
    },
    email: {
        type: String,
        required: [true, "E-mail do usuário é obrigatório"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Senha do usuário é obrigatório"]
    },
},
    {
        versionKey: false,
        timestamps: true
    });

const user = mongoose.model("users", userSchema);
export { user, userSchema };