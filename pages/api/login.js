import cookie from 'cookie'
// import {cookies} from 'next/headers'
export default (req, res) => {
  const {token} = req.body
  const MAX_AGE = 24 * 60 * 60 * 1000 * 3
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: MAX_AGE,
      sameSite: 'strict',
      path: '/'
    })
  )
  res.statusCode = 200
  res.json({success: true})
  // cookies().set('name', 'value', { expires: Date.now() - oneDay })
}