import ApiError from "../../error/ApiError.js";
import { createAdmin } from "../../helper/createExamples.js";
import { User } from "../../db/models/models.js";
import bcrypt from "bcrypt";
import UsersService from "../services/UsersService.js";
import JwtService from "../services/JwtService.js";

class UserController {
  async registration(req, res, next) {
    const { name, tel, password } = req.body || {};

    try {
      const user = await UsersService.createUser(name, tel, password);

      const token = JwtService.generateJwt(user);
      JwtService.sendCookieToken(res, token);

      res.status(201).json({
        status: "success",
        message: "Register successful",
        data: {
          user: {
            id: user.id,
            name: user.name,
            tel: user.tel,
            role: user.role,
          },
        },
      });
    } catch (e) {
      console.error(`Error while creating user: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async registrationExampleOwner(req, res, next) {
    try {
      let user = createAdmin();
      user.password = await bcrypt.hash(String(user.password), 5);

      const candidate = await User.findOne({ where: { tel: user.tel } });
      if (candidate) {
        return next(ApiError.badRequest("This telephone is already in use"));
      }

      user.role = "OWNER";
      await User.create(user);

      res.status(201).json({
        status: "success",
        message: "Register successful",
        data: {
          user: {
            id: user.id,
            name: user.name,
            tel: user.tel,
            role: user.role,
          },
        },
      });
    } catch (e) {
      console.error(e.message);
      return next(ApiError.internal(e.message));
    }
  }

  async registrationAdmin(req, res, next) {
    const { name, tel, password } = req.body || {};

    try {
      const user = await UsersService.createAdmin(name, tel, password);

      const token = JwtService.generateJwt(req.user);
      JwtService.sendCookieToken(res, token);

      res.status(201).json({
        status: "success",
        message: "Register successful",
        data: {
          user: {
            id: user.id,
            name: user.name,
            tel: user.tel,
            role: user.role,
          },
        },
      });
    } catch (e) {
      console.error(`Error while creating admin: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async registrationUser(req, res, next) {
    const { name, tel, password } = req.body || {};

    try {
      const user = await UsersService.createUser(name, tel, password);

      const token = JwtService.generateJwt(req.user);
      JwtService.sendCookieToken(res, token);

      res.status(201).json({
        status: "success",
        message: "Register successful",
        data: {
          user: {
            id: user.id,
            name: user.name,
            tel: user.tel,
            role: user.role,
          },
        },
      });
    } catch (e) {
      console.error(`Error while creating user: ${e}, ${e.message}`);
      return next(e);
    }
  }

  async login(req, res, next) {
    const { tel, password } = req.body || {};

    try {
      const user = await UsersService.findUserByTel(tel);
      if (!user) {
        return next(ApiError.badRequest("User was not found", "tel", "body"));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(
          ApiError.badRequest("Incorrect password", "password", "body"),
        );
      }

      const token = JwtService.generateJwt(user);
      JwtService.sendCookieToken(res, token);

      return res.json({
        status: "success",
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            name: user.name,
            tel: user.tel,
            role: user.role,
          },
        },
      });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  async check(req, res, next) {
    const cookieUser = req.user;

    try {
      if (
        !cookieUser ||
        !cookieUser.id ||
        !cookieUser.tel ||
        !cookieUser.name
      ) {
        console.log(`Cookie user: ${cookieUser}`);
        JwtService.clearCookie(res);
        return next(
          ApiError.badRequest("User hasn't parsed", "cookie", "DataBase"),
        );
      }

      const user = await User.findByPk(cookieUser.id);
      if (!user) {
        JwtService.clearCookie(res);
        return next(
          ApiError.notFound("User wasn't found", "cookie", "DataBase"),
        );
      }

      console.log(
        `User check request. \nUser: id:${user.id} name:${user.name} tel:${user.tel} role:${user.role}`,
      );
      const token = JwtService.generateJwt(user);
      JwtService.sendCookieToken(res, token);

      return res.json({
        status: "success",
        message: "Check successful",
        data: {
          user: {
            id: user.id,
            name: user.name,
            tel: user.tel,
            role: user.role,
          },
        },
      });
    } catch (e) {
      console.error(`Error while checking user: ${e}, ${e.message}`);
      next(e);
    }
  }

  async logout(req, res, next) {
    JwtService.clearCookie(res);

    return res.status(204).json({
      status: "success",
      message: "Logout successful",
    });
  }

  async getAll(req, res, next) {
    try {
      const users = await UsersService.findAllUsers();

      const token = JwtService.generateJwt(req.user);
      JwtService.sendCookieToken(res, token);

      return res.status(200).json({
        status: "success",
        message: "Getting all users successful",
        data: { users: users },
      });
    } catch (e) {
      console.error(e.message);
      return next(e);
    }
  }

  async getAllAdmins(req, res, next) {
    const user = req.user;

    try {
      const admins = await UsersService.findAllAdmins();

      const token = JwtService.generateJwt(user);
      JwtService.sendCookieToken(res, token);

      return res.status(200).json({
        status: "success",
        message: "Getting all admins successful",
        data: {
          admins: admins,
        },
      });
    } catch (e) {
      console.error(e.message);
      return next(e);
    }
    l;
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await UsersService.deleteUser(id);

      const token = JwtService.generateJwt(req.user);
      JwtService.sendCookieToken(res, token);

      return res.status(204).json({
        status: "success",
        message: "Delete user successful",
      });
    } catch (e) {
      console.error(e.message);
      return next(e);
    }
  }

  async deleteAdmin(req, res, next) {
    const { id } = req.params;

    try {
      await UsersService.deleteAdmin(id);

      const token = JwtService.generateJwt(req.user);
      JwtService.sendCookieToken(res, token);

      return res.status(204).json({
        status: "success",
        message: "Delete admin successful",
      });
    } catch (e) {
      console.error(e.message);
      return next(e);
    }
  }
}

export default new UserController();
