import jwt from 'jsonwebtoken'



const authentication = (req, res,next) => {

    const { token } = req.cookies
    // console.log(token)
    try {
        var decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        res.redirect("/login")
    }
        

}
export default authentication;