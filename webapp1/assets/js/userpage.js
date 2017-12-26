/**
 * Created by Felixy on 2017/7/12.
 */
//添加新的文章方法

// $(function () {
//     $(".icon-add").click(function () {
//         alert("请添加诗人图片！");
//         $(this).hide();
//     })
// });
// $(function () {
//     var $pink = $(".pink-panel");
//     $(".btn-primary").click(function () {
//         alert("nihao");
//       if($pink.is(":visible")){
//           $pink.hide();
//       }
//     })
// },
//     // var $pink = $(".pink-panel");
    // $(".icon-add").toggle(function () {
    //     $pink.show();
    //     $(".icon-add").show();
    // }),function () {
    //     $pink.hide();
    // };
$(function () {
    // $("#article").css("color","black");
    var i = 3;
    $("#memory").click(function () {
        alert("已成功创建新文章！");
        i = i+1;
        $div = '';
        $div = '<div class="panel panel-default">'
            +'<div class="panel-heading" role="tab" id="heading'+i+'">'
            +'<h4 class="panel-title">'
            +'<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+i +'" aria-expanded="false" aria-controls="collapse'+i+'">'
            +$("#article-title").val()+'</a>'
            +'<span class="pull-right"> <a href=""><i class="icon-bin"></i></a></span>'
            +'</h4></div>'
            +'<div id="collapse'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+i+'">'
            +'<div class="panel-body">'
            +$("#article").val() +'</div> </div> </div>';
        $(".panel-group").append($div);
        $("#articlenum").text(i);
        return false;
    });
    $(".icon-bin").click(function () {
        $(this).parent().parent().parent().parent().parent().remove();
        i = i-1;
        $("#articlenum").text(i);
        return false;
    });
    $(".icon-cog52").click(function () {

    })
});
    //     if($pink.is(":visible")){
    //     // alert("请添加诗人信息！确认按钮保存");
    //         $pink.hide();
    //     var $newpanel = $("<div class='col-md-3 new-panel'> <!-- 卡片 --> " +
    //         "<div class='panel'> <div class='panel-body' onclick=''> " +
    //         "<form action='#' class='form-group'>"+
    //         "<h3 class='no-margin' align='center'><input type='text' placeholder='诗人名'></h3> " +
    //         "<samll><span class='pull-left'><input class='small' type='text' placeholder='字，号'></span></samll> <hr/> " +
    //         "<p class='no-margin'>身份：<span>诗人</span></p> " +
    //         "<p class='no-margin'>别名：<span><input type='text'></span></p> " +
    //         "<p class='no-margin'>民族：<span>汉族</span></p> " +
    //         "<p class='no-margin'>所处朝代：<span>唐朝</span></p> " +
    //         "<p class='no-margin'>出生时间：<span><input type='text' id='borntime'></span></p> " +
    //         "<p class='no-margin'>去世时间：<span><input type='text' id='deathtime'></span></p> " +
    //         "<p class='no-margin'>出生地点：<span><input type='text' id='bornarea'></span></p> " +
    //         "<p class='no-margin'>去世地点：<span><input type='text' id='deathaera'></span></p> " +
    //         "<p class='no-margin'>代表作品：<span><input type='textarea'></span></p> " +
    //         "<p class='no-margin'>成就：<span><input type='textarea'></span></p> " +
    //         "<p class='no-margin pull-right'><input class='btn-primary' type='button' value='确定'>" +
    //         "<input class='btn-default' type='reset' value='清空'></p>"+
    //         "</form></div> </div></div>");
    //     $(".row").append($newpanel);
    //     }
    //     // $pink.hide();
    // });
    // $(".btn-primary").click(function () {
    //     // alert("操作成功");
    //     if($pink.is(":visible")){
    //         $pink.hide();
    //     }else{
    //         $(".new-panel").after($pink);
    //         $pink.show();
    //         $(".new-panel").removeClass("new-panel");
    //     }
    //     // $pink.show();
    // });

// 重要的部分代码
/*function addnewcard() {
    // alert("yes");
    $pink = $(".bg-pink-400");
    $pink.hide();
    var $newpanel = $("<div class='col-md-3 new-panel'> <!-- 卡片 --> " +
        "<div class='panel'> <div class='panel-body' onclick=''> " +
        "<h3 class='no-margin' align='center'>" + $("#name").val()+ "</h3> " +
        "<span class='pull-left'>" + $("#zihao").val() + "</span><hr/> " +
        "<p class='no-margin'>身份：<span>诗人</span></p> " +
        "<p class='no-margin'>别名：<span>" + $("#altname").val() + "</span></p> " +
        "<p class='no-margin'>民族：<span>汉族</span></p> " +
        "<p class='no-margin'>所处朝代：<span>唐朝</span></p> " +
        "<p class='no-margin'>出生时间：<span>" + $("#borntime").val() + "</span></p> " +
        "<p class='no-margin'>去世时间：<span>" + $("#deathtime").val() + "</span></p> " +
        "<p class='no-margin'>出生地点：<span>" + $("#bornplace").val() + "</span></p> " +
        "<p class='no-margin'>去世地点：<span>" + $("#deathplace").val() + "</span></p> " +
        "<p class='no-margin'>代表作品：<span>" + $("#famous").val() + "</span></p> " +
        "<p class='no-margin'>成就：<span>" + $("#achievement").val() + "</span></p> " +
        "</div> </div></div>");
    $(".row").append($newpanel);
    $(".bs-example-modal-lg").on('hiden.bs.modal',function () {
        body.style.paddingRight = "0px";
    });
    $pink.show("slow");
}*/


function addnewarticle() {
    alert("添加了新卡片！");
}