const Request   = require("sync-request");
const Crypto    = require("crypto");
const NodeRSA   = require("node-rsa");

const apiHost   = "https://api.tilko.net/";
const apiKey    = "";


// AES 암호화 함수
function aesEncrypt(key, iv, plainText) {
    const cipher    = Crypto.createCipheriv("aes-128-cbc", key, iv);
    
    let ret         = cipher.update(plainText, "utf8", "base64");
    ret             += cipher.final("base64");

    return ret;
}


// RSA 암호화 함수
function rsaEncrypt(publicKey, aesKey, padding) {
    const key   = new NodeRSA("-----BEGIN PUBLIC KEY-----\n" + publicKey + "\n-----END PUBLIC KEY-----", {"encryptionScheme": padding});
    return key.encrypt(aesKey, "base64", "utf8");
}


// RSA 공개키(Public Key) 조회 함수
function getPublicKey() {
    const uri       = apiHost + "/api/Auth/GetPublicKey?APIkey=" + apiKey;
    const options   = {
        json: true,
    };
    
    const response      = Request("GET", uri, options);
    const rsaPublicKey  = JSON.parse(response.getBody("utf8")).PublicKey;
    return rsaPublicKey;
}


// RSA Public Key 조회
const rsaPublicKey  = getPublicKey(apiKey);
console.log("rsaPublicKey:", rsaPublicKey);


// AES Secret Key 및 IV 생성
const aesKey        = Crypto.randomBytes(16);
const aesIv         = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);


// AES Key를 RSA Public Key로 암호화
let aesCipherKey    = Buffer.alloc(0);
aesCipherKey        = rsaEncrypt(rsaPublicKey, aesKey, "pkcs1");
console.log("aesCipherKey:", aesCipherKey);


// API URL 설정
// HELP: https://tilko.net/Help/Api/POST-api-apiVersion-Iros-REVTWelcomeEvtC
const url       = apiHost + "api/v1.0/Iros/REVTWelcomeEvtC";


// API 요청 파라미터 설정
const options   = {
    headers: {
        "Content-Type"          : "application/json",
        "API-KEY"               : apiKey,
        "ENC-KEY"               : aesCipherKey
    },
    
    json: {
        "IrosID": aesEncrypt(aesKey, aesIv, "__VALUE__"),
        "IrosPwd": aesEncrypt(aesKey, aesIv, "__VALUE__"),
        "UniqueNo": "__VALUE__",
        "InsRealClsCd": "__VALUE__",
        "A103Name": "__VALUE__"
    },
};


// API 호출
const res  = Request("POST", url, options);
console.log("res:", res.getBody("utf8"));


