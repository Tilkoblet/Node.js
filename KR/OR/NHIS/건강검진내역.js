const FS = require("fs");
const Rest = require("../../../REST").Tilko.API.REST;

var Tilko = Tilko || {};

(function (_Tilko) {

    const _apiKey = "발급받은 API KEY";
    
    try {
        let _rest = new Rest(_apiKey);
        _rest.Init();

        // 건강보험공단의 건강검진내역 endPoint 설정
        _rest.SetEndPointUrl("https://api.tilko.net/api/v1.0/nhis/ggpab003m0105");

        /**
         * 공동인증서 경로 설정
         * 공동인증서는 "C:\Users\[사용자계정]\AppData\LocalLow\NPKI\yessign\USER\[인증서DN명]"에 존재합니다.
         */
        const _basePath = process.env[(process.platform == "win32") ? "USERPROFILE" : "HOME"] + "/AppData/LocalLow/NPKI/yessign/USER/[인증서DN명]";
        const _publicPath = _basePath + "/signCert.der";
        const _privatePath = _basePath + "/signPri.key";
        let _publicCert = Buffer.alloc(0);
        let _privateKey = Buffer.alloc(0);
        
        _publicCert = FS.readFileSync(_publicPath);
        _privateKey = FS.readFileSync(_privatePath);
        console.log("_publicCert:", _publicCert);
        console.log("_privateKey:", _privateKey);

        // Body 추가
        _rest.AddBody("CertFile", _publicCert, true);
        _rest.AddBody("KeyFile", _privateKey, true);
        _rest.AddBody("CertPassword", "password", true);
        
        // API 호출
        const response = _rest.Call();
        console.log("response:", JSON.stringify(response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
