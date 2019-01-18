var express = require('express')
var router = express.Router()
var users = require('./../inc/users')
var admin = require('./../inc/admin')
var carMenus = require('./../inc/menus')
var moment = require('moment');
var reservations = require('./../inc/reservations')

moment.locale("pt-BR")

router.use(function(req,res,next){
  
    if(['/login'].indexOf(req.url) === -1 && !req.session.user){
        res.redirect("/admin/login")
    }else{
        next()
    }
})

router.use(function(req,res,next){

    req.menus = admin.getMenus(req)
    next()
})

router.get('/logout',function(req,res,next){
   delete req.session.user
   res.redirect('/admin/login')
})

router.get('/',function(req,res,next){

    admin.dashboard().then(data =>{
        res.render("admin/index",admin.getParams(req,{
            data
        }))
    }).catch(err=>{
        console.log(err)
    })

     
})

//login

router.post('/login',function(req,res,next){
    
      if(!req.body.email){
        users.render(req,res,'Preencha o campo email')
      }else if(!req.body.password){
        users.render(req,res,'Preencha o campo senha')
      }else{
        users.login(req.body.email,req.body.password).then(user=>{

            req.session.user = user

            res.redirect("/admin")

        }).catch(err=>{
          users.render(req,res,err.message || err)
        })
      } 
})

router.get('/login',function(req,res,next){
   
   // if(!req.session.views) req.session.views = 0
    users.render(req,res,null)
})

router.get('/contacts',function(req,res,next){
    res.render("admin/contacts",admin.getParams(req))
})

//MENUS

router.get('/menus',function(req,res,next){

    carMenus.getMenus().then(data=>{
        res.render("admin/menus",admin.getParams(req,{
            data
        }))
    }).catch(err=>{
        console.log(err)
    })

})

router.post('/menus',function(req,res,next){
   carMenus.save(req.fields,req.files).then(results=>{
       res.send(results)
   }).catch(err=>{
       res.send(err)
   })
})


router.delete('/menus/:id',function(req,res,next){
    carMenus.delete(req.params.id).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
 })

 //EMAIL

router.get('/emails',function(req,res,next){
    res.render("admin/emails",admin.getParams(req))
})

//RESERVATION

router.get('/reservations',function(req,res,next){
    reservations.getReservations().then(data=>{
        res.render("admin/reservations",admin.getParams(req,{
            data,
            date:{},
            moment
        }))
    })
   
})

router.post('/reservations',function(req,res,next){
    reservations.save(req.fields).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
 })
 
 router.delete('/reservations/:id',function(req,res,next){
    reservations.delete(req.params.id).then(results=>{
         res.send(results)
     }).catch(err=>{
         res.send(err)
     })
  })

//USER

router.get('/users',function(req,res,next){
    res.render("admin/users",admin.getParams(req))
})

module.exports = router