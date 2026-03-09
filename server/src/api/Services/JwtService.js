import jwt from "jsonwebtoken";

class JwtService {
  generateJwt({ id, name, tel, role }) {
    return jwt.sign({ id, name, tel, role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  }

  sendCookieToken(res, token) {
    return res.cookie("jwt", token, {
      httpOnly: true, // нельзя прочитать из JS
      secure: true, // только по HTTPS
      sameSite: "strict", // защита от CSRF
      maxAge: 60 * 60 * 1000, // срок жизни куки (1 час)
    });
  }

  clearCookie(res) {
    return res.clearCookie("jwt", {
      httpOnly: true,
      secure: true, // только по HTTPS
      sameSite: "strict",
      path: "/",
    });
  }
}

export default new JwtService();
