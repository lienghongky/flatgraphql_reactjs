import jwt  from "jsonwebtoken";

 class JWTUtil {

   static signToken(user){

        return jwt.sign(
                        { "user": {user}},
                        "f1BtnWgD3VKY",
                        { algorithm: "HS256", subject: "1", expiresIn: "1d" }
                    ); 
    }

}
export default JWTUtil;