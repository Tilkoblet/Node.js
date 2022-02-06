const FS = require("fs");
const Rest = require("../../../../../Tilko.API/RESTLocal").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/ConstantLocal").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // 
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 금융감독원 통합연금포털의 회원 가입 3단계 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/FssLifeplan/SelectPensionList");

        // Body 추가
        _rest.AddBody("UserId", "", true);      // [암호화] 금융감독원 통합연금포털 사이트 아이디
        _rest.AddBody("Password", "", true);    // [암호화] 비밀번호

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
