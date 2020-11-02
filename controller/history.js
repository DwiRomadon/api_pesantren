const history = require('../model/history')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
var distance = require('google-distance');
distance.apiKey = 'AIzaSyAukviuPQ_-gjcT7tM4dTwO1K_Kgqc-5WQ';

exports.inputHistory = (data) =>
    new Promise(async (resolve, reject)=>{
        const newHistory = new history({
            idPesantren : data.id,
            macAddress: data.macAddress
        })
        history.findOne({
            macAddress: data.macAddress,
            idPesantren : ObjectId(data.id)
        }).then(res => {
            if (res){
                reject(response.commonErrorMsg('Id Sudah Ada'))
            }else {
                newHistory.save()
                    .then(r=>{
                        resolve(response.commonSuccessMsg('Ok'))
                    }).catch(err => {
                    reject(response.commonErrorMsg('Mohon Maaf Input Data Gagal'))
                })
            }
        })
    })

exports.getHistoryJarakPetshop = (data) =>
    new Promise(async (resolve, reject)=>{
        console.log(data)
        await history.aggregate([
            {
                $match: {
                    macAddress: data.macAddress
                }
            },
            {
                $lookup:
                    {
                        from: "pesantrens",
                        localField: "idPesantren",
                        foreignField: "_id",
                        as: "data"
                    }
            },
            {
                $unwind: "$data"
            }
        ]).sort({_id: -1})
            .then(async r =>{
                let datas = []
                let originLatLong = data.latitude + "," + data.longitude
                for (i in r){
                    let latLongDesti = r[i].data.latitude + "," + r[i].data.longitude
                    let jarak = await getData(originLatLong, latLongDesti).then()
                        datas.push({
                            gambar: r[i].data.gambar,
                            namaPesantren: r[i].data.namaPesantren,
                            _id: r[i].data._id,
                            nomorTelp: r[i].data.nomorTelp,
                            akreditasi: r[i].data.akreditasi,
                            fasilitas: r[i].data.fasilitas,
                            jarak: jarak,
                            latitude: r[i].data.latitude,
                            longitude: r[i].data.longitude,
                            nomorNspp: r[i].data.nomorNspp,
                            website: r[i].data.website,
                            gambar_icon: r[i].data.gambar_icon,
                            profile: r[i].data.profile,
                            info: r[i].data.info,
                            pendidikan: r[i].data.pendidikan,
                            ekskul: r[i].data.ekskul,
                            pemilik: r[i].data.pemilik,
                            macAddress: r[i].macAddress
                        })
                }
                resolve(response.commonResult(datas))
            }).catch(err => {
                response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server')
            })
    })

const getData = (latLongOrigin, latLongDesti) =>
    new Promise(async (resolve, reject)=>{
        await distance.get(
            {
                index: 1,
                origin: latLongOrigin,
                destination: latLongDesti
            },
            function(err, data) {
                if (err) {return console.log(err);}
                else {
                    resolve(data)
                }
            });
    })

exports.hapusData = (id) =>
    new Promise(async (resolve, reject)=>{
        await history.remove({
            idPesantren: ObjectId(id)
        })
            .then(r =>{
                resolve(response.commonSuccessMsg("Berhasil menghapus data"))
            }).catch(err => {
                response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server')
            })
    })
