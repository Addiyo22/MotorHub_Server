 
const { expressjwt: jwt } = require("express-jwt");
 
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'payload', 
  getToken: getTokenFromHeaders
});
 
function getTokenFromHeaders (req) {
  
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
 
    const token = req.headers.authorization.split(" ")[1];
    return token;
  } 
  
  return null;
}

const checkAdmin = (req, res, next) => {
  if (req.payload && req.payload.isAdmin) {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

 
module.exports = {
  isAuthenticated, checkAdmin
}
