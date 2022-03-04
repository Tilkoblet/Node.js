const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-NhisSi4n-JpBca00203
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 국민건강보험공단의 보험료 산출내역 조회(고용 전체, 개인별) endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhissi4n/JpBca00203");

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
        _rest.AddBody("BusinessNumber", "", true);                      // [암호화] 사업자등록번호(Base64 인코딩)
        _rest.AddBody("Year", "2021", false);                           // 고지년도(yyyy)
        _rest.AddBody("Month", "12", false);                            // 고지월(MM)
        _rest.AddBody("UserId", "", true);                              // 아이디(로그인시 인증서와 ID가 모두 필요한 경우에만 입력)
        _rest.AddBody("CertType", "0", false);                          // 인증서 종류 - 기본값 0: 사업자인증서(개인사업자, 법인사업자), 1: 대표자 개인인증서(개인사업자)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", JSON.stringify(Response));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
