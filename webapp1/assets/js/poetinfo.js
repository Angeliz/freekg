/**
 * Created by Felixy on 2017/6/25.
 */
<!--本js文件仅针对poetinfo页面-->
<!--设置head位置显示的诗人姓名标签-->
var thisURL = document.URL;
var  getval =thisURL.split('?')[1];
var getval2=thisURL.split('?')[2];
var poetname= decodeURIComponent(getval.split("=")[1]);//将url字符解码为utf8编码后的诗人姓名
var poeturi=decodeURIComponent(getval2.split("=")[1]);//将url字符解码为utf8之后的诗人uri
var poetinfo_breadcrumb=document.getElementById("poetinfo_breadcrumb");
var poet_name=document.createElement("li");
poet_name.setAttribute("class","active");
var poet_name_text=document.createTextNode(poetname);//将李白换成传入的参数
poet_name.appendChild(poet_name_text);
poetinfo_breadcrumb.appendChild(poet_name);
var poet_name_title=document.getElementById("poet_name_title");//设置诗人姓名标题
var poet_name2=document.createTextNode(poetname);
poet_name_title.appendChild(poet_name2);
console.log(poeturi);
<!--获取诗人图片模块-->
$.ajax({
    url:"https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord+=&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&word="+poetname+"&z=&ic=0&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&step_word=李白&pn=30&rn=30&gsm=1e&1498361707726=",
    dataType:'jsonp',
    processData: false,
    type:'get',
    success:function(json){
        console.log("下面输出返回结果");
        console.log(json);
        var poet_main_image=document.getElementById("poet_main_image");
        poet_main_image.setAttribute("src",json.data[1].middleURL);
        var photos=document.getElementById("photosplaceholder");
        var count=2;
        for(var a=0;a<3;a++){
            var col=document.createElement("div");
            col.setAttribute("class","col-lg-4 col-sm-4");
            for(var i=0;i<2;i++){
                var photo=document.createElement("p");
                var photoin=document.createElement("a");
                var photoinin=document.createElement("img");
                photoin.setAttribute("href",json.data[count].middleURL);
                photoinin.setAttribute("src",json.data[count].middleURL);
                photoinin.setAttribute("class","img-responsive img-rounded");
                photoin.appendChild(photoinin);
                photo.appendChild(photoin);
                count++;
                col.appendChild(photo);
            }
            photos.appendChild(col);
        }
    },
    error:function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(XMLHttpRequest.readyState);
        alert(textStatus);
    }});
<!--生成整个页面判断诗人的对象-->
var param={
    data:{
        name:poetname,
        value:poeturi
    },
    name:poetname
};
function showtupupage() {
    doubcl(param);
}
var tupusum=document.getElementById("tupusum");
tupusum.onclick=function () {
    showpoettupusum();
}
function showpoettupusum() {
    window.location.assign("poetinfo.html?poetname="+pareparam.data.name+"?uri="+pareparam.data.value);
}
