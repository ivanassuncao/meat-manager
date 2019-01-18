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

        let query, queryPhoto = '' ,params = [
                                fields.title,
                                fields.description,
                                fields.price

                            ]

        if(files.photo){
            queryPhoto =  ',photo = ?'

            params.push(  fields.photo)
        }                    

        if(parseInt(fields.id) > 0)
        {
            params.push(  fields.id)

            query = `
                update tb_menus
                    set title = ?,
                    description = ?,
                    price = ?,
                    ${queryPhoto}
                where id = ?
            `,params
        }
        else
        {

            if(!files.photo){
                reject('Envie a foto...')
            }

            query = `
            insert into tb_menus(title,description,price ${queryPhoto})
            values(?,?,?,?)
            `,params
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