module.exports = function (req,res,next) {
  if (req.session.role === 'user') {
    const error = "Admin only"
    res.redirect(`/?error=${error}`)
  } else next()
} 