var start=0;
document.addEventListener('keyup', event => {
  if (event.code === 'Space'&&start==0) {
    console.log('Started');
	start=1;
	drawIt();
  }
})
function drawIt() {
	document.getElementById('canvas').style.cursor = 'none';
				var cegu = new Image();
				cegu.src = "cegu.png";
				var ball = new Image();
				ball.src = "ball.png";
				var WIDTH;
				var HEIGHT;
				var dx = 2;
				var dy = 4;
				var r = 10;
				var ctx;
				var canvas
				var padx;
				var padh;
				var padw;
				var padm = 5;
				var x = 450;
				var y = 595;
				var rightDown = false;
				var leftDown = false;
				$(document).keydown(onKeyDown);
				$(document).keyup(onKeyUp); 
				var f = 1;
				
				var bricks;
				var NROWS;
				var NCOLS;
				var BRICKWIDTH;
				var BRICKHEIGHT;
				var PADDING;
				
				var tocke; //deklaracija spremenljivke
				
				//timer
				var sekunde;
				var sekundeI;
				var minuteI;
				var intTimer;
				var izpisTimer;
				
				//deklaracija spremenljivke
				var start=true;
				
				
				//timer
				function timer(){
				
					if(start==true){
						sekunde++;

						sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
						minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
						izpisTimer = minuteI + ":" + sekundeI;

						$("#cas").html(izpisTimer);
					}
					else{
						sekunde=0;
						//izpisTimer = "00:00";
						$("#cas").html(izpisTimer);
					}
				}

				function initbricks() { //inicializacija opek - polnjenje v tabelo
				  NROWS = 7;
				  NCOLS = 10;
				  BRICKWIDTH = (WIDTH/NCOLS) - 1;
				  BRICKHEIGHT = 48;
				  PADDING = 1;
				  bricks = new Array(NROWS);
				  for (i=0; i < NROWS; i++) {
					bricks[i] = new Array(NCOLS);
					for (j=0; j < NCOLS; j++) {
					  bricks[i][j] = 1;
					}
				  }
				}

				
				
				
				
				var canvasMinX;
				var canvasMaxX;

				function init_mouse() {
					canvasMinX = $("#canvas").offset().left;
					canvasMaxX = canvasMinX + WIDTH;
				}

				function onMouseMove(evt) {
				  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
					padx = evt.pageX - canvasMinX - padw / 2;
				  }
				}
				
				
				
				
				
				
				function init() {
					// dodajanje kode v metodo init
					tocke = 0;
					$("#tocke").html(tocke);
					
					ctx = $('#canvas')[0].getContext("2d");
					WIDTH = $("#canvas").width();
					HEIGHT = $("#canvas").height();
					
					sekunde = 0;
					izpisTimer = "00:00";
					intTimer = setInterval(timer, 1000);
					return setInterval(draw, 10);
					
				}
				function circle(x,y,r) {
					/*ctx.beginPath();
					ctx.arc(x, y, r, 0, Math.PI*2, true);
					ctx.closePath();
					ctx.fill();*/
					ctx.drawImage(ball,x,y,r*2,r*2);
				}
				function rect(x,y,w,h) {
					ctx.beginPath();
					ctx.rect(x,y,w,h);
					ctx.closePath();
					ctx.fill();
				}
				function init_paddle() {
				  padh = 10;
				  padw = 120;
				  padx = WIDTH / 2 - padw / 2;
				}
				function onKeyDown(evt) {
					if (evt.keyCode == 39)
				rightDown = true;
					else if (evt.keyCode == 37) leftDown = true;
				}
				function onKeyUp(evt) {
					if (evt.keyCode == 39)
				rightDown = false;
					else if (evt.keyCode == 37) leftDown = false;
				}
				function clear() {
					ctx.clearRect(0, 0, WIDTH, HEIGHT);
				}
				function collision(){
					if(x + r >= padx && x <= padx + padw){
						if(y + r >= pady && y <= pady){
							if(x + r >= padx && x + 2 / r <= padx + 75){
								dx = -dx;
								dy = -dy;
							}
							if(x + 2 / r >= padx + 75 && x <= padx + padw){
								dx = dx;
								dy = -dy;
							}
							dy = -dy;
						}
					}
				}
				function draw() {
				
				  clear();
				  circle(x, y, r);
				  //premik ploščice levo in desno
					if(rightDown){
						if((padx+padw) < WIDTH){
							padx += 5;
						}else{
							padx = WIDTH-padw;
						}
					}
					else if(leftDown){
						if(padx>0){
							padx -=5;
						}else{
							padx=0;
						}
					}
					if((padx+padw) > WIDTH)
						padx = WIDTH - padw;
					if(padx<0)
						padx = 0;
				rect(padx, HEIGHT-padh, padw, padh);

				//riši opeke
				  for (i=0; i < NROWS; i++) {
					for (j=0; j < NCOLS; j++) {
					  if (bricks[i][j] == 1) {
						ctx.drawImage(cegu,(j * (BRICKWIDTH + PADDING)) + PADDING,
							(i * (BRICKHEIGHT + PADDING)) + PADDING,
							BRICKWIDTH, BRICKHEIGHT);
					  }
					}
				  }

				  rowheight = BRICKHEIGHT + PADDING +f/2; //Smo zadeli opeko?
				  colwidth = BRICKWIDTH + PADDING +f/2;
				  row = Math.floor(y/rowheight);
				  col = Math.floor(x/colwidth);
				  //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
				if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
				dy = -dy; 
				bricks[row][col] = 0;
				tocke += 1;
				$("#tocke").html(tocke);
				}
				  if (x + dx > WIDTH -r || x + dx < 0+r)
					dx = -dx;
				  if (y + dy < 0+r)
					dy = -dy;
				  else if (y + dy > HEIGHT -(r+f)) {
					start = false;
					//Odboj kroglice, ki je odvisen od odboja od ploščka 
				if (x > padx && x < padx + padw) {
					  dx = 8 * ((x-(padx+padw/2))/padw);
					  dy = -dy;
					  start= true;
					}

				//v funkciji draw() je potrebno dodati prvo vrstico v zgornjem pogoju
					else if (y + dy > HEIGHT-r){
					  clearInterval(intervalId);
					  }
				  }
				  x += dx;
				  y += dy;
				}
				
				init();
				init_paddle();
				initbricks();
				$(document).mousemove(onMouseMove);

				init_mouse();

			}