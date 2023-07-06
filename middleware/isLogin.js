module.exports = function (req,res,next) {
  if (!req.session.userId) {
    let error = "Please login"
    res.redirect(`/login/?error=${error}`)
  } else next()
} 