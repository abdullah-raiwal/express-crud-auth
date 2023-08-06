const prisma = require('../lib/db')
const { userSchema } = require('../schema-validator/userSchema')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

exports.signUp = async (req, res) => {

    try {
        // fetch user data from request body
        const userData = req.body

        // validate user data using userSchema build with yup
        await userSchema.validate(userData)
        delete userData.confirmPassword
        // hash password using bcrypt
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // if user data is valid, create a new user in the database
        const user = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        })
        // delete user data from request body
        delete user.password
        const jwtToken = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 300
        })

        res.status(201).json({ message: "User created successfully", result: { user, jwtToken } })

    } catch (error) {
        console.log("🚀 ~ file: authController.js:22 ~ exports.signUp= ~ error:", error)
        res.status(400).json({ error: error.message })
    }

}

exports.login = async (req, res) => {

    try {
        const { username, password } = req.body
        // await userSchema.validate({ username, password })

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if (!user) {
            return res.status(401).json({ message: "user not exists" })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid username or password" })
        }
        const jwtToken = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 300
        })
        res.status(200).json({ message: "User logged in successfully", result: { id: user._id, jwt: jwtToken } })


    } catch (error) {
        console.log("🚀 ~ file: authController.js:65 ~ exports.login= ~ error:", error)
        res.status(400).json({ error: error.message })

    }

}