const Crypto = require("crypto");

var Tilko = Tilko || {};
Tilko.API = {};
Tilko.API.Encryption = {};
Tilko.API.Encryption.AES = class {

    _algorithm = "aes-128-cbc";
    
    constructor () {
        console.log("Tilko.API.Encryption.AES");
    }

    Encrypt(Key, Iv, PlainText) {
        const cipher = Crypto.createCipheriv(this._algorithm, Key, Iv);
        let _ret = cipher.update(PlainText, "utf8", "base64");
        _ret += cipher.final("base64");
        return _ret;
    }

    Decrypt(Key, Iv, Text){
        const decipher = Crypto.createDecipheriv(this._algorithm, Key, Iv);
        let _ret = decipher.update(Text, "base64", "utf8");
        _ret += decipher.final("utf8");
        return _ret;
    }

};

module.exports = {
    Tilko,
};
