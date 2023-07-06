const formatCurrency = require('../helpers/formatCurrency')
const {User, Profile, Dish, Reservation} = require('../models/index')
const bcrpyt =require('bcryptjs')


class Controller {

  static home(req,res) {
    res.render("Home")

  }

   static register(req,res) {
    res.render("Register")
  }

   static createUser(req,res) {

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
    let error
    res.render("Login",{error})
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
    User.findOne({
      where:{
        username : username
      }
    })
    .then((user)=>{
    
    const isCorrectPassword = bcrpyt.compareSync(password, user.password)
    if (isCorrectPassword){
      req.session.userId = user.id;//set userId ke session 
      return res.redirect('/')
    } else {
      let error = 'Invalid username/password'
      return res.redirect('login',{error})
    }
    })
    .catch((err)=>{
      console.log(err);
      res.send(err);
    })
  }

  static dishes (req,res) {
    Dish.findAll()
    .then((dataDish)=>{
      res.render("Dishes", {dataDish,formatCurrency})
    })
  }
  
  
}

module.exports = Controller