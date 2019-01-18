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
    getReservations(){
        return new Promise((resolve,reject)=>{
            conn.query(`
            select * from tb_reservations order by date desc
          `,(err,results) =>{
            if(err){
              reject(err)
            }else{
                resolve(results)
            }
          })
        })
    },
    save(fields){
        return new Promise((resolve,reject)=>{

        if(fields.date.indexOf('/') > -1 )
        {
            let date = fields.date.split('/')

            fields.date = `${date[2]}-${date[1]}-${date[0]}`
        }            

        let query,params = [
                        fields.name,
                        fields.email,
                        fields.people,
                        fields.date,
                        fields.time
                ];


        if(parseInt(fields.id) > 0)
            {
                params.push(fields.id)

                query = `
                update tb_reservations 
                set name = ?,
                    email = ?,
                    people = ?,
                    date = ?,
                    time = ?
                where id = ?  
                `;
            }
            else
            {
                    query = `
                    insert into tb_reservations (name,email,people,date,time)
                    values(?,?,?,?,?)
                    `;
            }

    
        conn.query(query,params,
            (err,results)=>{
                if(err){
                    reject(err)
                }else(
                    resolve(results)
                )
            })

        })
    },
    delete(id){

        return new Promise((resolve,reject)=>{

            conn.query(`
                DELETE FROM tb_reservations
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