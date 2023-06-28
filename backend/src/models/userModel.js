const db = require('../../config/database')

const findAll = () => {
    return db
        .query('select * from user')
        .then(([data]) => {
            return data
        })
        .catch((err) => {
            console.error('err', err)
        })
}

const findByMail = (mail) => {
    return db
        .query("select * from user where mail = ?", [mail])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const modifyOneUser = (user, userId) => {
    return db
        .query('update user set ? where id = ?', [user, userId])
        .then(([result])=>{
            return result
        })
        .catch((err)=>{
            console.error('err', err)
        })
}

const findOneUser = (id) => {
    return db
        .query('select * from user where id = ?', [id])
        .then(([data]) => {
            return data
        })
        .catch((err) => {
            console.error('err', err)
        })
}


const addUser = (user) => {
    const { role, firstname , lastname, email, location, password} = user
    return db 
        .query("insert into user (role, firstname , lastname, email, location, ) values (?, ?, ?, ?, ?, ?, ?)",
        [role, firstname , lastname, email, location, password])
        .then(([data]) => {
            return { id: data.insertId, ...user}
        })
       
}


const removeUser = (id) => {
    return db
        .execute("delete from user Where id = ? ",[id])
        .then(([data]) => data )
        .catch((err) => {
        console.error(err)
            })
}

module.exports = { findAll, findOneUser, addUser,removeUser, modifyOneUser, findByMail}

