import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        
        if (!authHeader) {
            return res.status(401).json({ 
                error: true, 
                msg: "No se proporcionó token de autenticación" 
            })
        }

        const token = authHeader.split(" ")[1]
        
        if (!token) {
            return res.status(401).json({ 
                error: true, 
                msg: "Token inválido" 
            })
        }

        const verified = jwt.verify(token, process.env.SECRET)
        
        if (!verified) {
            return res.status(401).json({ 
                error: true, 
                msg: "Token no válido" 
            })
        }

        req.user = verified
        next()
    } catch (err) {
        return res.status(401).json({ 
            error: true, 
            msg: "Token expirado o inválido" 
        })
    }
}
