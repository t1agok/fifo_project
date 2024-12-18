const express = require("express");
const db = require("../models");
const User = db.User;

//check if username or email already exist in the database
const saveUser = async (req, res, next) => {
    try {
        const username = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (username) {
            return res.json(409).send("username already taken");
        }

        const email = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (email) {
            return res.json(409).send("email already taken");
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    saveUser,
};