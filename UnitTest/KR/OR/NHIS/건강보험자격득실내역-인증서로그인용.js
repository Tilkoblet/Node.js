const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Nhis-JpAea00401
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 국민건강보험공단의 건강보험자격득실내역 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhis/jpaea00401");

        // 공동인증서 경로 설정
        const _publicPath = Constant.CertPath + "/signCert.der";
        const _privatePath = Constant.CertPath + "/signPri.key";
        let _publicCert = Buffer.alloc(0);
        let _privateKey = Buffer.alloc(0);

        _publicCert = FS.readFileSync(_publicPath);
        _privateKey = FS.readFileSync(_privatePath);
        console.log("_publicCert:", _publicCert);
        console.log("_privateKey:", _privateKey);
        
        // Body 추가
        _rest.AddBody("NhisQuery", "", false);                   // 검색조건 전체 : 0 / 직장가입자 : 1 / 지역가입자 : 2 / 가입자 전체 : 3
        _rest.AddBody("CxId", "", false);                        // CxId
        _rest.AddBody("PrivateAuthType", "", false);             // 인증종류 KakaoTalk / Payco / KbMobile / SamsungPass / TelecomPass
        _rest.AddBody("ReqTxId", "", false);                     // ReqTxId
        _rest.AddBody("Token", "", false);                       // Token
        _rest.AddBody("TxId", "", false);                        // TxId      
        _rest.AddBody("UserName", "", true);                     // [암호화] 이용자명
        _rest.AddBody("BirthDate", "", true);                    // [암호화] 생년월일(yyyyMMdd)
        _rest.AddBody("UserCellphoneNumber", "", true);          // [암호화] 휴대폰번호
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
