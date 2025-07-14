import jwt from 'jsonwebtoken'

const isAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    req.id = decoded.id;
    next();
  } catch (error) {
    console.error("JWT Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

export default isAuthentication;
