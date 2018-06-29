
// window.onscroll = function insert() {
// }
var N = 4;
var score_cnt = 0;
var x = 0;
var y = 0;

var num = new Array(); //arr参数初始化
for (var i = 1; i <= N; i++) {
	num[i] = new Array();
	for (var j = 1; j <= N; j++) {
		num[i][j] = 0;
	}	
}

function display() {
	document.getElementById("p-1-1").innerHTML = (num[1][1]==0) ? null : num[1][1];
	document.getElementById("p-1-2").innerHTML = (num[1][2]==0) ? null : num[1][2];
	document.getElementById("p-1-3").innerHTML = (num[1][3]==0) ? null : num[1][3];
	document.getElementById("p-1-4").innerHTML = (num[1][4]==0) ? null : num[1][4];

	document.getElementById("p-2-1").innerHTML = (num[2][1]==0) ? null : num[2][1];
	document.getElementById("p-2-2").innerHTML = (num[2][2]==0) ? null : num[2][2];
	document.getElementById("p-2-3").innerHTML = (num[2][3]==0) ? null : num[2][3];
	document.getElementById("p-2-4").innerHTML = (num[2][4]==0) ? null : num[2][4];

	document.getElementById("p-3-1").innerHTML = (num[3][1]==0) ? null : num[3][1];
	document.getElementById("p-3-2").innerHTML = (num[3][2]==0) ? null : num[3][2];
	document.getElementById("p-3-3").innerHTML = (num[3][3]==0) ? null : num[3][3];
	document.getElementById("p-3-4").innerHTML = (num[3][4]==0) ? null : num[3][4];

	document.getElementById("p-4-1").innerHTML = (num[4][1]==0) ? null : num[4][1];
	document.getElementById("p-4-2").innerHTML = (num[4][2]==0) ? null : num[4][2];
	document.getElementById("p-4-3").innerHTML = (num[4][3]==0) ? null : num[4][3];
	document.getElementById("p-4-4").innerHTML = (num[4][4]==0) ? null : num[4][4];
}

function ifGameOver() {
	var flag = 0;
	for (var i = 1; i <= N ; i++) {
		for (var j = 1; j <= N; j++) {
			if (num[i][j] == 0) {
				flag = 1;
				break;
			}
		}
		if (flag == 1) {
			break;
		}
	}

	if (flag == 0) {
		for (var p = 2; p <= N-1; p++) {
			for (var q = 2; q <= N-1; q++) {
				if ((num[p][q] == num[p-1][q]) || (num[p][q] == num[p+1][q]) || (num[p][q] == num[p][q-1]) || (num[p][q] == num[p][q+1])) {
					flag = 1;
					break;
				}
			}
			if (flag == 1) {
				break;
			}
		}

		if (flag == 0) {
			if ((num[1][1] != num[1][2]) && (num[1][1] != num[2][1]) && (num[1][N] != num[1][N-1]) && (num[1][N] != num[2][N]) && 
			(num[N][1] != num[N][2]) && (num[N][1] != num[N-1][1]) && (num[N][N] != num[N][N-1]) && (num[N][N] != num[N-1][N]) &&
			(num[1][2] != num[1][3]) && (num[2][1] != num[3][1]) && (num[N][2] != num[N][3]) && (num[2][N] != num[3][N])) {
				//Game Over;
				document.getElementById("mid").style.backgroundColor='#333';
				document.getElementById('score').style.color = "#fff";
			}
		}
	}
}

function score(argument) {
	score_cnt += argument;
	document.getElementById("score").innerHTML = score_cnt;
}

function add() {

	var rand_n = (Math.floor(Math.random()*4+1) >= 2) ? 2 :4;
	while(1) {
		var rand_1 = Math.floor(Math.random()*4+1);
		var rand_2 = Math.floor(Math.random()*4+1);
		if (num[rand_1][rand_2] == 0) {
			num[rand_1][rand_2] = rand_n;
			break;
		}
	}
}

function up() {
	
	var k = 0;
	var h = 0;
	var h_value = 0;
	var cnt = 0;

	for (var i = 1; i <= 4; i++) //列
	{ 
		k = 1;
		h = 1;
		h_value = 0;
		while (1) 
		{
			if ((h_value == 0)&& (num[k][i] != 0)) {
				h_value = num[k][i];
				num[h][i] = num[k][i];
				if (h != k) {
					num[k][i] = 0;
					cnt++;
				}
				// alert("h_value="+h_value+"num[k][i]="+num[k][i]);
				k++;
				
				if (k==5) {break;}
			}
			if ((h_value == num[k][i]) && (h_value != 0)) {
				num[h][i] = h_value + num[k][i];
				score(h_value);
				h_value = 0;
				num[k][i] = 0;
				h++;
				k++;
				cnt++;
				if (k==5) {break;}
			}
			if (num[k][i] == 0) {
				k++;
				if (k==5) {break;}
			}
			if ((h_value != 0) && (h_value != num[k][i]) && (num[k][i] != 0)) {
				h++;
				h_value = num[k][i];
				num[h][i] = num[k][i];
				if (h != k) {
					num[k][i] = 0;
					cnt++;
				}
				k++;
				if (k==5) {break;}
			}
		}
	}
	if(cnt != 0) {
		add();
	}
	display();
	ifGameOver();
}

