import db from "../../database/index.js";

export default class UsersRepository {
  constructor() {
    this.db = db;
  }

  async getUsers() {
    const allUsers = await this.db.query("SELECT * FROM users");

    return allUsers;
  }

  async getUserById(id) {
    const user = await this.db.oneOrNone("SELECT * FROM users WHERE id = $1", 
    id
    );

    return user;
  }

   async getUserByEmail(email) {
    const user = await this.db.oneOrNone("SELECT * FROM users WHERE email = $1", 
    email
    );

    return user;
  }

  async createUser(user) {
    await this.db.none(
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)",
      [user.id, user.name, user.email, user.password]
    );
  }

  async updateUser(id, name, email, password) {
   const updateUser = await this.db.one(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    );

    return updateUser;
  }

  async deleteUser(id) {
    await this.db.none("DELETE FROM users WHERE id = $1", id);
  }
}
