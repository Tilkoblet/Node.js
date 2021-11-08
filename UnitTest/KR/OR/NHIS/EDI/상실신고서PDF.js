const FS = require("fs");
const Rest = require("../../../../../Tilko.API/REST").Tilko.API.REST;
const Constant = require("../../../../../UnitTest/Constant").UnitTest.Constant;

var Tilko = Tilko || {};

(function (_Tilko) {

    // API 상세설명 URL
    // https://tilko.net/Help/Api/POST-api-apiVersion-NhisEdi-SangSilSingoPdf
    
    try {
        let _rest = new Rest(Constant.ApiKey);
        _rest.Init();

        // 건강보험공단 EDI의 상실 신고서 PDF endPoint 설정
        _rest.SetEndPointUrl(Constant.ApiHost + "api/v1.0/nhisedi/SangSilSingoPdf");

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
        _rest.AddBody("FirmName", "", false);                           // 사업장명(위임사업장 선택 조회 후 받은 FirmName 값)
        _rest.AddBody("CrfName", "", false);                            // CrfName(보낸문서 리스트 조회 후 받은 DocId 값)
        _rest.AddBody("WrtChasu", "", false);                           // 작성일차수(보낸문서 리스트 조회 후 받은 WrtChasu 값)
        _rest.AddBody("WrtDupSeq", "", false);                          // 작성일차수 Seq(보낸문서 리스트 조회 후 받은 WrtDupSeq 값)
        _rest.AddBody("FirmSym", "", false);                            // 사업장기호(보낸문서리스트 조회 후 받은 FirmSym 값)
        _rest.AddBody("UnitFirmSym", "", false);                        // 단위사업장기호(보낸문서리스트 조회 후 받은 UnitFirmSym 값)
        _rest.AddBody("MenuName", "", false);                           // MenuName(보낸문서리스트 조회 후 받은 DocNm 값)
        
        // API 호출
        const Response = _rest.Call();
        console.log("Response:", Response);
        console.log(Response.PdfData);
        FS.writeFileSync('D:/Temp/test_상실신고서.pdf', Buffer.from(Response.PdfData, "base64"));
    } catch (e) {
        console.error(e);
    }

})(Tilko);
