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
var uploadLogo = multer({storage: storage}).single("gambar_icon")

router.post("/input",upload, (req, res) => {
    pesantren.inputData(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/inputlogopesantren/:id",uploadLogo, (req, res) => {
    console.log(req.params.id)
    pesantren.inputLogo(req.params.id, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/ubahgambar/:id", upload, (req, res) => {
    pesantren.tambahGambar(req.file.filename, req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/hapusdata/:id", (req, res) => {
    pesantren.hapusData(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/ubah/:id",upload, (req, res) => {
    pesantren.updateData(req.body, req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/ubahdata/:id", (req, res) => {
    pesantren.updateDataPesantren(req.body, req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.post("/getjarak/:radius", (req, res) => {
    pesantren.getJarakPesantren(req.body, req.params.radius)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router
