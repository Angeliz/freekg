/**
 * Created by Felixy on 2017/11/25.
 */
<!--设置head位置显示的诗人姓名标签-->
var thisURL = document.URL;
var  getval =thisURL.split('?')[1];
var poem= decodeURIComponent(getval.split("=")[1]);//将url字符解码为utf8编码后的诗歌姓名
console.log(poem);
$(function () {
    $.getJSON("datasource/poemquery?name="+convert(1,poem),function (json) {
        console.log(convert(0,json));
    });
})