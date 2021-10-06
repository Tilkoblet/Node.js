const FS = require("fs");
const Rest = require("../../../REST").Tilko.API.REST;
const Constant = require("../../../Constant").Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Iros-RISURetrieve
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 인터넷등기소의 등기부등본 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/iros/risuretrieve");
        
        // Body 추가
        _rest.AddBody("IrosID", "", true);          // [암호화] iros.go.kr 로그인 ID(Base64 인코딩)
        _rest.AddBody("IrosPwd", "", true);         // [암호화] iros.go.kr 로그인 패스워드(Base64 인코딩)
        _rest.AddBody("EmoneyNo1", "", true);       // [암호화] 전자지불 선불카드 총 12자리 중 영문을 포함한 앞 8자리 입력(Base64 인코딩)
        _rest.AddBody("EmoneyNo2", "", true);       // [암호화] 전자지불 선불카드 총 12자리 중 나머지 뒤 4자리 숫자 입력(Base64 인코딩)
        _rest.AddBody("EmoneyPwd", "", true);       // [암호화] 전자지불 선불카드 비밀번호(Base64 인코딩)
        _rest.AddBody("UniqueNo", "", false);       // 부동산 고유번호('-'을 제외한 14자리)
        _rest.AddBody("JoinYn", "N", false);        // 공동담보/전세목록 추출여부(Y/N 공백 또는 다른 문자열일 경우 기본값 N)
        _rest.AddBody("CostsYn", "N", false);       // 매매목록추출여부(Y/N 공백 또는 다른 문자열일 경우 기본값 N)
        _rest.AddBody("DataYn", "N", false);        // 전산폐쇄추출여부(Y/N 공백 또는 다른 문자열일 경우 기본값 N)
        _rest.AddBody("ValidYn", "N", false);       // 유효사항만 포함여부(Y/N 공백 또는 다른 문자열일 경우 기본값 N)
        _rest.AddBody("IsSummary", "Y", false);     // 요약데이터 표시여부(Y/N 공백 또는 다른 문자열일 경우 기본값 Y)
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);

        console.log("TransactionKey:", Response.TransactionKey);
    } catch (e) {
        console.error(e);
    }

})(Tilko);
