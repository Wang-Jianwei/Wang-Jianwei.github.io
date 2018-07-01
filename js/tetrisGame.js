

var M = 20;
var N = 10;

//初始化偏移量差值
var offset_x = 0;
var offset_y = 0;

//当前下落方块横向位移
var delta_move = 0;

//下落间隔时间 1000ms
var delta_time = 1000;
var history_time = 1000;

var left_out = 0;
var right_out = 0;
var down_out = 0;

var score_cnt = 0;

var puse_bool = false;

//鼠标操作用
var x = 0;
var y = 0;

//num参数初始化 num[M][N]
var num = new Array(); 
for (var i = 0; i < M; i++) {
	num[i] = new Array();
	for (var j = 0; j < N; j++) {
		num[i][j] = 0;
	}	
}

//游戏网格界面初始化 20*10 12px*12px
for (var i = 0; i < M; i++) { 
	for (var j = 0; j < N; j++) {
		num[i][j] = document.createElement('div');
		num[i][j].id = 'num_'+i+'_'+j; //id = num_i_j;
		num[i][j].style.float = "left";
		num[i][j].style.width = '12px';
		num[i][j].style.height = '12px';
		num[i][j].style.border = '1px solid #ccc';
		num[i][j].style.backgroundColor = '#aaa';
		// num[i][j].style.borderRadius = '2px';
		document.getElementById("game-platform").appendChild(num[i][j]);
	}
}

//生成nextShape p[4][2] 
var p = new Array(); 
for (var i = 0; i < 4; i++) {
	p[i] = new Array();
	for (var j = 0; j < 2; j++) {
		p[i][j] = 0;
	}
}

//移除某个节点下所有子节点
function removeAllChlid(arg) { 
	var node = document.getElementById(arg);

	while(node.hasChildNodes())
	{
		node.removeChild(node.childNodes[0]);
	}
}

//获取下一个方块形状，4个小方块坐标偏移值存于 p[][]
function newShape() { 
	p[0][0] = 0; //x
	p[0][1] = 0; //y
	var s = 0;
	var t = 0;

	function set(arg) {
		s = Math.floor(Math.random()*4+1); //s = -1,0,1;
		t = Math.floor(Math.random()*arg+1) - 1;
		switch (s) {
			case 1:
				p[arg][0] = p[t][0] - 1;
				p[arg][1] = p[t][1];
				break;
			case 2:
				p[arg][0] = p[t][0];
				p[arg][1] = p[t][1] + 1;
				break;
			case 3:
				p[arg][0] = p[t][0] + 1;
				p[arg][1] = p[t][1];
				break;
			case 4:
				p[arg][0] = p[t][0];
				p[arg][1] = p[t][1] - 1;
				break;
		}
	}

	function checkOk(arg1,arg2,arg3) {
		for (var j = 0; j < arg3; j++) {
			if (arg1==p[j][0] && arg2==p[j][1]) {
				return 0;
			}
		}
		return 1;
	}

	for (var i = 1; i < 4; i++) {
		while(1) {
			set(i);
			if (checkOk(p[i][0], p[i][1], i)) {
				if (offset_x < p[i][0]) {
					offset_x = p[i][0];
					offset_y = p[i][1];
				}
				break;
			}
		}
	}

	for (var i = 0; i < 4; i++) {
		p[i][0] -= offset_x;
	}
	offset_x = 0;
}

//current参数初始化 current[4][2]，获取当前形状偏移数据（坐标）
var current = new Array(); 
for (var i = 0; i < 4; i++) {
	current[i] = new Array();
	for (var j = 0; j < 2; j++) {
		current[i][j] = 0;
	}	
}

