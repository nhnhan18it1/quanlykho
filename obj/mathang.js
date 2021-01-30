module.exports = {
    add: (con, objmathang, callback) => {
        con.query("INSERT INTO mathang(name_sp,hangSx,idNCC,donGia,notes,soluong) VALUES(?,?,?,?,?,?)",
        [objmathang.name_sp,objmathang.hangsx,objmathang.idNCC,objmathang.donGia,objmathang.notes,0],
            (err, rs, field)=> {
            if (err) {
                callback(false)
                throw err
            }
            callback(true)
        }
        )
    },
    
}