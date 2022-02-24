const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-NhisSimpleAuth-Ggpab003M0105
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 건강보험공단의 건강검진내역 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhisSimpleAuth/ggpab003m0105");

        // 간편인증 요청 후 받은 값들
        const RequestLogin = {
            "CxId"                  : "",
            "ReqTxId"               : "",
            "PrivateAuthType"       : "",
            "Token"                 : "",
            "TxId"                  : "",
            "UserName"              : "",
            "BirthDate"             : "",
            "UserCellphoneNumber"   : "",
        };
        
        // Body 추가
        _rest.AddBody("CxId", RequestLogin.CxId, false);                                // 간편인증 응답의 CxId 값
        _rest.AddBody("PrivateAuthType", RequestLogin.PrivateAuthType, false);          // 간편인증 응답의 PrivateAuthType 값
        _rest.AddBody("ReqTxId", RequestLogin.ReqTxId, false);                          // 간편인증 응답의 ReqTxId 값
        _rest.AddBody("Token", RequestLogin.Token, false);                              // 간편인증 응답의 Token 값
        _rest.AddBody("TxId", RequestLogin.TxId, false);                                // 간편인증 응답의 TxId 값
        _rest.AddBody("UserName", RequestLogin.UserName, true);                         // 간편인증 응답의 UserName 값
        _rest.AddBody("BirthDate", RequestLogin.BirthDate, true);                       // 간편인증 응답의 BirthDate 값
        _rest.AddBody("UserCellphoneNumber", RequestLogin.UserCellphoneNumber, true);   // 간편인증 응답의 UserCellphoneNumber 값

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
