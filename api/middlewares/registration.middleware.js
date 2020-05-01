const AppError = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');
const User = require('../models/user.model');

const validateRegistration = 
   async (req, res, next) => {
        const {
            username,
            password,
            email,
            user_type
        } = req.body;
       
        if (
            (
                !username ||
                !password ||
                !email ||
                !user_type 
            )
        ) {
            next(new AppError('One or more input fields are missing', 403));
            return;
        }
        req.user = {
            username,
            email,
            password,
            user_type
        };
        // CHECKS IF EMAIL USERNAME  IS IN USE
        const userByEmail = await User.findUserByCriteria(
            'email',
            email
        );
        const userByUsername = await User.findUserByCriteria(
            'username',
            username
        );

        if (userByEmail) {
            res.json({message:"email already exists"})
        }
        else if (userByUsername) {
            res.json({message:"Usernam already exists"})
            console.log("username exists")
        } else {

            next();
        }
    }

    module.exports = {
  validateRegistration
};
