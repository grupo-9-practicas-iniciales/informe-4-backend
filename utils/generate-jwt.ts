import jwt from 'jsonwebtoken'

export const generateJWT = (idStudent = '') => {

    return new Promise((res, rej) => {
        const payload = { idStudent }


        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY || 'a',
            {
                expiresIn: '4h'
            }, (error, token) => {

                if (error) {
                    console.log(error)
                    rej('No se pudo generar el token')
                } else {
                    res(token)
                }

            }
        )
    })

}