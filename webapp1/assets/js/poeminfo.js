/**
 * Created by 67 on 2018/1/30.
 * 没有消歧处理
 */
var thisURL = document.URL;
var  getval =thisURL.split('?')[1];
var poem= decodeURIComponent(getval.split("=")[1]);//将url字符解码为utf8编码后的诗歌姓名
console.log(poem);
var content=document.getElementById('poem_content');

$.getJSON("http://www.freekg.cn/poet/datasource/unknownquery?name="+poem,function (json) {
    console.log(json);
    console.log(1);
    var poemname=document.createElement("h4");
    var poemauthor=document.createElement("p");
    var poemcontent=document.createElement("h5");
    poemname.innerText=json[0].name;
    poemauthor.innerText=json[0].author;
    poemcontent.innerText=json[0].content;
    content.appendChild(poemname);
    content.appendChild(poemauthor);
    content.appendChild(poemcontent);
});
