/**
 * Created by 67 on 2018/1/28.
 */

// console.log("js文件加载");
var pareparam = $("bady");
$(function () {
    $.getJSON('http://www.freekg.cn/poet/datasource/work?poeturi='+'http://www.freekg.com/poet/115',function (data) {
        console.log("card列表");
        console.log(data);
        for(i=0;i<20;i++) {
            var div = '';
            div = div + '<div class="panel panel-body">'
                +'<h3 class="no-margin" align="center">'+data[i].name+'</h3><br/>'
                +'<span class="pull-left">'+'作者：岑参'+'</span>'
                +'<hr/>'
                +'<p class="no-margin"><span>'+data[i].content+'</span></p>'
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
            }
        }
    });

    $("body").on("click",".panel-body",function () {
        console.log("被执行");
        var poemname = $(this).children("h3").text();
        // console.log(poetname);
        window.location.assign("poeminfo.html?poemname="+poemname);
    })
});

