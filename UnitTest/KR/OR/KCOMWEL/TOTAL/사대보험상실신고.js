const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Kcomwel-SamuSangsilSingo
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 고용산재토탈의 4대보험 상실신고 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/kcomwel/samusangsilsingo");

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
        _rest.AddBody("KeyFile", _privateKey, true);                       // [암호화] 인증서 개인키(Base64 인코딩)
        _rest.AddBody("CertPassword", Constant.CertPassword, true);        // [암호화] 인증서 암호(Base64 인코딩)
        _rest.AddBody("BusinessNumber", "", true);                         // [암호화] 검색 할 사업자등록번호 또는 주민등록번호(xxxxxxxxxx 또는 xxxxxxxxxxxxx / Base64 인코딩)
        _rest.AddBody("UserGroupFlag", "", false);                         // 인증서 - 사업장(0)/사무대행(1) 구분
        _rest.AddBody("IndividualFlag", "", false);                        // 인증서 - 개인(0)/법인(1) 구분
        _rest.AddBody("GwanriNo", "", false);                              // 관리번호
        _rest.AddBody("GeunrojaRgNo", "", true);                           // [암호화]근로자 주민등록번호(xxxxxxxxxxxxx / Base64 인코딩)
        _rest.AddBody("SangsilDt", "", false);                             // 상실일자(yyyyMMdd)    
        _rest.AddBody("DBosuChongak", "", false);                          // 당해년도 보수총액
        _rest.AddBody("DSanjengMM", "", false);                            // 당해년도 근무개월수
        _rest.AddBody("JBosuChongak", "", false);                          // 전년도 보수총액
        _rest.AddBody("JSanjengMM", "", false);                            // 전년도 근무개월수
        _rest.AddBody("SangsilSayu", "", false);                           // 상실사유 - 개인사정으로인한자진퇴사(0)/사업장이전근로조건변동임금체불등으로자진퇴사(1)/폐업도산(2)/경영상필요및회사불황으로인원감축등에의한퇴사해고권고사직명예퇴직포함(3)/예술인근로자의귀책사유에의한징계해고권고사직(4)/정년(5)/계약기간만료공사종료(6)/고용보험비적용(7)/이중고용(8)
        _rest.AddBody("SangsilSayuDetail", "", false);                     // 구체적 사유
        _rest.AddBody("NHICSangsilBuhoCd", "", false);                     // 건강보험 상실 부호 - 퇴직(0)/사망(1)/의료급여수급권자(2)/유공자등건강보험배제신청(3)/기타외국인당연적용제외등(4)
        _rest.AddBody("NPSSangsilBuhoCd", "", false);                      // 국민연금 상실 부호 - 사망(0)/사용관계종료(1)/국적상실국외이주(2)/육십세도달(3)/다른공적연금가입(4)/전출통폐합(5)/국민기초생활보장법에따른수급자(6)/노령연금수급권취득자중특수직종60세미만(7)/협정국연금가입(8)/체류기간만료외국인(9)/적용제외체류자격외국인(10)

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
