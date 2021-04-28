import jwt from 'jsonwebtoken'

class Token {
    generate (params = {})
    {
        if (process.env.SECRET_KEY)
        {
            return jwt.sign(params, process.env.SECRET_KEY, {
                expiresIn: 86400
            })
        }
        else 
        {
            return undefined
        }
    }
}

export default new Token