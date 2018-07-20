
const uuidv4 = require('uuid/v4');

const uploadSingleFile = (file) => {
    return new Promise((resolve, reject) =>{
        const extension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${extension}`;

        file.mv(`storage/uploaded/${fileName}`, (e) =>{
            if(e){
                reject('Error while uploading file' + e);
            }

            resolve({
                name: key,
                fileName
            })
        })

    })
}

const uploadFiles = async (files) => {

    let filesArray = [];

    if(files){
        for(key in files){
            const file = files[key];
            const dbRecord = await uploadSingleFile(file);
            filesArray.push(dbRecord);
        }
    }

    return filesArray
}

module.exports = {
    uploadFiles
}