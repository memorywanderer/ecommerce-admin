import jwt from 'jsonwebtoken'
export const generateToken = (id) => {
  const token = jwt.sign(
    { id },
    process.env.JWT_SECRET
  )

  console.log('Generated token', token)
  return token
}

export const jwtProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from request
      token = req.headers.authorization.split(' ')[1]

      // Verify user by token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token and add to request
      req.user = await User.findById(decoded.id).select('-password')
    } catch (error) {
      console.error(error)
      res.status(400)
      throw new Error(`${error}, not authorized`)
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}

export const verifyJWT = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (error) {
    console.error(error)
    return null
  }
}