function down() {

	var k = 0;
	var h = 0;
	var h_value = 0;
	var cnt = 0;

	for (var i = 1; i <= 4; i++) //列
	{ 
		k = 4;
		h = 4;
		h_value = 0;
		while (1) 
		{
			if ((h_value == 0)&& (num[k][i] != 0)) {
				h_value = num[k][i];
				num[h][i] = num[k][i];
				if (h != k) {
					num[k][i] = 0;
					cnt++;
				}
				// alert("h_value="+h_value+"num[k][i]="+num[k][i]);
				k--;
				if (k==0) {break;}
			}
			if ((h_value == num[k][i]) && (h_value != 0)) {
				num[h][i] = h_value + num[k][i];
				score(h_value);
				h_value = 0;
				num[k][i] = 0;
				h--;
				k--;
				cnt++;
				if (k==0) {break;}
			}
			if (num[k][i] == 0) {
				k--;
				if (k==0) {break;}
			}
			if ((h_value != 0) && (h_value != num[k][i]) && (num[k][i] != 0)) {
				h--;
				h_value = num[k][i];
				num[h][i] = num[k][i];
				if (h != k) {
					num[k][i] = 0;
					cnt++;
				}
				k--;
				if (k==0) {break;}
			}
		}
	}
	if(cnt != 0) {
		add();
	}
	display();
	ifGameOver();
}

function left() {
	
	var k = 0;
	var h = 0;
	var h_value = 0;
	var cnt = 0;

	for (var i = 1; i <= 4; i++) //列
	{ 
		k = 1;
		h = 1;
		h_value = 0;
		while (1) 
		{
			if ((h_value == 0)&& (num[i][k] != 0)) {
				h_value = num[i][k];
				num[i][h] = num[i][k];
				if (h != k) {
					num[i][k] = 0;
					cnt++;
				}
				// alert("h_value="+h_value+"num[i][k]="+num[i][k]);
				k++;
				if (k==5) {break;}
			}
			if ((h_value == num[i][k]) && (h_value != 0)) {
				num[i][h] = h_value + num[i][k];
				score(h_value);
				h_value = 0;
				num[i][k] = 0;
				h++;
				k++;
				cnt++;
				if (k==5) {break;}
			}
			if (num[i][k] == 0) {
				k++;
				if (k==5) {break;}
			}
			if ((h_value != 0) && (h_value != num[i][k]) && (num[i][k] != 0)) {
				h++;
				h_value = num[i][k];
				num[i][h] = num[i][k];
				if (h != k) {
					num[i][k] = 0;
					cnt++;
				}
				k++;
				if (k==5) {break;}
			}
		}
	}
	if(cnt != 0) {
		add();
	}
	display();
	ifGameOver();
}

function right() {

	var k = 0;
	var h = 0;
	var h_value = 0;
	var cnt = 0;

	for (var i = 1; i <= 4; i++) //行
	{ 
		k = 4;
		h = 4;
		h_value = 0;
		while (1) 
		{
			if ((h_value == 0)&& (num[i][k] != 0)) {
				h_value = num[i][k];
				num[i][h] = num[i][k];
				if (h != k) {
					num[i][k] = 0;
					cnt++;
				}
				// alert("h_value = "+h_value+" num[i][k] = "+num[i][k]);
				k--;
				if (k==0) {break;}
			}
			if ((h_value == num[i][k]) && (h_value != 0)) {
				num[i][h] = h_value + num[i][k];
				score(h_value);
				h_value = 0;
				num[i][k] = 0;
				h--;
				k--;
				cnt++;
				if (k==0) {break;}
			}
			if (num[i][k] == 0) {
				k--;
				if (k==0) {break;}
			}
			if ((h_value != 0) && (h_value != num[i][k]) && (num[i][k] != 0)) {
				h--;
				h_value = num[i][k];
				num[i][h] = num[i][k];
				if (h != k) {
					num[i][k] = 0;
					cnt++;
				}
				k--;
				if (k==0) {break;}
			}
		}
	}
	if(cnt != 0) {
		add();
	}
	display();
	ifGameOver();
}

onkeyup = function keyUp() {
	var keycode = event.keyCode;
	switch (keycode)
	{
		case 38:
			up();
			break;
		case 40:
			down();
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
		down();
	}
	if ((event.clientX < x) && ((x - event.clientX) > Math.abs(event.clientY - y))) {
		left();
	}
	if ((event.clientX > x) && ((event.clientX - x) > Math.abs(event.clientY - y))) {
		right();
	}
}

function initPage() {
	var rand_1 = Math.floor(Math.random()*4+1);
	var rand_2 = Math.floor(Math.random()*4+1);
	num[rand_1][rand_2] = 2;

	display();
}

function clickBegin() {
	document.getElementById("begin").style.display = "none";
	document.getElementById( "mmm" ).style.display = "none";
	document.body.style.cursor = "pointer";

	initPage();
	score_cnt = 0;
	score(0);
}