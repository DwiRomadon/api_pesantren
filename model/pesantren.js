const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const pesantren = mongoose.Schema({
    namaPesantren: {
        type: String
    },
    email: String,
    profile: String,
    info: String,
    pendidikan: String,
    pemilik: String,
    ekskul: String,
    nomorTelp: String,
    latitude: String,
    longitude: String,
    history: {
        type: Boolean,
        default: false
    },
    gambar: Array,
    gambar_icon: String,
    fasilitas: String,
    akreditasi: String,
    nomorNspp: String,
    website: String
});

module.exports = mongoose.model('pesantren', pesantren)
