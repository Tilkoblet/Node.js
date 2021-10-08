var UnitTest = UnitTest || {};

UnitTest.Constant = {

    ApiHost: "https://api.tilko.net/",
    
    /*
     * API 키
     * API 키는 틸코 API 홈페이지에서 발급 받으세요.
     * https://tilko.net
    */
    ApiKey: "",
    
    /*
     * 공동인증서 경로 설정
     * 공동인증서는 "C:\Users\[사용자계정]\AppData\LocalLow\NPKI\yessign\USER\[인증서DN명]"에 존재합니다.
    */
    CertPath: process.env[(process.platform == "win32") ? "USERPROFILE" : "HOME"] + "/AppData/LocalLow/NPKI/yessign/USER/[인증서DN명]",
    
    /*
     * 공동인증서 비밀번호
    */
    CertPassword: "",

};

module.exports = {
    UnitTest,
};
