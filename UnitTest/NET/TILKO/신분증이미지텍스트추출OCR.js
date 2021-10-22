const FS = require("fs");
const Rest = require("../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Tilko-OCR-License

    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();
    
        // 틸코의 신분증 이미지 텍스트추출(OCR) endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/tilko/ocr/license");
    
        // Body 추가
        const ImageBase64 = FS.readFileSync("D:/Temp/test_ocr.jpg", "base64");
        _rest.AddBody("Base64", ImageBase64, true);        // [암호화] 신분증 이미지 Base64
        _rest.AddBody("LicenseType", "0", true);           // 신분증 구분 주민등록증 : 0 / 운전면허증 : 1 / 외국인등록증 : 2
    
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
