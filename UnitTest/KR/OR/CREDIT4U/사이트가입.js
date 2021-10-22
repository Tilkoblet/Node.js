const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-JoinSite
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 한국신용정보원의 사이트 가입 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/credit4u/joinsite");

        // Body 추가
        _rest.AddBody("EmailCode", _publicCert, true);                    // [암호화] 이메일 인증코드(Base64 인코딩)
        _rest.AddBody("UserEmail", _privateKey, true);                    // [암호화] 사이트 가입용 이메일(예: 이메일@도메인 / Base64 인코딩)
        _rest.AddBody("UserID", Constant.CertPassword, true);             // [암호화] 로그인 아이디(Base64 인코딩)
        _rest.AddBody("UserPassword", "", true);                          // [암호화] 로그인 비밀번호(Base64 인코딩)
        _rest.AddBody("UserName", "", true);                              // [암호화] 가입자 명(Base64 인코딩)
        _rest.AddBody("DateOfBirth", "", false);                          // 생년월일(yyyyMMdd)
        _rest.AddBody("Sex", "", false);                                  // 성별(남자 : m / 여자 : f)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }
    
})(Tilko);
