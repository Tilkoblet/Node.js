const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Iros-REVTWelcomeEvtC
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 인터넷등기소의 등기신청사건 처리현황 조회 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/iros/revtwelcomeevtc");
        
        // Body 추가
        _rest.AddBody("IrosID", "", true);                  // [암호화] iros.go.kr 로그인 ID(Base64 인코딩)
        _rest.AddBody("IrosPwd", "", true);                 // [암호화] iros.go.kr 로그인 패스워드(Base64 인코딩)
        _rest.AddBody("UniqueNo", "", false);               // 부동산 고유번호('-'을 제외한 14자리)
        _rest.AddBody("InsRealClsCd	", "", false);          // 구분(공백시 건물) 토지 : 0 / 건물 : 1 / 집합건물 : 2
        _rest.AddBody("A103Name", "", false);               // 소유자명
       
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);

        // PDF 파일 저장
        FS.writeFileSync("D:/Temp/등기부등본PDF발급.pdf", Buffer.from(Response.Message, "base64"));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
