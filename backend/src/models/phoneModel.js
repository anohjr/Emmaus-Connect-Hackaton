const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from phone")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const findOne = (id) => {
    return db
        .execute("select * from phone where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createPhone = (phone) => {
    const { brand, modele, storage, memory, color, year, replacement_value} = phone;
    return db
        .execute("insert into phone (brand, modele, storage, memory, color, year, replacement_value) values (?, ?, ?, ?, ?, ?, ?)",
        [brand, modele, storage, memory, color, year, replacement_value])
        .then(([data]) => {
            return { id: data.insertId, ...phone };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

const removePhone = (id) => {
    return db
        .execute("delete from phone where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const modifyPhone = (user, id) => {
    return db
        .query("update phone set ? where id = ?", [phone, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

module.exports = { findAll, findOne, createPhone, removePhone, modifyPhone };