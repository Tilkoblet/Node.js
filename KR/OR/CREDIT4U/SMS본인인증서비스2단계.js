const Rest = require("../../../REST").Tilko.API.REST;
const Constant = require("../../../Constant").Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-CheckedSelfAuthCode

    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();
    
        // 한국신용정보원의 본인인증 서비스 2단계 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/credit4u/checkedselfauthcode");
    
        // Body 추가
        _rest.AddBody("UserName", "", true);        // [암호화] 가입자 명(Base64 인코딩)
        _rest.AddBody("IdentityNumber", "", true);  // [암호화] 주민등록번호(8012151XXXXXX / Base64 인코딩)
        _rest.AddBody("UserCellphone", "", true);   // [암호화] 연락처(010XXXXXXXX / Base64 인코딩)
        _rest.AddBody("CaptchaCode", "", false);    // 캡챠코드 Tilko Session이 유지되는 180초 이내에 입력을 하셔야 합니다.
    
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
