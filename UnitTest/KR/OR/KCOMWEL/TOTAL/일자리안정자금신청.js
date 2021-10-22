const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Kcomwel-T100010191014
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 고용산재토탈서비스 일자리 안정 자금 신청 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/kcomwel/T100010191014");

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
        _rest.AddBody("GwanriNo", "", false);                           // 관리번호
        _rest.AddBody("RgNo", "", true);                                // [암호화] 근로자 주민등록번호(13자리)
        _rest.AddBody("GeupyeoPrc", "", false);                         // 월평균보수
        _rest.AddBody("JuSojeongGeunroTm", "40", false);                // 주 소정 근로시간
        _rest.AddBody("GamsidansokYn", "N", false);                     // 감시단속여부(Y/N)
        _rest.AddBody("Mm3MimanSuseopYn", "N", false);                  // 수습여부(Y/N)
        _rest.AddBody("JaGeupyeoFg", "1", false);                       // 급여지급형태 - 월급: 1 / 주급: 2 / 시간급: 3
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
        console.log(Response.Result.PdfData);
        FS.writeFileSync('D:/Temp/test_일자리안정자금신청.pdf', Buffer.from(Response.Result.PdfData, "base64"));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
