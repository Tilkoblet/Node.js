const FS = require("fs");
const Rest = require("../../../Tilko.API/RESTLocal").Tilko.API.REST;
const Constant = require("../../../UnitTest/ConstantLocal").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-GovSimpleAuth-AA090UserJuminCheckResApp
    
    try {
        // 간편인증 응답 및 로그인 처리(모바일에서 인증 완료 후, 진행하셔야 합니다.)
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 건강보험공단의 건강검진내역 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/GovSimpleAuth/AA090UserJuminCheckResApp");

        // 간편인증 요청 후 받은 값들
        const RequestLogin = {
            "CxId": "",
            "PrivateAuthType": "",
            "ReqTxId": "",
            "Token": "",
            "TxId": "",
            "UserName": "",
            "BirthDate": "",
            "UserCellphoneNumber": "",
        };

        // Body 추가
        _rest.AddBody("CxId", RequestLogin.CxId, false);                                // 간편인증 요청 후 받은 CxId 값
        _rest.AddBody("PrivateAuthType", RequestLogin.PrivateAuthType, false);          // 간편인증 요청 후 받은 PrivateAuthType 값
        _rest.AddBody("ReqTxId", RequestLogin.ReqTxId, false);                          // 간편인증 요청 후 받은 ReqTxId 값
        _rest.AddBody("Token", RequestLogin.Token, false);                              // 간편인증 요청 후 받은 Token 값
        _rest.AddBody("TxId", RequestLogin.TxId, false);                                // 간편인증 요청 후 받은 TxId 값
        _rest.AddBody("UserName", RequestLogin.UserName, true);                         // [암호화] 간편인증 요청 후 받은 UserName 값
        _rest.AddBody("BirthDate", RequestLogin.BirthDate, true);                       // [암호화] 간편인증 요청 후 받은 BirthDate 값
        _rest.AddBody("UserCellphoneNumber", RequestLogin.UserCellphoneNumber, true);   // [암호화] 간편인증 요청 후 받은 UserCellphoneNumber 값
        _rest.AddBody("PersonName", "김길동", true);                                    // [암호화] 조회 대상자의 성명
        _rest.AddBody("IdentityNumber", "9012311234567", true);                         // [암호화] 조회 대상자의 주민등록번호(9001011234567)
        _rest.AddBody("PublishDate", "20200101", false);                                // 주민등록증 발행일(yyyyMMdd)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
