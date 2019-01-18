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

        return new Promise((resolve,reject)=>{

            fields.photo = `images/${path.parse(files.photo.path).base}`

            let query,queryPhoto = '',params = [
                            fields.title,
                            fields.description,
                            fields.price
                                ];

            if(files.photo.name)
            {
                queryPhoto =  ',photo = ?'

                params.push(fields.photo)
            }                    

            if(parseInt(fields.id) > 0)
            {
                params.push(fields.id)

                query = `
                    update tb_menus
                        set title = ?,
                        description = ?,
                        price = ?
                        ${queryPhoto}
                    where id = ?
                `;
            }
            else
            {

                if(!files.photo.name){
                    reject('Envie a foto do menu...')
                }
                else
                {
                    query = `
                    insert into tb_menus(title,description,price,photo)
                    values(?,?,?,?)
                    `;
                }
              
            }

        
                conn.query(query,params,(err,results)=>{

                    if(err){
                        reject(err)
                    }else
                    {
                        resolve(results)
                    }
                })
            })

    },
    delete(id){

        return new Promise((resolve,reject)=>{

            conn.query(`
                DELETE FROM tb_menus
                WHERE id = ?
            `,[id],(err,results)=>{

                if(err){
                    reject(err)
                }else
                {
                    resolve(results)
                }
            }
            )
        })

    }
}