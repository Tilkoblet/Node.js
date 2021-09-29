const Rest = require("../../../REST").Tilko.API.REST;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-CheckedLogin
    
    const _apiKey = "발급받은 API KEY";

    try {
        let _rest = new Rest(_apiKey);
        _rest.Init();

        // 한국신용정보원의 가입여부 확인 endPoint 설정
        _rest.SetEndPointUrl("https://api.tilko.net/api/v1.0/credit4u/checkedlogin");

        // Body 추가
        _rest.AddBody("UserID", "로그인아이디", true);
        _rest.AddBody("UserPassword", "로그인비밀번호", true);

        // API 호출
        const response = _rest.Call();
        console.log("response:", JSON.stringify(response));
    } catch (e) {
        console.error(e);
    }
    
})(Tilko);
