const express = require('express')
const router = express.Router()
const User = require('./User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const secretkey = 'sonusingmjkd'



router.get('/', async (req, res) => {
    try {
        const userdata = await User.find()
        res.send({
            message: "Data is got Successfully",
            data: userdata
        })

    }
    catch {
        res.status(500).send("Internal Server Problem")
    }

})



router.post('/', [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter password atleast 5 character").isLength({ min: 5 })
], async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() })
    }
    else {
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                res.status(400).send({ error: "this is user already exist " })
            }
            else {

                const salt = await bcrypt.genSalt(10)
                const secPass = await bcrypt.hash(req.body.password, salt)


                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass,
                })

                res.status(200).send({
                    message: "User added successfully"
                })

            }
        }
        catch {
            res.status(500).send("Internal Server Problem")
        }

    }



}
)

router.delete('/:id', async (req, res) => {
    try {
        let user = req.params.id
        const deletdata = await User.findByIdAndDelete(user)
        res.send({
            message: "user has deleted",
            data: deletdata
        })

    }
    catch {
        res.status(500).send("Internal Server Problem")
    }
})

router.patch('/:id', async (req, res) => {
    let user = req.params.id
    const { name, email, password } = req.body;
    const newdata = {};
    if (name) { newdata.name = name };
    if (email) { newdata.email = email };
    if (password) { newdata.password = password };
    // console.log(newdata)

    const updatedata = await User.findByIdAndUpdate(user, { $set: newdata }, { new: true })
    res.send({
        message: " User Successfully Update ",
        data: updatedata
    })
})



router.post('/login', [
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter password atleast 5").exists()

], async (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send("pls try to with correct credentials")
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).send("pls try to with correct password")
        }

        let uid = user['_id']
        let token = await jwt.sign({ payload: uid }, secretkey)
        res.cookie('login', token)

        res.send({
            message:"User loggedIn"
        })



    }
    catch {
        res.status(500).send("Internal Server Problem")
    }
})


module.exports = router