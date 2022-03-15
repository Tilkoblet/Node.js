const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-HometaxIdLogin-UTERNAAT32
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 홈택스의 종합소득세 신고도움 서비스 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/hometaxidlogin/UTERNAAT32");

        // Body 추가
        _rest.AddBody("UserId", "", true);                          // [암호화] 홈택스 ID(Base64 인코딩)
        _rest.AddBody("UserPassword", "", true);                    // [암호화] 홈택스 암호(Base64 인코딩)
        _rest.AddBody("Year", "2020", false);                       // 귀속년도(yyyy)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
