angular
    .module("PrsApp")
    .controller("SnakeCtrl", SnakeCtrl);

SnakeCtrl.$inject = ["SystemSvc", "UserSvc"];

function SnakeCtrl(SystemSvc, UserSvc) {
    var self = this;

    SystemSvc.VerifyUserLogin();
    self.SnakeAccess = true;
    UserSvc.List()
		.then(
			function(resp) {
				self.Users = resp.data;
				for(var idx in self.Users) {
					if(self.Users[idx].FirstName == "Taneli" && self.Users[idx].LastName == "Armanto") {
						self.SnakeAccess = true;
						break;
					} else {
						self.SnakeAccess = false;
					}
				}
			},
			function(err) {
				self.Users = [];
				console.log("[ERROR] ", err);
			}
		);

    self.onload = function() {
		canv = document.getElementById("gc");
		ctx = canv.getContext("2d");
		document.addEventListener("keydown", keyPush);
		setInterval(game, 1000/15);
	}
	px=py=10;
	gs=tc=20;
	ax=ay=15;
	xv=yv=0;
	trail=[];
	tail = 5;
	self.Score = 0;
	$("#score").html(self.Score);
	function game() {
		px+=xv;
		py+=yv;
		if(px<0) {
			px = tc - 1;
		}
		if(px>tc-1) {
			px = 0;
		}
		if(py<0) {
			py = tc - 1;
		}
		if(py>tc-1) {
			py= 0;
		}
		ctx.fillStyle="black";
		ctx.fillRect(0,0,canv.width,canv.height);

		ctx.fillStyle="lime";
		for(var i=0;i<trail.length;i++) {
			ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
			if(trail[i].x==px && trail[i].y==py) {
				gameOver();
			}
		}
		trail.push({x:px,y:py});
		while(trail.length>tail) {
			trail.shift();
		}

		if(ax==px && ay==py) {
			self.Score++;
			$("#score").html(self.Score);
			tail++;
			ax=Math.floor(Math.random()*tc);
			ay=Math.floor(Math.random()*tc);
		}
		ctx.fillStyle="red";
		ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
	}

	function keyPush(evt) {
		switch(evt.keyCode) {
			case 65:
				xv=-1;yv=0;
				break;
			case 87:
				xv=0;yv=-1;
				break;
			case 68:
				xv=1;yv=0;
				break;
			case 83:
				xv=0;yv=1;
				break;
		}
	}

	function gameOver() {
		px=py=10;
		gs=tc=20;
		ax=ay=15;
		xv=yv=0;
		trail=[];
		tail = 5;
		self.Score = 0;
		$("#score").html(self.Score);
	}
}