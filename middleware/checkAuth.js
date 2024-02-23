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
    const decoded = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Store the decoded token in the request object

    console.log("Token verified successfully.");
    next();
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
