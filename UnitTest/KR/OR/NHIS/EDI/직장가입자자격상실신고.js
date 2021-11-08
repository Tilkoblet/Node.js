const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-NhisEdi-JGBB_030
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 건강보험공단 EDI의 직장가입자 자격 상실 신고 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhisedi/JGBB_030");

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
        _rest.AddBody("IdentityNumber", "", true);                      // [암호화] 검색 할 위임 사업자등록번호(xxxxxxxxxx / Base64 인코딩)
        _rest.AddBody("FirmMgmtNo", "", false);                         // 사업장관리번호(위임사업장 선택 조회 후 받은 FirmMgmtNo 값)
        _rest.AddBody("FirmSym", "", false);                            // 사업장기호(위임사업장 선택 조회 후 받은 FirmSym 값)
        _rest.AddBody("UnitFirmSym", "", false);                        // 단위사업장기호(위임사업장 선택 조회 후 받은 UnitFirmSym 값)
        _rest.AddBody("GeunrojaName", "", false);                       // 근로자 성명
        _rest.AddBody("GeunrojaRgNo", "", true);                        // 근로자 주민등록번호(13자리)
        _rest.AddBody("SangsilDt", "", false);                          // 상실일자(yyyyMMdd)
        _rest.AddBody("DBosuChongak", "", false);                       // 당해년도 보수총액
        _rest.AddBody("DSanjengMM", "", false);                         // 당해년도 근무개월수
        _rest.AddBody("JBosuChongak", "", false);                       // 전년도 보수총액
        _rest.AddBody("JSanjengMM", "", false);                         // 전년도 근무개월수
        _rest.AddBody("LossRsnTypeCd", "", false);                      // 상실사유 - 11: 개인사정으로인한자진퇴사, 12: 사업장이전근로조건변동임금체불등으로자진퇴사, 22: 폐업도산, 23: 경영상필요및회사불황으로인한인원감축등에따른퇴사해고권고사직명예퇴직포함, 26: 근로자의귀책사유에의한징계해고권고사직, 31: 정년, 32: 계약기간만료공사종료, 41: 고용보험비적용, 42: 이중고용
        _rest.AddBody("SangsilSayuDetail", "", false);                  // 구체적 사유
        _rest.AddBody("NhicLossCd", "", false);                         // 건강보험 상실부호 - 0: 지부설립, 1: 퇴직, 2: 사망, 4: 의료급여책정, 5: 직장가입자로변경, 10: 국가유공자건강보험배제신청, 13: 기타, 17: 국적상실, 19: 이민출국, 24: 지부가입제외외국의법령설립, 25: 가입제외외국의보험, 26: 가입제외사용자부담, 58: 무보수대표자지정직장, 64: 재외국민주민등록
        _rest.AddBody("NpcLossCd", "", false);                          // 국민연금 상실부호 - 1: 사망, 15: 조기노령연금수급권취득조기노령연금의지급이정지중인경우는제외, 16: 협정국연금가입, 19: 체류기간만료외국인, 20: 적용제외체류자격외국인, 21: 무보수대표이사, 22: 근로자제외, 3: 사용관계종료, 4: 국적상실국외이주, 5: 육십세도달, 6: 다른공적연금가입, 9: 전출통폐합

        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
