import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  console.log(bearer);
  if (bearer.startsWith("Bearer ")) {
    const bearerToken = bearer.split("Bearer ")[1];

    if (!bearerToken) {
      return next(createError(401, "No token, Authorization denied!"));
    } else {
      const token = bearerToken;

      jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) {
          return next(createError(403, "Token is not valid!"));
        }

        req.userId = payload.user.id;
        req.isSeller = payload.user.isSeller;
        next();
      });
    }
  }
};

// import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

// export const verifyToken = async (req, res, next) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     return next(createError(401, "You are not authenticated!"));
//   }

//   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//     if (err) {
//       return next(createError(403, "Token is not valid!"));
//     }
//     req.userId = payload.id;
//     req.isSeller = payload.isSeller;
//     next();
//   });
// };
