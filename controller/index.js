
const formatCurrency = require('../helpers/formatCurrency')
const { User, Profile, Dish, Reservation } = require('../models/index')
const bcrpyt = require('bcryptjs')



class Controller {
  static home(req,res) {
    const role = req.session.role
    res.render('Home',{role})
  }
  static register(req, res) {
    res.render("Register")
  }
  static createUser(req, res) {
    User.create(req.body)
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        console.log(err);
        if (err.name === 'SequelizeValidationError' ||
          err.name === "SequelizeUniqueConstraintError") {
          return res.send(err.errors.map((el) => el.message));
        }
        res.send(err);
      })
  }


  static login (req,res) {
    let {error} = req.query;
    res.render("Login",{error})

  }

  static postLogin(req, res) {
    const { username, password } = req.body
    if (!username) {
      let error = `Username is required`;

      res.redirect(`/login?error=${error}`)

    }
    if (!password) {
      let error = `Password is required`;

      res.redirect(`/login?error=${error}`)

    }
    User.findOne({
      where: {
        username: username
      }
    })

    .then((user)=>{
    const isCorrectPassword = bcrpyt.compareSync(password, user.password)
    if (isCorrectPassword){
      req.session.userId = user.id;//set userId ke session 
      req.session.role = user.role;//set role ke session
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

  static dishes(req, res) {
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
    const msg = req.query.msg
    Dish.findAll()
    .then((dataDish)=>{
      res.render("Reservation", {dataDish,msg})
    })
    .catch ((err)=>{
      console.log(err);
      res.send(err);
    })
  }

   static postReservation(req,res) {
    const {date, tableNumber,DishId} = req.body
    const UserId = req.session.userId
    let totalPrice
    Dish.findOne({
      where:{
        id:DishId
      }
    })
    .then((data)=>{
      totalPrice = data.price;
      console.log(date,tableNumber,DishId,totalPrice)
    return Reservation.create({date,tableNumber,totalPrice,DishId,UserId})
    })
    .then(()=>{
      res.redirect('/reservation?msg=ReservationAdded')
    })
    .catch((err)=>{
      console.log(err);
      res.send(err);
    })

  }

  static dataReservation(req,res) {
    res.render('secretReservation')


  }


}

module.exports = Controller