var conn = require('./db')

module.exports = {
    render(req,res,error,success){
        res.render('reservations',{ 
            title: 'Reservas - Restaurante',
            background: 'images/img_bg_2.jpg',
            subtitle: 'Reserve uma Mesa!',
            body: req.body,
            error,
            success
        })
    },

    save(fields){

        let date = fields.date.split('/')

        fields.date = `${date[2]}-${date[1]}-${date[0]}`

        return new Promise((resolve,reject)=>{
                conn.query(`
                insert into tb_reservations (name,email,people,date,time)
                values(?,?,?,?,?)
            `,[
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ],
            (err,results)=>{
                if(err){
                    reject(err)
                }else(
                    resolve(results)
                )
            })

        })
    }
}