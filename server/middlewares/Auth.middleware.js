import expressJwt from "express-jwt"

const AuthMiddleware = expressJwt({
    secret: "f1BtnWgD3VKY",
    algorithms: ["HS256"],
    credentialsRequired: false
  })


  export default AuthMiddleware;