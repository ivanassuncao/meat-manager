var express = require('express');
var router = express.Router();
var conn = require('./../inc/db')
var menus = require('./../inc/menus')
var reservations = require('./../inc/reservations')
var contacts = require('./../inc/contacts')

/* GET home page. */
router.get('/', function(req, res, next) {
  menus.getMenus().then(results =>{
    res.render('index',{
      title: 'Meu Restaurante',
      menus: results,
      isHome: true
    })
  })
})

//contacts

router.get('/contacts',function(req,res,next){
  contacts.render(req,res)
})


router.post('/contacts',function(req,res,next){

  if(!req.body.name){
    contacts.render(req,res,'Digite o nome')
  }else if(!req.body.email){
    contacts.render(req,res,'Digite o email')
  }else if(!req.body.message){
    contacts.render(req,res,'Digite uma menssagem')
  }else{
    contacts.save(req.body).then(results=>{

      req.body = {}

      contacts.render(req,res,null,'Contato enviado com sucesso!')
    }).catch(err=>{
      contacts.render(req,res,err.message)
    })
  } 

  //res.send(req.body) retorno do json

})

//Menus

router.get('/menus',function(req,res,next){
  menus.getMenus().then(results =>{
  res.render('menus',{ 
    title: 'Menus - Restaurante',
    background: 'images/img_bg_1.jpg',
    subtitle: 'Saboreie nosso menu!',
    menus: results
})
  })
})

//reservation

router.get('/reservations',function(req,res,next){

  reservations.render(req,res)
})

router.post('/reservations',function(req,res,next){

  if(!req.body.name){
    reservations.render(req,res,'Digite o nome')
  }else if(!req.body.email){
    reservations.render(req,res,'Digite o email')
  }else if(!req.body.people){
    reservations.render(req,res,'Digite a quantidade de pessoas')
  }else if(!req.body.date){
    reservations.render(req,res,'Digite a data da reserva')
  }else if(!req.body.time){
    reservations.render(req,res,'Digite a hora da reserva')
  }else{
    reservations.save(req.body).then(results=>{

      req.body = {}

      reservations.render(req,res,null,'Reserva realizada com sucesso!')
    }).catch(err=>{
      reservations.render(req,res,err.message)
    })
  } 

  //res.send(req.body) retorno do json

})

router.get('/services',function(req,res,next){
  res.render('services',{ 
    title: 'Serviços - Restaurante',
    background: 'images/img_bg_1.jpg',
    subtitle: 'É um prazer poder servir!'
})
})

module.exports = router;
