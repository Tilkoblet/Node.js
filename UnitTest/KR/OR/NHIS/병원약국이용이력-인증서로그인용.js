const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Nhis-RetrieveCareDescList
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 국민건강보험공단의 병원/약국 이용 이력 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhis/retrievecaredesclist");

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
        _rest.AddBody("CertFile", _publicCert, true);                   // [암호화] 인증서 공개키(Base64 인코딩)
        _rest.AddBody("KeyFile", _privateKey, true);                    // [암호화] 인증서 개인키(Base64 인코딩)
        _rest.AddBody("CertPassword", Constant.CertPassword, true);     // [암호화] 인증서 암호(Base64 인코딩)
        _rest.AddBody("IdentityNumber", "", true);                      // [암호화]유저 주민등록번호 앞자리(yyMMdd / Base64 인코딩)
        _rest.AddBody("StartDate", "", false);                          // 검색시작일(yyyyMMdd) 오늘부터 14개월 전부터 조회 가능
        _rest.AddBody("EndDate", "", false);                            // 검색종료일(yyyyMMdd) 오늘부터 2개월 전까지 조회 가능
       
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
