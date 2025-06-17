import { BaseRepository } from "./baseRepository.js";
import { user } from "../models/User.js";

export class UserRepository extends BaseRepository {
    constructor() {
        super(user);
    }

    async searchByName(name) {
        return await this.model.find({
            name: { $regex: name, $options: "i" },
        });
    }
    
    async findByEmail(email) {
        return await this.model.findOne({ email });
    }
}