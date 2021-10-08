const FS = require("fs");
const Rest = require("../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-Iros-GetPdfFile
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 인터넷등기소의 등기부등본 PDF 발급 endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/iros/getpdffile");
        
        // Body 추가
        _rest.AddBody("TransactionKey", "", false);     // 등본발급 시 리턴받은 트랜잭션 키 (GUID)
        _rest.AddBody("IsSummary", "Y", false);         // 요약 데이터 포함여부(Y/N 공백 또는 다른 문자열일 경우 기본값 Y)
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);

        // PDF 파일 저장
        FS.writeFileSync("D:/Temp/등기부등본PDF발급.pdf", Buffer.from(Response.Message, "base64"));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
