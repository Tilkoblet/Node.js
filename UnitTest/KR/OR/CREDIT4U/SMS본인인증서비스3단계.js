const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-CheckedSelfAuthMobile
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();
    
        // 한국신용정보원의 본인인증 서비스 3단계 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/Credit4u/checkedselfauthmobile");
    
        // Body 추가
        _rest.AddBody("UserID", "", true);              // [암호화] 로그인 아이디(Base64 인코딩)
        _rest.AddBody("UserPassword", "", true);        // [암호화] 로그인 비밀번호(Base64 인코딩)
        _rest.AddBody("IdentityNumber", "", true);      // [암호화] 주민등록번호(8012151234567 / Base64 인코딩)
        _rest.AddBody("AuthSmsCode", "", false);        // 인증코드
    
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
