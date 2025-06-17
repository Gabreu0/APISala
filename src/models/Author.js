import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    // id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: [true, "Nome do autor é obrigatório"]
    },
    email: {
        type: String,
        required: [true, "E-mail do autor é obrigatório"]
    },
},
    {
        versionKey: false,
        timestamps: true
    });

const author = mongoose.model("authors", authorSchema);
export { author, authorSchema };