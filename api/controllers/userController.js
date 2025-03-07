const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.User;

//signup
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res, next) => {
    try {
        const { username, email, password, full_name, role } = req.body;
        const data = {
            username,
            password: await bcrypt.hash(password, 10),
            email,
            full_name,
            role
        };

        //saving the user
        const user = await User.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = jwt.sign({ user_id: user.user_id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60,
            });
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
            //console.log("user", JSON.stringify(user, null, 2));
            //console.log(token);

            //send users details
            return res.status(201).json({ success: true, user });

        } else {
            return res.status(409).json({ success: false, message: "Details are not correct" });
        }

    } catch(error) {
        next(error);
    }
}

//login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        //if user email exists, then compare password with bcrypt
        if (user) {
            const isEqual = await bcrypt.compare(password, user.password);
            //console.log(`Password comparison result: ${isEqual}`);

            //if passwords match, gen the token with the user id and the secretKey in the env file
            if (isEqual) {
                const payload = {
                    user_id: user.user_id,
                    username: user.username, // Include other user details if needed
                    email: user.email // Optional
                };

                const token = jwt.sign(payload, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });
                //if the passwords matches generate a cookie for the user
                res.cookie("jwt", token, {
                    maxAge: 1 * 24 * 60 * 60,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Lax' // Adjust sameSite based on environment
                });
                //console.log("user", JSON.stringify(user, null, 2));
                //console.log(token);
                return res.status(200).send({ success: true, authenticated: true, user });
            } else {
                console.log("Senha incorreta");
                return res.status(401).send({ success: false, message: "Senha incorreta" });
            }
        } else {
            console.log("Usuário não encontrado");
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.error("Erro: ", error);
        next(error);
    }
};

const verifyToken = (req, res, next) => {
    //console.log("Cookies in request:", req.cookies);

    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ authenticated: false, message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        req.user = decoded;
        //console.log('Decoded Token:', decoded);
        next();
    } catch (error) {
        res.status(401).json({ authenticated: false, message: "Invalid token." });
    }
};

const getProtectedData = (req, res) => {
    res.status(200).json({ authenticated: true, message: "This is protected data", user: req.user });
};

module.exports = {
    signup,
    login,
    verifyToken,
    getProtectedData,
};