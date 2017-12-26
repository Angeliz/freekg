/**
 * Created by Yuero on 2017/10/14.
 */


    // console.log("js文件加载");
var pareparam = $("bady");
$(function () {
        $.getJSON('datasource/poetcardlist?max='+60,function (data) {
            console.log("card列表")
            console.log(data);
            for(i=0;i<data.length;i++) {
                var div = '';
                // div = div + '<div class="panel panel-body jia" onclick="fuck('+i+');">'原生js写的一个测试
                div = div + '<div class="panel panel-body">'
                    +'<h3 class="no-margin" align="center">'+data[i].name+'</h3><br/>'
                    +'<span class="pull-left">'+data[i].alter_name+'</span>' +'<hr/>'
                +'<p class="no-margin">所处朝代：<span>唐朝</span></p>'
                +'<p class="no-margin">出生时间：<span>'+data[i].born+'</span></p>'
                +'<p class="no-margin">去世时间：<span>'+data[i].death+'</span></p>'
                +'<p class="no-margin">介绍：<span>'+data[i].info+'</span></p>'
                +'</div>';
                j = i+2;
                console.log("j="+j+",i="+i);
                switch (i%4){
                    case 0:
                        $(".col0").append(div);
                        break;
                    case 1:
                        $(".col1").append(div);
                        break;
                    case 2:
                        $(".col2").append(div);
                        break;
                    case 3:
                        $(".col3").append(div);
                        break;
                    // case 0:
                    //     div = '<div class="row">'+div;
                    //     $(".panel3").after(div).removeClass("panel3");
                    //     $(".panel3 + div + div").addClass("panel0");
                    //     break;
                    // case 1:
                    //     $(".panel0").after(div).removeClass("panel0");
                    //     $(".panel0 + div + div").addClass("panel1");
                    //     break;
                    // case 2:
                    //     $(".panel1").after(div).removeClass("panel1");
                    //     $(".panel1 + div + div").addClass("panel2");
                    //     break;
                    // case 3:
                    //     div = div + '</div><br>';
                    //     $(".panel2").after(div).removeClass("panel2");
                    //     $(".panel2 + div + div").addClass("panle3");
                    //     break;
                // $(".row").append(div);
                }
            }
        });

$("body").on("click",".panel-body",function () {
    console.log("被执行");
    var poetname = $(this).children("h3").text();
    console.log(poetname);
    // window.location.href="poetinfo.htm"+"?poetname="+poetname;
    window.location.assign("poetinfo.html?poetname="+poetname+"?uri=null");
    //+pareparam.data.value
    //跳转到诗人主页
})
});
    // $(".panel-body").on("click",function () {
    //     console.log("被执行");
    //     var poetname = $(this).children("h3").text();
    //     console.log(poetname);
    // }

// function fuck(m){
//     // alert("fuck"+m);//m时进行传值，此处m是等于i的
// }


