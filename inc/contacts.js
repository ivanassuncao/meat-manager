var conn = require('./db')

module.exports = {
    render(req,res,error,success){
        res.render('contacts',{ 
            title: 'Contato - Restaurante',
            background: 'images/img_bg_3.jpg',
            subtitle: 'Diga um Oi!',
            body: req.body,
            error,
            success
        })
    },

    save(fields){

        return new Promise((resolve,reject)=>{
                conn.query(`
                insert into tb_contacts (name,email,message)
                values(?,?,?)
            `,[
                fields.name,
                fields.email,
                fields.message
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