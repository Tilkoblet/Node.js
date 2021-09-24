process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const Request = require("sync-request");
const Crypto = require("crypto");
const Aes = require("./Encryption/AES").Tilko.API.Encryption.AES;
const Rsa = require("./Encryption/RSA").Tilko.API.Encryption.RSA;
const aes = new Aes();
const rsa = new Rsa();

var Tilko = Tilko || {};
Tilko.API = {};
Tilko.API.REST = class {
    
    _apiServer = "https://api.tilko.net";
    _endPointUrl = "";
    _apiKey = "";                   // API키
    _aesKey = Buffer.alloc(16);     // AES 암호화에 사용할 키
    _aesIv = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);  // AES 암호화에 사용할 IV(고정)
    _rsaPublicKey = "";

    _headers = {};
    _bodies  = {};
    
    constructor (ApiKey) {
        console.log("Tilko.API.REST");
        console.log("ApiKey:", ApiKey);

        if (!ApiKey) {
            throw "API key cannot be null or empty.";
        }
        this._apiKey = ApiKey;
    }

    SetEndPointUrl(EndPointUrl) {
        if (!EndPointUrl) {
            throw "EndPointUrl cannot be null or empty.";
        }
        this._endPointUrl = EndPointUrl;
    }

    GetPublicKey() {
        const uri = this._apiServer + "/api/Auth/GetPublicKey?APIkey=" + this._apiKey;
        const options = {
            json: true,
        };
        
        const response = Request("GET", uri, options);
        
        return JSON.parse(response.getBody("utf8"));
    }

    AddBody(Key, Value, Encrypt) {
        try {
            if (Key in this._bodies) {
                throw "There is already the same key in bodies.";
            }

            if (Encrypt) {
                const _cipher = aes.Encrypt(this._aesKey, this._aesIv, Buffer.from(Value, "utf8"));
                console.log("_cipher:", _cipher);
                this._bodies[Key] = _cipher;
            } else {
                this._bodies[Key] = Value;
            }
        } catch (e) {
            console.error(e);
        }
    }

    Init() {
        try {
            const _pubKey = this.GetPublicKey(this._apiKey);
            console.log("_pubKey:", _pubKey);

            if (_pubKey.Status != "OK") {
                throw _pubKey.Message;
            } else if (_pubKey.ApiKey != this._apiKey) {
                throw "Requested API key and responsed API key does not match!";
            }

            console.log("_pubKey.PublicKey:", _pubKey.PublicKey);
            this._rsaPublicKey = _pubKey.PublicKey;

            this._aesKey = Crypto.randomBytes(16);

            // Encrypt AES Key
            let _aesCipherKey = Buffer.alloc(0);
            _aesCipherKey = rsa.Encrypt(this._rsaPublicKey, this._aesKey, "pkcs1");
            console.log("_aesCipherKey:", _aesCipherKey);

            this._headers["Content-Type"] = "application/json";
            this._headers["API-KEY"] = this._apiKey;
            this._headers["ENC-KEY"] = _aesCipherKey;
        } catch (e) {
            console.error(e);
        }
    }

    Call() {
        const uri = this._endPointUrl;
        const headers = this._headers;
        const bodies = this._bodies;
        console.log("uri:", uri);
        console.log("headers:", headers);
        console.log("bodies:", bodies);

        const options = {
            headers: headers,
            json: bodies,
        };
        
        const response = Request("POST", uri, options);
        
        return JSON.parse(response.getBody("utf8"));
    }

}

module.exports = {
    Tilko,
};
