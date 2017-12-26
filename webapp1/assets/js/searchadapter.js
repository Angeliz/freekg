/**
 * Created by Felixy on 2017/7/19.
 */
var thisURL = document.URL;
var getval = thisURL.split('?')[1];
var getval2 = thisURL.split('?')[2];
var poetname = decodeURIComponent(getval.split("=")[1]);//将url字符解码为utf8编码后的诗人姓名
var poeturi = decodeURIComponent(getval2.split("=")[1]);//将url字符解码为utf8之后的诗人uri
var canshu = {
    data: {
        name: poetname,
        value: poeturi
    },
    name: poetname,
    value: poeturi
};
window.setTimeout(doubcl(canshu,2),5000);
