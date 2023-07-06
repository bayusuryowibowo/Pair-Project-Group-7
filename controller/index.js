const formatCurrency = require('../helpers/formatCurrency')
const {User, Profile, Dish, Reservation} = require('../models/index')
formatCurrency

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
        if (err.name === 'SequelizeValidationError') {
          return res.send(err.errors.map((el) => el.message));
        }
      res.send(err);
    })
  }

  static login (req,res) {
    res.render("Login")
  }

 static postLogin (req,res) {
    console.log(req.body)
  }

  static dishes (req,res) {
    Dish.findAll()
    .then((dataDish)=>{
      res.render("Dishes", {dataDish,formatCurrency})
    })
  }
  
  
}

module.exports = Controller