const Rest = require("../../../REST").Tilko.API.REST;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-CheckedSelfAuthCode

    const _apiKey = "발급받은 API KEY";
    
    try {
        let _rest = new Rest(_apiKey);
        _rest.Init();
    
        // 한국신용정보원의 본인인증 서비스 2단계 endPoint 설정
        _rest.SetEndPointUrl("https://api.tilko.net/api/v1.0/credit4u/checkedselfauthcode");
    
        // Body 추가
        _rest.AddBody("UserName", "가입자명", true);
        _rest.AddBody("IdentityNumber", "주민등록번호", true);
        _rest.AddBody("UserCellphone", "01012345678", true);
        _rest.AddBody("CaptchaCode", "캡챠코드", false);
    
        // API 호출
        const response = _rest.Call();
        console.log("response:", JSON.stringify(response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
