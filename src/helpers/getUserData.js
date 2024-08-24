import jwt from "jsonwebtoken";

export const getDataUser = (request) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    if (!encodedToken) {
      throw new Error("Token not found in cookies");
    }
    const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET);
    return decodedToken.id;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    } else if (error.name === "TokenExpiredError") {
      throw new Error("Token expired");
    } else {
      throw new Error(`Authentication error: ${error.message}`);
    }
  }
};
