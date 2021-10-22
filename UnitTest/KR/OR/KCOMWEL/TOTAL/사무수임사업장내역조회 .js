const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Kcomwel-SelectSdgSaeopjangInfoNaeyeok
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 고용산재토탈서비스 사무수임사업장 내역 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/kcomwel/selectsdgsaeopjanginfonaeyeok");

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
        _rest.AddBody("BusinessNumber", "", true);                      // [암호화] 검색 할 사업자등록번호 또는 주민등록번호(xxxxxxxxxx 또는 xxxxxxxxxxxxx / Base64 인코딩)
        _rest.AddBody("UserGroupFlag", "1", false);                     // 인증서 - 사업장(0)/사무대행(1) 구분
        _rest.AddBody("IndividualFlag", "1", false);                    // 인증서 - 개인(0)/법인(1) 구분
        _rest.AddBody("BoheomFg", "", false);                           // 보험구분 - 산재(0)/고용(1)/전체(2)
        _rest.AddBody("BugwaGojiYn", "", false);                        // 부과고지구분 - 부과고지(0)/자진신고(1)/전체(2)
        _rest.AddBody("SjSaeopFg", "", false);                          // 산재사업구분 - 계속(0)/유기(1)/일괄계속(2)/일괄유기(3)/해외사업장(4)/중소기업사업주(5)/자영업자(6)/전체(7)
        _rest.AddBody("GySaeopFg", "", false);                          // 고용사업구분 - 계속(0)/유기(1)/일괄계속(2)/일괄유기(3)/해외사업장(4)/중소기업사업주(5)/자영업자(6)/전체(7)
        _rest.AddBody("GySaeopjangStatusCd", "", false);                // 고용사업장상태 - 정상(0)/소멸(1)/해지(2)/전체(3)
        _rest.AddBody("SjSaeopjangStatusCd", "", false);                // 산재사업장상태 - 정상(0)/소멸(1)/해지(2)/전체(3)
        _rest.AddBody("GwanriNo", "", false);                           // 관리번호
        _rest.AddBody("GwanriJisaCd", "", false);                       // 관리지사 - 별도제공
        _rest.AddBody("JeopsuInfoJoheoYN", "", false);                  // 접수내역표시 - Y/N
        _rest.AddBody("JeopsuDtFrom", "", false);                       // 접수일(시작 - yyyyMMdd)
        _rest.AddBody("JeopsuDtTo", "", false);                         // 접수일(종료 - yyyyMMdd)
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
