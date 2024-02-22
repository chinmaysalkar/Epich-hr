const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    // Extract the token from the request 
    const token =
      req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
      return res.status(403).json({
        success: false,
        msg: "A token is required for authentication",
      });
    }

    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    // Verify the token
    const decoded = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);

    console.log("Token verified successfully. Decoded payload:", decoded);
    next(); // Continue to the next middleware

  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "Invalid token",
    });
  }
};



module.exports = {
  verifyToken,
};
