const FS = require("fs");
const Rest = require("../../../Tilko.API/RESTLocal").Tilko.API.REST;
const Constant = require("../../../UnitTest/ConstantLocal").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-GovSimpleAuth-SimpleAuthRequest
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 간편인증 요청 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/GovSimpleAuth/SimpleAuthRequest");

        // Body 추가
        _rest.AddBody("PrivateAuthType", "4");                      // 인증종류 0: 카카오톡 / 1: 페이코 / 2: 국민은행모바일 / 3: 삼성패스 / 4: 통신사Pass
        _rest.AddBody("UserName", "홍길동", true);                  // [암호화] 이용자명
        _rest.AddBody("BirthDate", "20210101", true);               // [암호화] 생년월일(yyyyMMdd)
        _rest.AddBody("UserCellphoneNumber", "01012345678", true);  // [암호화] 휴대폰번호
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
