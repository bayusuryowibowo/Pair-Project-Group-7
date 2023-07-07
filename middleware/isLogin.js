module.exports = function (req,res,next) {
  if (!req.session.userId) {
    const error = "Please login"
    res.redirect(`/login/?error=${error}`)
  } else next()
} 