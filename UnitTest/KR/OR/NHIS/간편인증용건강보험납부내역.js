const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-NhisSimpleAuth-JpAca00101-GeonGangBoHeom
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 간편인증 요청 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhisSimpleAuth/simpleauthrequest");

        // Body 추가
        _rest.AddBody("PrivateAuthType", "");            // 인증종류 0: 카카오톡 / 1: 페이코 / 2: 국민은행모바일 / 3: 삼성패스 / 4: Pass
        _rest.AddBody("UserName", "", true);             // [암호화] 이용자명
        _rest.AddBody("BirthDate", "", true);            // [암호화] 생년월일(yyyyMMdd)
        _rest.AddBody("UserCellphoneNumber", "", true);  // [암호화] 휴대폰번호
    
        // API 호출
        const ResponseLogin = _rest.Call();
        console.log("ResponseLogin:", ResponseLogin);

        const RequestLogin = {
            "CxId": ResponseLogin.ResultData.CxId,
            "PrivateAuthType": ResponseLogin.ResultData.PrivateAuthType,
            "ReqTxId": ResponseLogin.ResultData.ReqTxId,
            "Token": ResponseLogin.ResultData.Token,
            "TxId": ResponseLogin.ResultData.TxId,
            "UserName": ResponseLogin.ResultData.UserName,
            "BirthDate": ResponseLogin.ResultData.BirthDate,
            "UserCellphoneNumber": ResponseLogin.ResultData.UserCellphoneNumber,
        };
        
        // 간편인증 응답 및 로그인 처리(모바일에서 인증 완료 후, 진행하셔야 합니다.)
        _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 건강보험공단의 건강보험자격득실내역 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhisSimpleAuth/JpAca00101/GeonGangBoHeom");

        // Body 추가
        _rest.AddBody("CxId", RequestLogin.CxId, false);                                // 간편인증 응답의 CxId 값
        _rest.AddBody("PrivateAuthType", RequestLogin.PrivateAuthType, false);          // 간편인증 응답의 PrivateAuthType 값
        _rest.AddBody("ReqTxId", RequestLogin.ReqTxId, false);                          // 간편인증 응답의 ReqTxId 값
        _rest.AddBody("Token", RequestLogin.Token, false);                              // 간편인증 응답의 Token 값
        _rest.AddBody("TxId", RequestLogin.TxId, false);                                // 간편인증 응답의 TxId 값
        _rest.AddBody("UserName", RequestLogin.UserName, true);                         // 간편인증 응답의 UserName 값
        _rest.AddBody("BirthDate", RequestLogin.BirthDate, true);                       // 간편인증 응답의 BirthDate 값
        _rest.AddBody("UserCellphoneNumber", RequestLogin.UserCellphoneNumber, true);   // 간편인증 응답의 UserCellphoneNumber 값
        _rest.AddBody("Year", "", false);                                               // 검색년도(yyyy)
        _rest.AddBody("StartMonth", "", false);                                         // 검색 시작 월(MM)
        _rest.AddBody("EndMonth", "", false);                                           // 검색 종료 월(MM)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
