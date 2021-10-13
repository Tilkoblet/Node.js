const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-NhisSimpleAuth-SimpleAuthRequest
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 간편인증 요청 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhisSimpleAut/simpleauthrequest");

        // Body 추가
        _rest.AddBody("PrivateAuthType", "");            // 인증종류 0: 카카오톡 / 1: 페이코 / 2: 국민은행모바일 / 3: 삼성패스 / 4: Pass
        _rest.AddBody("UserName", "", true);             // [암호화] 이용자명
        _rest.AddBody("BirthDate", "", true);            // [암호화] 생년월일(yyyyMMdd)
        _rest.AddBody("UserCellphoneNumber", "", true);  // [암호화] 휴대폰번호
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
