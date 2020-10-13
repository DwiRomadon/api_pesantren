module.exports = {

    commonError:{
        error: true,
        msg : 'Terjadi Kesalahan Pada Server'
    },
    commonErrorMsg: (msg) => {
        return {
            error: true,
            msg : msg
        }
    },
    commonSuccess: {
        error: false,
        msg : 'Berhasil Memuat Permintaan'
    },
    commonSuccessMsg: (msg) => {
        return {
            error: false,
            msg : msg
        }
    },
    commonSuccessMsgWithId: (msg, id) => {
        return {
            error: false,
            id: id,
            msg : msg
        }
    },
    commonResult: (data) => {
        return {
            error : false,
            msg : 'Berhasil Memuat Data',
            data : data
        }
    }
};
