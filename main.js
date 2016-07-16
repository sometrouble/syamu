enchant();

window.onload = function() {
	var game = new Core(320,480); 

	//////////////////////////////////////////////////
	//GameInit
	//////////////////////////////////////////////////
	//Image
	game.preload('assets/syamu.png');
	game.preload('assets/bullet.png');
	game.preload('assets/musyokuorig.png');
	game.preload('assets/musyokured.png');
	game.preload('assets/musyokublue.png');
	//////////////////////////////////////////////////
	//Sound
	game.preload('assets/tropicalnojob.mp3');
	game.preload('assets/taima.mp3');
	game.preload('assets/taimasp.mp3');
	game.preload('assets/taimasp2.mp3');
	//////////////////////////////////////////////////
	//Game Settings
	game.fps = 30;
	game.rootScene.backgroundColor = '00C3FF';
	game.scale = 1;
	game.score = 0;
	
	var SPEED = 3;
	var MOVE_RANGE_X = game.width - 32;
	var MOVE_RANGE_Y = game.height - 32;
	
	var left = 0;
	var right = MOVE_RANGE_X;
	var top	= 0;
	var bottom = MOVE_RANGE_Y;
		
	var start = new Scene();
	var end = new Scene();
	//////////////////////////////////////////////////
	//Set BGM
	var bgm = game.assets['assets/tropicalnojob.mp3'];
	//////////////////////////////////////////////////



	/*function sleep(){
		var sleeptime = Math.floor(game.frame/game.fps);
		var nowtime = 0;
		var counter = 0;
		
		console.log(sleeptime);
		
		while(counter < 10) {
			nowtime = Math.floor(game.frame/game.fps);
			counter = nowtime-sleeptime;
		}
	}*/



	//////////////////////////////////////////////////
	//taima
	function taima(){
		
		//Set BGM
		var bgm = game.assets['assets/tropicalnojob.mp3'];
	
		//Set SE
		var taimasp = game.assets['assets/taimasp.mp3'];
		var taimasp2 = game.assets['assets/taimasp2.mp3'];
		//var taima = game.assets['assets/taima.mp3'];
		
		//Main
		var nowtime = 1;
		game.pushScene(end);
		bgm.stop();

		//taimajudge		
		game.addEventListener('enterframe',function() {

			if(game.frame % game.fps == 0){
				switch(nowtime){
					case 1:
						game.rootScene.backgroundColor = "#5996ff";
						taimasp.play();
						nowtime++;
						break;
					case 2:
						game.rootScene.backgroundColor = "#f5ff59";
						taimasp.play();
						nowtime++;
						break;
					case 3:
						game.rootScene.backgroundColor = "#67ff59";
						taimasp.play();
						nowtime++;
						break;
					case 4:
						game.rootScene.backgroundColor = "#ff5959";
						taimasp.play();
						nowtime++;
						break;
					case 5:
						game.rootScene.backgroundColor = "#424242";
						taimasp2.play();
						nowtime++;
						break;
				}
			}

			//Tweet button
			if(game.input.b){
				tweet();
			}
		})

	}

	//////////////////////////////////////////////////
	


	//////////////////////////////////////////////////
	//StartMessage
	start.backgroundColor = "#FF9999";
	var startMsg = new Label("Syamu Shooting");
	startMsg.x = 50;
	startMsg.y = 100;
	startMsg.font = "normal normal 32px/1.0 monospace";
	startMsg.color = "#FFFFFF";
	start.addChild(startMsg);
	var setsumeiMsg = new Label("Press Space Key");
	setsumeiMsg.x = 100;
	setsumeiMsg.y = 150;
	setsumeiMsg.font = "normal normal 16px/1.0 monospace";
	setsumeiMsg.color = "#FFFFFF";
	start.addChild(setsumeiMsg);
	var versionMsg = new Label("ver. 0.00");
	versionMsg.x = 250;
	versionMsg.y = 440;
	versionMsg.font = "normal normal 12px/1.0 monospace";
	versionMsg.color = "#FFFFFF";
	start.addChild(versionMsg);
	//////////////////////////////////////////////////



	//////////////////////////////////////////////////
	//EndMessage
	var endMsg = new Label("GameOver");
	var endScore = new Label("SCORE: "+game.score);
	var endReMsg = new Label("Press F5 Key");
	endMsg.x = 80;
	endMsg.y = 180;
	endMsg.font = "normal normal 42px/1.0 monospace";
	endMsg.color = "#FFFFFF";
	end.addChild(endMsg);
	endScore.x = 115;
	endScore.y = 240;
	endScore.font = "normal normal 16px/1.0 monospace";
	endScore.color = "#FFFFFF";
	end.addChild(endScore);
	endReMsg.x = 120;
	endReMsg.y = 280;
	endReMsg.font = "normal normal 12px/1.0 monospace";
	endReMsg.color = "#FFFFFF";
	end.addChild(endReMsg);
	//////////////////////////////////////////////////


	
	//////////////////////////////////////////////////
	//Tweet Label	
	var tweet_label = new Label("white");
	tweet_label.y = 360;
	tweet_label.x = 100;
	tweet_label.font = "normal normal 12px/1.0 monospace";
	tweet_label.color = "#FFFFFF";
	tweet_label.text = "Press T key to Tweet";
	tweet_label._style.zIndex = 8;
	function tweet(){
		//alert
		tweetyn = confirm("スコアをツイートしますか？");
		if(tweetyn == true){
			//Event touch
			//tweet_label.addEventListener('touchend', function(){
				console.log("a");
				var EUC = encodeURIComponent;
				var twitter_url = "http://twitter.com/?status=";
				var message = "あなたのスコアは" + game.score + "です。\nhttp://sometrouble.net\n#syamu_shooting";
				//Twitter
				location.href = twitter_url+ EUC(message);
				game.input.b = false;
			//});
		}else{
			alert("俺でオナニーはしたらダメだで")
			game.input.b = false;
		}
	}
	end.addChild(tweet_label);
	//////////////////////////////////////////////////



	//////////////////////////////////////////////////
	//CenterLabel
	/*
	var CenterLabel = Class.create(Label, {
	initialize : function(color){
		Label.call(this);
		this.width = 320;
		this._element.style.textAlign = "center";
		color = color || "white";
		this.color = color;
		}
	});
	*/
	//////////////////////////////////////////////////
	


	//////////////////////////////////////////////////
	//GameStart
	game.onload = function() {
		
		game.keybind(' '.charCodeAt(0), 's');
		game.keybind(90, 'a');
		game.keybind(84, 'b');
		
		//Set BGM
		var bgm = game.assets['assets/tropicalnojob.mp3'];
		
		/*/end
		end.addEventListener('enterframe', function(){
			if(game.input.s){
				game.popScene(end);
			}
		});*/
		
		game.pushScene(start);
		
		//rmstart
		start.addEventListener('enterframe', function(){
			//press space key(s)
			if(game.input.s){
				game.popScene(start);
								
				enemies = [];
				enemiesR = [];
				enemiesB = [];
			}
		});
		
		//////////////////////////////////////////////////
		//init Player
		Syamu = new Syamu(140, 440);
		
		score = new Label(0);
		score.color = "#000000";
		score.font = "normal normal 15px/1.0 monospace";
		
		//BGM
		bgm.play();
		bgm.loop = true;
		
		//loop
		game.rootScene.addEventListener('enterframe', function(){
			
			//orig
			if(game.frame % 10 == 0){
				var x = Math.random()*(320-32);
				var enemy = new Enemy(x, 10);
				enemy.key = game.frame;
				enemies[game.frame] = enemy;
			}
			
			//red
			if(game.frame % 15 == 0){
				var x = Math.random()*(320-32);
				var enemyr = new EnemyR(x, 10);
				enemyr.key = game.frame;
				enemiesR[game.frame] = enemyr;
			}
			
			//blue
			if(game.frame % 30 == 0){
				var x = Math.random()*(320-32);
				var enemyb = new EnemyB(x, 10);
				enemyb.key = game.frame;
				enemiesB[game.frame] = enemyb;
			}

			score.text = "SCORE: "+game.score;
			endScore.text = "SCORE: "+game.score;
			game.rootScene.addChild(score);
		});
		//////////////////////////////////////////////////
	}
	game.start(); // StartGame
	


	//////////////////////////////////////////////////
	//Player
	var Syamu = Class.create(Sprite, {
		initialize: function(x, y){
			Sprite.call(this,32,32);
			this.x = x;
			this.y = y;
			this.image = game.assets['assets/syamu.png'];
			game.rootScene.addChild(this);
		},
			//loop
		onenterframe:function(){
			if (game.input.up) { this.y -= SPEED; }
			if (game.input.down) { this.y += SPEED; }
			if (game.input.right) { this.x += SPEED; }
			if (game.input.left) { this.x -= SPEED;}
			
			//shoot
			if(/*game.input.s && */game.frame % 12 == 0) {
				var s = new PlayerBullet(this.x, this.y); 
			}
			
			// X
			if (this.x < left)		{ this.x = left; }
			else if (this.x > right)	{ this.x = right; }
			// Y
			if (this.y < top)		{ this.y = top; }
			else if (this.y > bottom)	{ this.y = bottom; }
			
		}
	});
	//////////////////////////////////////////////////



	//////////////////////////////////////////////////
	//enemy
	var Enemy = enchant.Class.create(enchant.Sprite, {
		initialize: function(x, y){
		
			Sprite.call(this, 32, 32);
			this.image = game.assets['assets/musyokuorig.png'];
			this.x = x;
			this.y = y;
			//move
			this.move = function(){
				this.y += 5;
			};
			this.addEventListener('enterframe', function(){
				this.move();
				if(this.y > 480 || this.x > 320 || this.x < -this.width || this.y < -this.height){
					this.remove();
				}
				if(Syamu.within(this, 16)){ taima(); }
			});
			game.rootScene.addChild(this);
		},
		remove: function(){
			game.rootScene.removeChild(this);
			delete enemies[this.key]; delete this;
		}
	});
	//////////////////////////////////////////////////



	//////////////////////////////////////////////////
	//enemyR
	var EnemyR = enchant.Class.create(enchant.Sprite, {
		initialize: function(x, y){
		
			//Set BGM
			var bgm = game.assets['assets/tropicalnojob.mp3'];
			
			Sprite.call(this, 32, 32);
			this.image = game.assets['assets/musyokured.png'];
			this.x = x;
			this.y = y;
			//move
			this.move = function(){
				this.y += 15;
			};
			this.addEventListener('enterframe', function(){
				this.move();
				if(this.y > 480 || this.x > 320 || this.x < -this.width || this.y < -this.height){
					this.remove();
				}
				if(Syamu.within(this, 16)){ taima(); }
			});
			game.rootScene.addChild(this);
		},
		remove: function(){
			game.rootScene.removeChild(this);
			delete enemiesR[this.key]; delete this;
		}
	});
	//////////////////////////////////////////////////



	//////////////////////////////////////////////////
	//enemyB
	var EnemyB = enchant.Class.create(enchant.Sprite, {
		initialize: function(x, y){
			
			//Set BGM
			var bgm = game.assets['assets/tropicalnojob.mp3'];
			
			Sprite.call(this, 32, 32);
			this.image = game.assets['assets/musyokublue.png'];
			this.x = x;
			this.y = y;
			
			var moveflag = Math.floor(Math.random()*2) ;
			
			//move
			this.move = function(){
				if(moveflag){
					if(this.x < 20){
						moveflag = 0;
					}
					this.x -= 5;
				}else{
					if(this.x > 300){
						moveflag = 1;
					}
					this.x += 5;
				}
				this.y += 5;
			};
			this.addEventListener('enterframe', function(){
				this.move();
				if(this.y > 480 || this.x > 320 || this.x < -this.width || this.y < -this.height){
					this.remove();
				}
				if(Syamu.within(this, 16)){ taima(); }
			});
			game.rootScene.addChild(this);
		},
		remove: function(){
			game.rootScene.removeChild(this);
			delete enemiesB[this.key]; delete this;
		}
	});
	//////////////////////////////////////////////////



	//////////////////////////////////////////////////
	//bullet
	var Bullet = enchant.Class.create(enchant.Sprite, {
		initialize: function(x, y, direction){
			enchant.Sprite.call(this, 16, 16);
			this.image = game.assets['assets/bullet.png'];
			this.x = x;
			this.y = y;
			this.addEventListener('enterframe', function(){
				this.y -= 5;
				if(this.y > 480 || this.x > 320 || this.x < -this.width || this.y < -this.height){
					this.remove();
				}
			});
			game.rootScene.addChild(this);
		},
		remove: function(){ game.rootScene.removeChild(this); delete this; }
	});
	//////////////////////////////////////////////////



	//////////////////////////////////////////////////
	//player bullet
	var PlayerBullet = enchant.Class.create(Bullet, {
		initialize: function(x, y){
			Bullet.call(this, x, y, 0);
			this.addEventListener('enterframe', function(){
				for(var i in enemies){
					if(enemies[i].intersect(this)){
						this.remove(); enemies[i].remove(); game.score += 100;
					}
				}
				
				for(var i in enemiesR){
					if(enemiesR[i].intersect(this)){
						this.remove(); enemiesR[i].remove(); game.score += 300;
					}
				}
				
				/*
				for(var i in enemiesB){
					if(enemiesB[i].intersect(this)){
						this.remove(); enemiesB[i].remove(); game.score += 500;
					}
				}
				*/
				
			});
		}
	});
	//////////////////////////////////////////////////
	
}