module.exports = {
    add: (con,objCus,callback)=>{
        con.query("INSERT INTO khachhang(ten,diachi,email,phone) VALUES(?,?,?,?)",[objCus.ten,objCus.diachi,objCus.email,objCus.phone],(err,rs,field)=>{
            if (err) {
                callback(false)
                throw err
            }
            callback(true)
        })
    },
    update: (con,objCus,callback)=>{
        con.query("UPDATE khachhang SET ten = ? , diachi = ? , email = ? , phone = ? WHERE id = ?",[
            objCus.ten,
            objCus.diachi,
            objCus.email,
            objCus.phone
        ],(err,rs,field)=>{
            if (err) {
                callback(false)
                throw err
            }
            callback(true)
        })
    },
    delete: (con,objCus,callback)=>{
        con.query("DELETE khachhang WHERE id = ?",[objCus.ID],(err,rs,field)=>{
            if (err) {
                callback(false)
                throw err
            }
            callback(true)
        })
    },
    getAll: (con,callback)=>{
        con.query("SELECT * FROM khachhang",[],(err,rs,field)=>{
            if (err) {
                callback(null)
                throw err
            }
            callback(rs)
        })
    }
}