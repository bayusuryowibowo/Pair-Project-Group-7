const formatCurrency = require('../helpers/formatCurrency')
const {User, Profile, Dish, Reservation} = require('../models/index')


class Controller {

  static home(req,res) {
    res.render("Home")

  }

   static register(req,res) {
    res.render("Register")
  }

   static createUser(req,res) {
    console.log(req.body)
    User.create(req.body)
    .then(()=>{
      res.redirect('/')
    })
    .catch((err)=>{
      console.log(err);
        if (err.name === 'SequelizeValidationError'||
        err.name ==="SequelizeUniqueConstraintError") {
          return res.send(err.errors.map((el) => el.message));
        }
      res.send(err);
    })
  }

  static login (req,res) {
    res.render("Login")
  }

 static postLogin (req,res) {
    const {username, password} = req.body
    if (!username) {
      let error = `Username is required`;
      res.render('Login',{error})
    }
     if (!password) {
      let error = `Password is required`;
      res.render('Login',{error})
    }
    console.log()
  }

  static dishes (req,res) {
    Dish.findAll()
    .then((dataDish)=>{
      res.render("Dishes", {dataDish,formatCurrency})
    })
  }
  
  
}

module.exports = Controller