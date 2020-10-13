const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const pesantren = mongoose.Schema({
    namaPesantren: {
        type: String
    },
    nomorTelp: String,
    latitude: String,
    longitude: String,
    history: {
        type: Boolean,
        default: false
    },
    gambar: Array,
    fasilitas: [{
        nama: String
    }],
    akreditasi: String,
    nomorNspp: String,
    website: String
});

module.exports = mongoose.model('pesantren', pesantren)
