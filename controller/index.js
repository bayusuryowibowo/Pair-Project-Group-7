const {User, Profile, Dish, Reservation} = require('../models/index')

class Controller {

  static home(req,res) {
    res.send('home')

  }

   static register(req,res) {
    res.render("Register")
  }

   static createUser(req,res) {
    User.create(req.body)
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
      console.log(err);
      res.send(err);
    })
  }
}

module.exports = Controller