const Rest = require("../../../REST").Tilko.API.REST;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-CheckedSelfCaptcha

    const _apiKey = "발급받은 API KEY";

    try {
        let _rest = new Rest(_apiKey);
        _rest.Init();
    
        // 한국신용정보원의 본인인증 서비스 1단계 endPoint 설정
        _rest.SetEndPointUrl("https://api.tilko.net/api/v1.0/credit4u/checkedselfcaptcha");
    
        // Body 추가
        _rest.AddBody("UserID", "로그인아이디", true);
        _rest.AddBody("UserPassword", "로그인비밀번호", true);
        _rest.AddBody("UserName", "가입자명", true);
        _rest.AddBody("IdentityNumber", "주민등록번호", true);
        _rest.AddBody("NiceMobileCorp", "통신사코드", false);
    
        // API 호출
        const response = _rest.Call();
        console.log("response:", response);
        console.log(response.CaptchaImage);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
