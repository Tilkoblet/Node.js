const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-HometaxAgent-UTESFABG25-SuImNabSeJa-SinYongCard-MaeChulJaLyo
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 홈택스의 신용카드 매출자료 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/hometaxagent/utesfabg25/suimnabseja/sinyongcard/maechuljalyo");

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
        _rest.AddBody("AgentId", "", true);                             // [암호화] 세무대리인 ID(세무대리 관리번호가 있는 경우 / Base64 인코딩)
        _rest.AddBody("AgentPassword", "", true);                       // [암호화] 세무대리인 암호(세무대리 관리번호가 있는 경우 / Base64 인코딩)
        _rest.AddBody("BusinessNumber", "", true);                      // [암호화] 검색 할 사업자등록번호 또는 주민등록번호(xxxxxxxxxx 또는 xxxxxxxxxxxxx / Base64 인코딩)
        _rest.AddBody("Year", "2020", false);                           // 검색년도(yyyy) 공백일 경우 검색 기준 해
        _rest.AddBody("StartQuarter", "", false);                       // 검색시작분기(1분기 : 1 / 2분기 : 2 / 3분기 : 3 / 4분기 : 4) 공백일 경우 검색 기준 분기
        _rest.AddBody("EndQuarter", "", false);                         // 검색종료분기(1분기 : 1 / 2분기 : 2 / 3분기 : 3 / 4분기 : 4) 공백일 경우 검색 기준 분기

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
