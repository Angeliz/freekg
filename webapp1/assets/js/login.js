/**
 * Created by Felixy on 2017/6/29.
 */
//判断用户状态为已经登陆时，不显示登陆窗口，直接显示用户界面
console.log("下面输出localstorage");
console.log(localStorage.haslogin);
if(localStorage.haslogin=="true"){
    $("#loginbox").hide();
    $("#registerbox").hide();
    $("#inform_module").show();
    $("#usermodule").show();
}
$("#create").click(function(){
    check_register();
    return false;
})
$("#login").click(function(){
    check_login();
    return false;
})
$("#quitlogin").click(function () {
    quitlogin();
    return false;
})


function check_login(){
    var name=$("#user_name").val();
    var pass=$("#password").val();
    $.get("logina?username="+name+"&password="+pass,function (data) {
        console.log(data);
        if(data!="-1"){
            $("#user_name").val("");
            $("#password").val("");
            $("#loginbox").hide();
            $("#registerbox").hide();
            $("#inform_module").show();
            $("#usermodule").show();
            localStorage.haslogin="true";
            $("#modal_form_inline").modal("hide");
            // window.location.assign("catalog.html");
        }else{
            alert("用户名密码无效");
            $("#user_name").val("");
            $("#password").val("");
            $("#login_form").removeClass('shake_effect');
            setTimeout(function()
            {
                $("#login_form").addClass('shake_effect')
            },1);
        }
    })
}
function check_register(){
    var name = $("#r_user_name").val();
    var pass = $("#r_password").val();
    var email = $("#r_repeat").val();
    if(pass ==email&& pass !="" && email != ""){
        if(name!="" && pass !="" && email != "")
        {
            $.get("register?name="+name+"&pass="+pass,function (data) {
                alert(data);
            })
            alert("注册成功！");
            $("#user_name").val("");
            $("#password").val("");
        }
        else
        {
            $("#login_form").removeClass('shake_effect');
            setTimeout(function()
            {
                $("#login_form").addClass('shake_effect')
            },1);
        }
    }else {
        alert("请重新输入，两次输入密码不一致");
    }

}
function quitlogin() {
    $("#user_name").val("");
    $("#password").val("");
    $("#loginbox").show();
    $("#registerbox").show();
    $("#inform_module").hide();
    $("#usermodule").hide();
    localStorage.haslogin="false";
    if(localStorage.nowlocation=="userpage.html"){
        window.location.assign("index.html");
    }

}