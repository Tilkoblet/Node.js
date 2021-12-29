const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Iros-IISURetrieve
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 인터넷등기소의 법인 등기부등본 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/iros/IISURetrieve");
        
        // Body 추가
        _rest.AddBody("IrosID", "", true);              // [암호화] iros.go.kr 로그인 ID(Base64 인코딩)
        _rest.AddBody("IrosPwd", "", true);             // [암호화] iros.go.kr 로그인 패스워드(Base64 인코딩)
        _rest.AddBody("EmoneyNo1", "", true);           // [암호화] 전자지불 선불카드 총 12자리 중 영문을 포함한 앞 8자리 입력(Base64 인코딩)
        _rest.AddBody("EmoneyNo2", "", true);           // [암호화] 전자지불 선불카드 총 12자리 중 나머지 뒤 4자리 숫자 입력(Base64 인코딩)
        _rest.AddBody("EmoneyPwd", "", true);           // [암호화] 전자지불 선불카드 비밀번호(Base64 인코딩)
        _rest.AddBody("Company", "", false);            // 조회할 법인명
        _rest.AddBody("SgcRtvkwanhal", "0", false);     // 등기소
        _rest.AddBody("SgcRtvbubingb", "0", false);     // 법인 구분
        _rest.AddBody("SgcStatusList", "0", false);     // 등기부 상태
        _rest.AddBody("SgcRmasterjiGb", "0", false);    // 본지점 구분
        _rest.AddBody("DunCho", "1", false);            // 등기기록 구분(전부/일부)
        _rest.AddBody("Display", "2", false);           // 등기기록 종류(유효부분만열람/말소포함열람/유효사항(말소사항란지정)열람)
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
