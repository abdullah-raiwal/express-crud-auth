const yup = require('yup');

const userSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    imageUrl: yup.string().notRequired(),
});

module.exports = { userSchema };