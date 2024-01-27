const note = require('./NoteSchema')
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')


router.post('/addnote', [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Enter valid description").isLength({ min: 5 })

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() })
    }
    else {
        try {
            let usernote = req.body
            const savedata = await note.create(usernote)
            res.status(200).send({
                message: "Note is add Successfully",
                data: savedata
            })

        } catch {
            res.status(500).send("Internal Server Problem")
        }
    }

})





router.get('/getnote', async (req, res) => {
    try {

        const savedata = await note.find()
        res.status(200).send({
            message: "Note is get Successfully",
            data: savedata
        })

    } catch {
        res.status(500).send("Internal Server Problem")
    }

})


router.delete('/deletenote/:id', async (req, res) => {
    try {
        let user=req.params.id
        const savedata = await note.findByIdAndDelete(user)
        res.status(200).send({
            message: "Note is delete Successfully",
            data: savedata
        })

    } catch {
        res.status(500).send("Internal Server Problem")
    }

})


router.patch('/updatenote/:id', async (req, res) => {
    try {
        let user=req.params.id
        let updatenote={}
        const{title,description}=req.body

        if(title){updatenote.title=title}
        if(description){updatenote.description=description}

        const savedata = await note.findByIdAndUpdate(user,{$set:updatenote},{new:true})
        res.status(200).send({
            message: "Note is updated Successfully",
            data: savedata
        })

    } catch {
        res.status(500).send("Internal Server Problem")
    }

})

module.exports = router




