
const { Store } = require('express-session')
const formatCurrency = require('../helpers/formatCurrency')
const {User, Profile, Dish, Reservation} = require('../models/index')
const bcrpyt =require('bcryptjs')
const session = require('express-session')


class Controller {

  static home(req,res) {
    res.render('Home')
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
    let {error} = req.query;
    res.render("Login",{error})
  }

 static postLogin (req,res) {
    const {username, password} = req.body
    if (!username) {
      let error = `Username is required`;
      res.redirect(`/login?error=${error}`)
    }
     if (!password) {
      let error = `Password is required`;
      res.redirect(`/login?error=${error}`)
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
      return res.redirect(`/login?error=${error}`)
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
    .catch ((err)=>{
      console.log(err);
      res.send(err);
    })
  }

   static logout (req,res) {
    req.session.destroy((err)=>{
      if(err){
        console.log(err);
        res.send(err)
      } else res.redirect('/')
    })
  }
  
  
  static reservation (req,res) {
    res.render('Reservation')

  }
  
  
}

module.exports = Controller