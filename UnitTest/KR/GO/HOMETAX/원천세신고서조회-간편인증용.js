const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-HometaxSimpleAuth-UTERNAAZ110-WonCheonSe-SinGo
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 홈택스의 원천세 신고서 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/HometaxSimpleAuth/uternaaz110/WonCheonSe/singo");

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
        _rest.AddBody("ReqTxId", RequestLogin.ReqTxId, false);                          // 간편인증 응답의 ReqTxId 값
        _rest.AddBody("PrivateAuthType", RequestLogin.PrivateAuthType, false);          // 간편인증 응답의 PrivateAuthType 값
        _rest.AddBody("Token", RequestLogin.Token, false);                              // 간편인증 응답의 Token 값
        _rest.AddBody("TxId", RequestLogin.TxId, false);                                // 간편인증 응답의 TxId 값
        _rest.AddBody("UserName", RequestLogin.UserName, true);                         // [암호화] 간편인증 응답의 UserName 값
        _rest.AddBody("BirthDate", RequestLogin.BirthDate, true);                       // [암호화] 간편인증 응답의 BirthDate 값
        _rest.AddBody("UserCellphoneNumber", RequestLogin.UserCellphoneNumber, true);   // [암호화] 간편인증 응답의 UserCellphoneNumber 값
        _rest.AddBody("BusinessNumber", "", true);                  // [암호화] 검색 할 사업자등록번호 또는 주민등록번호(xxxxxxxxxx 또는 xxxxxxxxxxxxx / Base64 인코딩) 공백일 검색기간은 30일, 아닐경우 검색기간은 365일
        _rest.AddBody("StartDate", "", false);                      // 검색시작일(yyyyMMdd) 공백일 경우 기본값을 API에서 셋팅
        _rest.AddBody("EndDate", "", false);                        // 검색종료일(yyyyMMdd) 공백일 경우 기본값을 API에서 셋팅

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
