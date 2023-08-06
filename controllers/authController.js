const prisma = require('../lib/db')
const { userSchema } = require('../schema-validator/userSchema')

exports.signUp = async (req, res) => {

    try {
        // fetch user data from request body
        const userData = req.body
        console.log("🚀 ~ file: authController.js:9 ~ exports.signUp= ~ userData:", userData)

        // validate user data using userSchema build with yup
        const userCheck = await userSchema.validate(userData)
        console.log("🚀 ~ file: authController.js:13 ~ exports.signUp= ~ userCheck:", userCheck)
        // if user data is valid, create a new user in the database
        const user = await prisma.user.create({
            data: userData
        })
        console.log("🚀 ~ file: authController.js:17 ~ exports.signUp= ~ user:", user)
        res.status(201).json({ message: "User created successfully", user: user })

    } catch (error) {
        console.log("🚀 ~ file: authController.js:22 ~ exports.signUp= ~ error:", error)
        res.status(400).json({ error: error.message })
    }

}