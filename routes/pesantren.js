const router = require('express').Router()
const pesantren = require('../controller/pesantren')
const multer = require('multer')

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function (req, file, cb) {
        // console.log(file)
        cb(null, './gambar')
    }
})


var upload = multer({storage: storage}).single("gambar")

router.post("/input",upload, (req, res) => {
    pesantren.inputData(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/ubah/:id",upload, (req, res) => {
    pesantren.updateData(req.body, req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.post("/getjarak/:radius", (req, res) => {
    console.log(req.body)
    pesantren.getJarakPesantren(req.body, req.params.radius)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router
