import bcrypt from "bcrypt";
import ApiError from "../../error/ApiError.js";
import { User } from "../../db/models/models.js";

class UsersService {
  async findAllUsers() {
    const users = await User.findAll({
      where: { role: "USER" },
    });
    if (!users.length) {
      return [];
    }

    const usersSafeData = users.map((user) => ({
      id: user.id,
      name: user.name,
      tel: user.tel,
      role: user.role,
    }));

    return usersSafeData;
  }

  async findAllAdmins() {
    const admins = await User.findAll({
      where: { role: "ADMIN" },
    });
    if (!admins.length) {
      return [];
    }

    const adminsSafeData = admins.map((admin) => ({
      id: admin.id,
      name: admin.name,
      tel: admin.tel,
      role: admin.role,
    }));

    return adminsSafeData;
  }

  async findUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw ApiError.notFound("User wasn't found");
    }

    return { id: user.id, name: user.name, tel: user.tel, role: user.role };
  }

  async findUserByTel(tel) {
    const user = await User.findOne({ where: { tel } });
    return user;
  }

  async createUser(name, tel, password) {
    const hashedPassword = await bcrypt.hash(String(password), 10);
    const [user, isCreated] = await User.findOrCreate({
      where: { tel },
      defaults: { name, tel, password: hashedPassword },
    });
    if (!isCreated) {
      throw ApiError.badRequest("This telephone already in use", "tel", "body");
    }

    return {
      id: user.id,
      name: user.name,
      tel: user.tel,
      role: user.role,
    };
  }

  async createAdmin(name, tel, password) {
    const candidate = this.findUserByTel(tel);
    if (candidate) {
      throw ApiError.badRequest(
        "This telephone is already in use",
        "tel",
        "body",
      );
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const user = await User.create({
      name: name,
      tel: tel,
      password: hashedPassword,
      role: "ADMIN",
    });
    if (!user) {
      throw ApiError.internal("Error while creating user");
    }

    return { id: user.id, name: user.name, tel: user.tel, role: user.role };
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return next(ApiError.badRequest("User not found", "id", "body"));
    }
    if (user.role === "ADMIN") {
      return next(ApiError.badRequest("User is Admin", "role", "body"));
    }

    await user.destroy();
  }

  async deleteAdmin(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return next(ApiError.badRequest("User not found", "id", "body"));
    }
    if (user.role !== "ADMIN") {
      return next(ApiError.badRequest("User isn't Admin", "role", "body"));
    }

    await user.destroy();
  }
}

export default new UsersService();
