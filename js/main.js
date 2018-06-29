/*
js 字符串操作：
concat() 连接连接多个字符串，返回连接后的字符串；
replace() 替换与正则表达式匹配的子串；
substring() 提取字符串中的两个指定的索引号之间的字符；
*/

function changeBgImg() {
	alert("333");
	var img1 = document.getElementById('blur-bg'); //id码
	var img2 = document.getElementById('head-banner');
	var bgImg1 = img1.style.backgroundImage; //获取当前背景图片地址
	var numValue = bgImg1.replace(/[^0-9]/ig, ""); //提取当前背景图片编号
	numValue = Number(numValue) + Number(1); //编号加 1
	var maxCnt = 16;
	if (numValue > maxCnt) {
		numValue = 1;
	}
	var name = 'url(image/main/bgimg_' + numValue + '.png)';
	alert(name);
	console.log(name);
	img1.style.backgroundImage = name;
	img2.style.backgroundImage = name;
}

window.onscroll = function goTopVisable() { //id = go-top-m
	var h = document.documentElement.scrollTop + document.body.scrollTop;

	if (h > 100) {
		document.getElementById("go-top-m").style.display = "block";
		document.getElementById("go-top-m").style.opacity = h / 200 - 0.5; //过渡渐变效果
	} else {
		document.getElementById("go-top-m").style.display = "none";
	}
}

function pageScroll() //回到顶部
{
	//把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）    
	window.scrollBy(0, -25);
	//延时递归调用，模拟滚动向上效果    
	scrolldelay = setTimeout('pageScroll()', 2);
	//获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值    
	var sTop = document.documentElement.scrollTop + document.body.scrollTop;
	//判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）    
	if (sTop == 0) clearTimeout(scrolldelay);
}

function js_click() { //测试程序
	alert("js_单击");
}