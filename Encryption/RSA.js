const NodeRSA = require("node-rsa");

var Tilko = Tilko || {};
Tilko.API = {};
Tilko.API.Encryption = {};
Tilko.API.Encryption.RSA = class {

    constructor () {
        console.log("Tilko.API.Encryption.RSA");
    }

    Encrypt(_publicKey, _aesKey, _padding) {
        const key = new NodeRSA("-----BEGIN PUBLIC KEY-----\n" + _publicKey + "\n-----END PUBLIC KEY-----", {"encryptionScheme": _padding});
        return key.encrypt(_aesKey, "base64", "utf8");
    }
};

module.exports = {
    Tilko,
};
