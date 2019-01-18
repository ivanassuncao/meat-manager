var conn = require('./db')
var path = require('path') 


module.exports = {
    getMenus(){
        return new Promise((resolve,reject)=>{
            conn.query(`
            select * from tb_menus order by title
          `,(err,results) =>{
            if(err){
              reject(err)
            }else{
                resolve(results)
            }
          })
        })
    },
    save(fields,files){

        fields.photo = `images/${path.parse(files.photo.path).base}`

        let query, params

        if(parseInt(fields.id) > 0)
        {
            query = `
                update tb_menus
                    set title = ?,
                    description = ?,
                    price = ?,
                    photo = ?
                where id = ?
            `
            params = [
                    fields.title,
                    fields.description,
                    fields.price,
                    fields.photo,
                    fields.id
                ]
        }
        else
        {
            query = `
            insert into tb_menus(title,description,price,photo)
            values(?,?,?,?)
            `
            params = [
                fields.title,
                fields.description,
                fields.price,
                fields.photo
            ]
        }

        return new Promise((resolve,reject)=>{
            conn.query(query,params,(err,results)=>{
                if(err){
                    reject(err)
                }else
                {
                    resolve(results)
                }
            })
        })

    }
}