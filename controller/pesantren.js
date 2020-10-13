const pesantren = require('../model/pesantren.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const haversine = require('haversine')
var distance = require('google-distance');
distance.apiKey = 'AIzaSyAukviuPQ_-gjcT7tM4dTwO1K_Kgqc-5WQ';

exports.inputData = (data, gambar) =>
    new Promise(async (resolve, reject)=>{
        let datas = Object.assign(data, {gambar: gambar})
        const newPesanten = new pesantren(datas)
        newPesanten.save()
            .then(r=>{
                resolve(response.commonSuccessMsgWithId('Berhasil menginput data', newPesanten._id))
            }).catch(err => {
            reject(response.commonErrorMsg('Mohon Maaf Input Data Gagal'))
        })
    })

exports.updateData = (data, id) =>
    new Promise(async (resolve, reject)=>{
        pesantren.update(
            {
                _id: ObjectId(id)
            }, { $addToSet: data }
        )
            .then(r=>{
                resolve(response.commonSuccessMsg('Berhasil merubah data'))
            }).catch(err => {
            reject(response.commonErrorMsg('Mohon Maaf Input Data Gagal'))
        })
    })

exports.getJarakPesantren = (data, radius) =>
    new Promise(async (resolve, reject)=>{
        await pesantren.find()
            .then(async r =>{
                let datas = []
                let originLatLong = data.latitude + "," + data.longitude
                for (i in r){
                    let latLongDesti = r[i].latitude + "," + r[i].longitude
                    let jarak = await getData(originLatLong, latLongDesti).then()
                    let rad = jarak.distance.replace("km", "")
                    if(Number(rad) <= Number(radius)){
                        datas.push({
                            gambar: r[i].gambar,
                            namaPesantren: r[i].namaPesantren,
                            _id: r[i]._id,
                            nomorTelp: r[i].nomorTelp,
                            akreditasi: r[i].akreditasi,
                            fasilitas: r[i].fasilitas,
                            jarak: jarak,
                            latitude: r[i].latitude,
                            longitude: r[i].longitude,
                            nomorNspp: r[i].nomorNspp,
                            website: r[i].website,
                        })
                    }
                    if (Number(radius) === 0){
                        datas.push({
                            gambar: r[i].gambar,
                            namaPesantren: r[i].namaPesantren,
                            _id: r[i]._id,
                            nomorTelp: r[i].nomorTelp,
                            akreditasi: r[i].akreditasi,
                            fasilitas: r[i].fasilitas,
                            jarak: jarak,
                            latitude: r[i].latitude,
                            longitude: r[i].longitude,
                            nomorNspp: r[i].nomorNspp,
                            website: r[i].website,
                        })
                    }
                }
                resolve(response.commonResult(datas.sort(compare)))
            }).catch(err => {
                response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server')
            })
    })

const getData = (latLongOrigin, latLongDesti) =>
    new Promise(async (resolve, reject)=>{
        await distance.get(
            {
                origin: latLongOrigin,
                destination: latLongDesti
            },
            function(err, data) {
                if (err) {return console.log(err);}
                resolve(data)

            });
    })


const compare = (a, b) => {
    const jarakA = Number(a.jarak.distance.replace("km", "").toUpperCase());
    const jarakB = Number(b.jarak.distance.replace("km", "").toUpperCase());
    let comparison = 0;
    if (jarakA > jarakB) {
        comparison = 1;
    } else if (jarakA < jarakB) {
        comparison = -1;
    }
    return comparison;
}
