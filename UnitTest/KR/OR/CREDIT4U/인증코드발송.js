const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-SendAuthCode
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 한국신용정보원의 인증코드 발송 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/credit4u/sendauthcode");

        // Body 추가
        _rest.AddBody("UserEmail", "", true);         // [암호화] 사이트 가입용 이메일(예: 이메일@도메인 / Base64 인코딩)
       
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }
    
})(Tilko);
