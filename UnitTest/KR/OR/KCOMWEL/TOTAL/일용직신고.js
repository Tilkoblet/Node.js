const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Kcomwel-T100010111005
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 고용산재토탈서비스 일용직 신고 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/kcomwel/T100010111005");

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
        _rest.AddBody("CertFile", _publicCert, true);                       // [암호화] 인증서 공개키(Base64 인코딩)
        _rest.AddBody("KeyFile", _privateKey, true);                        // [암호화] 인증서 개인키(Base64 인코딩)
        _rest.AddBody("CertPassword", Constant.CertPassword, true);         // [암호화] 인증서 암호(Base64 인코딩)
        _rest.AddBody("BusinessNumber", "", true);                          // [암호화] 검색 할 사업자등록번호 또는 주민등록번호(xxxxxxxxxx 또는 xxxxxxxxxxxxx / Base64 인코딩)
        _rest.AddBody("UserGroupFlag", "1", false);                         // 인증서 - 사업장(0)/사무대행(1) 구분
        _rest.AddBody("IndividualFlag", "1", false);                        // 인증서 - 개인(0)/법인(1) 구분
        _rest.AddBody("GwanriNo", "", false);                               // 관리번호
        _rest.AddBody("GybYn", "Y", false);                                 // 고용보험 여부(Y/N)
        _rest.AddBody("SjbYn", "Y", false);                                 // 산재보험 여부(Y/N)
        _rest.AddBody("IljariYn", "N", false);                              // 일자리신청 여부(Y/N)
        _rest.AddBody("RgNo", "", true);                                    // [암호화] 근로자 주민등록번호
        _rest.AddBody("Name", "", false);                                   // 근로자 성명
        _rest.AddBody("Year", "2021", false);                               // 년도(yyyy)
        _rest.AddBody("Month", "09", false);                                // 월(MM)
        _rest.AddBody("BosuChongak", "", false);                            // 보수총액(과세소득)
        _rest.AddBody("GeunroDays", "[4, 9, 11, 18, 21, 25, 30]", false);   // 근로한 일자들("[d, d, ..., d]")
        _rest.AddBody("IlAvgGeunroTm", "8", false);                         // 일평균근로시간
        _rest.AddBody("GukJeok", "100", false);                             // 국적 코드
        _rest.AddBody("JikJongCd", "905", false);                           // 직종 코드

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
        console.log(Response.Result.PdfData);
        FS.writeFileSync('D:/Temp/test_일용직신고.pdf', Buffer.from(Response.Result.PdfData, "base64"));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
