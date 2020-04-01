const usersCtrl = {};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

process.env.SECRET_KEY = 'secret';

usersCtrl.signinUsers = async (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send([token, user._id])
            } else {
                res.send('The password do not match')
            }
        } else {
            res.send('The Email is not registered')
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
};

usersCtrl.createUser = async (req, res) => {
    const { name, age, phoneNumber, email, password, confirm_password } = req.body;
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
        res.send("no ok");
    } else {
        const newUser = new User({name, age, phoneNumber, email, password, confirm_password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.send("ok");
    }
};

usersCtrl.getUserData = async (req, res) => {
    User.findOne({
        _id: req.params.id
    })
    .then(user => {
        const userData = {
            name: user.name,
            age: user.age,
            phoneNumber: user.phoneNumber,
            email: user.email
        }
        if (userData) {
            res.send(userData)
        } else {
            res.send('No user data')
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
}

// usersCtrl.deleteUser = async (req, res) => {
//     const { id } = req.params;
//     await User.findByIdAndDelete(id);
//     res.json('User deleted');
// };

module.exports = usersCtrl;