//初始化并显示
var currentDiv = new Array();
function creatShape() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 2; j++) {
			current[i][j] = p[i][j];
		}	
	}

	//中心点重定位
	var mid_y = 0;
	var max = current[0][1];
	var min = current[0][1];
	
	for (var i = 1; i < 4; i++) {
		max = (max < current[i][1]) ? current[i][1] : max;
		min = (min > current[i][1]) ? current[i][1] : min;
	}
	mid_y = Math.floor((max + min)/2);

	//展示
	for (var j = 0; j < 4; j++) {
		current[j][0] = current[j][0]-1;
		current[j][1] = current[j][1]-mid_y+4;

		currentDiv[j] = document.createElement('div');
		currentDiv[j].id = 'currentDiv_'+j;
		currentDiv[j].style.position = 'absolute';
		currentDiv[j].style.zIndex = '200';
		currentDiv[j].style.width = '12px';
		currentDiv[j].style.height = '12px';
		currentDiv[j].style.border = '1px solid #ccc';
		currentDiv[j].style.backgroundColor = '#444';
		currentDiv[j].style.top = (current[j][0]*14) + 'px';
		currentDiv[j].style.left = (current[j][1]*14) + 'px';
		// currentDiv[j].innerHTML = j;
		currentDiv[j].style.lineHeight = '12px';
		currentDiv[j].style.textAlign = 'center';
		currentDiv[j].style.borderRadius = '2px';
		document.getElementById("game-platform").appendChild(currentDiv[j]);
	}
}



function nextDisplay() {
	newShape();
	removeAllChlid('next');

	//中心点重定位
	var mid_x = 0;
	var mid_y = 0;
	var max = p[0][0];
	var min = p[0][0];
	for (var i = 1; i < 4; i++) {
		max = (max < p[i][0]) ? p[i][0] : max;
		min = (min > p[i][0]) ? p[i][0] : min;
	}
	mid_x = (max + min)/2;
	max = p[0][1];
	min = p[0][1];
	for (var i = 1; i < 4; i++) {
		max = (max < p[i][1]) ? p[i][1] : max;
		min = (min > p[i][1]) ? p[i][1] : min;
	}
	mid_y = (max + min)/2;

	//展示
	var m = new Array();
	for (var j = 0; j < 4; j++) {
		m[j] = document.createElement('div');
		m[j].style.position = 'absolute';
		m[j].style.width = '12px';
		m[j].style.height = '12px';
		m[j].style.border = '1px solid #ccc';
		m[j].style.backgroundColor = '#444';
		m[j].style.top = (21+(p[j][0]-mid_x)*14)+'px';
		m[j].style.left = (21+(p[j][1]-mid_y)*14)+'px';
		document.getElementById("next").appendChild(m[j]);
	}
}

function initPage() {
	newShape();
	creatShape();
	newShape();
	nextDisplay();
}

function inGame() {
	creatShape();
	newShape();
	nextDisplay();
}

function up() {
	if (!puse_bool) {
		// 改变方向
		currentRotate();
	}
}

function downBack() {
	// 加速还原
	delta_time = history_time;
}

function downAdd() {
	// 加速
	currentCollisionX();
	if (down_out == 1 || puse_bool == true) {
		return 0;
	}
	for (var i = 0; i < 4; i++) {
		current[i][0] = current[i][0] + 1;
		currentDiv[i].style.top = (current[i][0]*14) + 'px';
	}
	delta_time = 20;
}

function left() {
	currentCollisionY()
	if (left_out == 1 || puse_bool == true) {
		left_out = 0;
		return 0;
	}
	delta_move = -1;
	currentMove(delta_move);
}

function right() {
	currentCollisionY()
	if (right_out == 1 || puse_bool == true) {
		right_out = 0;
		return 0;
	}
	delta_move = 1;
	currentMove(delta_move);
}

