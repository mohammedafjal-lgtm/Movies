import jwt from "jsonwebtoken";

export function isAuthenticated(req) {
  const authHeader =
    req.headers.get("authorization") || req.headers.authorization;
  if (!authHeader) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized: No token provided",
    };
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized: Malformed token",
    };
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

    if (!decoded.userId) {
      return {
        success: false,
        status: 401,
        message: "Token error: user unauthorized",
      };
    }

    return { success: true, userId: decoded.userId, decoded };
  } catch (err) {
    return { success: false, status: 401, message: "Invalid or expired token" };
  }
}
