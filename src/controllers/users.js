const usersCtrl = {};

const User = require('../models/User');

// usersCtrl.getUsers = async (req, res) => {
//     const users = await User.find();
//     res.send(users);
// };

usersCtrl.createUser = async (req, res) => {
    const { name, age, phoneNumber, email, password, confirm_password } = req.body;
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
        // req.flash('error_msg', 'The Email is already in use');
        res.send("no ok");
    } else {
        const newUser = new User({name, age, phoneNumber, email, password, confirm_password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        // req.flash('success_msg', 'You are registered');
        res.send("ok");
    }
};

// usersCtrl.deleteUser = async (req, res) => {
//     const { id } = req.params;
//     await User.findByIdAndDelete(id);
//     res.json('User deleted');
// };

module.exports = usersCtrl;