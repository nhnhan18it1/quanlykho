module.exports = {
    add: (con,objnv,callback)=>{
        con.query("INSERT INTO nhanvien(name,dob,photo,notes) VALUES()",[objnv.name,objnv.dob,objnv.photo,objnv.notes],
        (err,rs,field)=>{
            if(err){
                callback(false)
                throw err
            }
            callback(true)
        }
        )
    },
    delete: (con,objnv,callback)=>{
        con.query("DELETE nhanvien WHERE id = ?",[objnv.id],(err,rs,field)=>{
            if(err){
                callback(false)
                throw err
            }
            callback(true)
        })
    },
    update: (con,objnv,callback)=>{
        con.query("UPDATE nhanvien SET name = ? , dob = ? , photo = ? , notes = ? WHERE id = ?",[
            objnv.name,
            objnv.dob,
            objnv.photo,
            objnv.notes,
            objnv.id,
        ],(err,rs,field)=>{
            if(err){
                callback(false)
                throw err
            }
            callback(true)
        })
    },
}