//对当前方块进行键盘操作
function currentOption() {
	onkeydown = function speedAdd() {
		var keycode = event.keyCode;
		switch (keycode)
		{
			case 38:
				// up();
				break;
			case 40:
				downAdd();
				break;
			case 37:
				// left();
				break;
			case 39:
				// right();
				break;
			default:
				break;
		}
	}

	onkeyup = function keyUp() {
		var keycode = event.keyCode;
		switch (keycode)
		{
			case 38:
				up();
				break;
			case 40:
				downBack();
				break;
			case 37:
				left();
				break;
			case 39:
				right();
				break;
			default:
				break;
		}
	}

	onmousedown = function mouseDown() {
	x = event.clientX;
	y = event.clientY;	
	}

	onmouseup = function mouseUp() {
	if ((event.clientY < y) && ((y - event.clientY) > Math.abs(event.clientX - x))) {
		up();
	}
	if ((event.clientY > y) && ((event.clientY - y) > Math.abs(event.clientX - x))) {
		if (puse_bool == false) {
			currentCollisionX();
			while (!down_out) {
				for (var i = 0; i < 4; i++) {
					current[i][0] = current[i][0] + 1;
					currentDiv[i].style.top = (current[i][0]*14) + 'px';
				}
				currentCollisionX();
			}
		}
	}
	if ((event.clientX < x) && ((x - event.clientX) > Math.abs(event.clientY - y))) {
		left();
	}
	if ((event.clientX > x) && ((event.clientX - x) > Math.abs(event.clientY - y))) {
		right();
	}
}
}

//当前方块下落 （重要函数）
function currentFlow() {
	if (puse_bool) {
		;
	}
	else {
		currentCollisionX();
		//新方块生成
		if (down_out) { 
			down_out = 0;
			delta_time -= 5;
			history_time = delta_time;
			score(10);
			assimilate();
			ifClearLine();
			inGame();
			currentFlow();
			currentOption();
			return 0;
		}
		for (var i = 0; i < 4; i++) {
			current[i][0] = current[i][0] + 1;
			currentDiv[i].style.top = (current[i][0]*14) + 'px';
		}
	}
	setTimeout(currentFlow,delta_time);						
}

//当前方块水平移动(暂时为单步运行)
function currentMove(arg_move) {
	for (var i = 0; i < 4; i++) {
		current[i][1] = current[i][1] + arg_move;
		currentDiv[i].style.left = (current[i][1]*14) + 'px';
	}
}

//当前方块旋转
function currentRotate() {

	//寻找中心点
	var mid_x = 0;
	var mid_y = 0;
	for (var i = 0; i < 4; i++) {
		mid_x += current[i][0];
		mid_y += current[i][1];
	}
	mid_x = mid_x/4;
	mid_y = mid_y/4;

	var if_rotate = true;
	var get = new Array(); 
	for (var i = 0; i < 4; i++) {
		get[i] = new Array();
		for (var j = 0; j < 2; j++) {
			get[i][j] = 0;
		}	
	}

	for (var i = 0; i < 4; i++) {
		get[i][0] = Math.round(mid_x + (current[i][1] - mid_y));
		get[i][1] = Math.round(mid_y - (current[i][0] - mid_x));
	}

	for (var i = 0; i < 4; i++) {
		if (get[i][1] > 9) {
			var k = get[i][1] - 9;
			for (var j = 0; j < 4; j++) {
				get[j][1] -= k;
			}
		}
		else if (get[i][1] < 0) {
			var k = get[i][1];
			for (var j = 0; j < 4; j++) {
				get[j][1] -= k;
			}
		}
	}

	for (var i = 0; i < 4; i++) {
		if (get[i][0] >= 0) {
			if (getStyle(document.getElementById('num_'+(get[i][0])+'_'+get[i][1]),'backgroundColor') == 'rgb(5, 0, 255)') {
				if_rotate = false;
			}
		}
	}

	if (if_rotate) {
		for (var i = 0; i < 4; i++) {
			current[i][0] = get[i][0];
			current[i][1] = get[i][1];

			currentDiv[i].style.top  = (current[i][0]*14) + 'px';
			currentDiv[i].style.left = (current[i][1]*14) + 'px';
		}
	}

	// //误差消除---暂时无用
	// var delta_y = 0;
	// for (var i = 0; i < 4; i++) {
	// 	delta_y += current[i][1];
	// }
	// delta_y = delta_y/4;
	// if (delta_y - mid_y > 0.5) {
	// 	for (var i = 0; i < 4; i++) {
	// 		current[i][1] -= 1;
	// 		currentDiv[i].style.left = (current[i][1]*14) + 'px';
	// 	}
	// }
	// alert(mid_x+"..."+mid_y+"+++"+current[0][0]+"..."+current[1][0]+"..."+current[2][0]+"..."+current[3][0]
	// +"+++"+current[0][1]+"..."+current[1][1]+"..."+current[2][1]+"..."+current[3][1]);
}

