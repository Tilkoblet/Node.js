const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Credit4u-ContractData
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 한국신용정보원의 정액형 보장 계약내용 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/credit4u/contractdata");

        // Body 추가
        _rest.AddBody("UserID", "", true);                             // [암호화] 로그인 아이디(Base64 인코딩)
        _rest.AddBody("UserPassword", "", true);                       // [암호화] 로그인 비밀번호(Base64 인코딩)
        _rest.AddBody("ContractStatus", "", false);                    // 계약상태(A:전체/S:정상 공백 시 정상 데이터만 조회합니다.)
       
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }
    
})(Tilko);
