var code ; //在全局 定义验证码
function createCode(){ 
    code = new Array();
    var codeLength = 4;//验证码的长度
    var checkCode = document.getElementById("checkCode");
    checkCode.value = "";

    var selectChar = new                Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

    for(var i=0;i<codeLength;i++) {
        var charIndex = Math.floor(Math.random()*32);
        code +=selectChar[charIndex];
    }
    if(code.length != codeLength){
        createCode();
    }
    checkCode.value = code;
}

function validate () {
    if($("#signIn_username").val().length <=0) {
        alert("请输入帐号！");
        $("#signIn_username")[0].focus();
        return false;
    }
    
    if($("#signIn_password").val().length <=0) {
        alert("请输入密码！");
        $("#signIn_password")[0].focus();
        return false;
    }
    
    if( $("#signIn_identify").val().length <=0) {
        alert("请输入验证码！");
        $("#signIn_identify")[0].focus();
        return false;
    }

    else if( $("#signIn_identify").val().toUpperCase() != code ){
        alert("验证码输入错误！");
        createCode();
        $("#signIn_identify")[0].focus();
        $("#signIn_identify").val("");
        return false;
    }
    
}