//获取元素CSS属性
function getStyle(obj,attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	else {
		return getComputedStyle(obj,false)[attr];
	}
}

//纵向碰撞检测
function currentCollisionX() {

	for (var i = 0; i < 4; i++) {
		if (current[i][0] >= 19) {
			down_out = 1;
		}
		else if (current[i][0] >= 0) {
			if (getStyle(document.getElementById('num_'+(current[i][0]+1)+'_'+current[i][1]),'backgroundColor') == 'rgb(68, 68, 68)') {
				down_out = 1;
			}
		}
	}
}

//横向碰撞检测
function currentCollisionY() {
	for (var i = 0; i < 4; i++) {
		if (current[i][1] <= 0) {
			left_out = 1;
		}
		else if (current[i][1] >= 9) {
			right_out = 1;
		}
		else if (current[i][0] >= 0){
			if (getStyle(document.getElementById('num_'+current[i][0]+'_'+(current[i][1]-1)),'backgroundColor') == 'rgb(68, 68, 68)') {
				left_out = 1;
			}
			if (getStyle(document.getElementById('num_'+current[i][0]+'_'+(current[i][1]+1)),'backgroundColor') == 'rgb(68, 68, 68)') {
				right_out = 1;
			}
		}
	}
}

//移除某个节点下指定名称子节点
function removeTheChlid() { 
	var node = document.getElementById('game-platform');
	node.removeChild(currentDiv_0);
	node.removeChild(currentDiv_1);
	node.removeChild(currentDiv_2);
	node.removeChild(currentDiv_3);	
}

//同化覆盖的背景div
function assimilate() {
	for (var i = 0; i < 4; i++) {
		num[current[i][0]][current[i][1]].style.backgroundColor = '#444'; //#444 = rgb(68, 68, 68)
	}
	removeTheChlid();
}

//清除填满的行(line_num)
function clearLine(line_num) {
	
	for (var i = 0; i < N; i++) {
		num[line_num][i].style.backgroundColor = '#aaa';
	}
	for (var i = line_num; i >= 1; i--) {
		for (var j = 0; j < N; j++) {
			num[i][j].style.backgroundColor = getStyle(document.getElementById('num_'+(i-1)+'_'+j),'backgroundColor');
		}
	}	
}

//判断一行是否填满
function ifClearLine() {
	for (var i = 0; i < M; i++) {
		var cnt = 0;	
		for (var j = 0; j < N; j++) {
			if (getStyle(document.getElementById('num_'+i+'_'+j),'backgroundColor') == 'rgb(68, 68, 68)') {
				cnt ++;
			}
			else {
				break;
			}
		}

		if (cnt == N) {
			//消除
			clearLine(i);
			score(50);
		}
	}
}

//记分
function score(mark) {
	score_cnt += mark;
	document.getElementById("score").innerHTML = score_cnt;
}

//游戏暂停键
function clickPuse() {
	puse_bool = !puse_bool;
	if (puse_bool) {
		document.getElementById('puse').innerHTML = ">>";
	}
	else {
		document.getElementById('puse').innerHTML = "| |";
	}
}

function clickBegin() {
	document.getElementById("begin").style.display = "none";
	document.getElementById( "mmm" ).style.display = "none";
	document.getElementById( "next" ).style.display = "inline";
	document.getElementById( "puse" ).style.display = "inline";
	document.body.style.cursor = "pointer";
	initPage();
	score_cnt = 0;
	score(0);
	currentFlow();
	currentOption();
}

// var t = setInterval(func(),time);间隔time时间循环执行func()
// clearInterval(t);