module.exports = function (req,res,next) {
  if (req.session.role === 'user') {
    let error = "Admin only"
    res.redirect(`/?error=${error}`)
  } else next()
} 