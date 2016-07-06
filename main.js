enchant();

window.onload = function() {
	var game = new Core(320,480); 
	//GameInit
	game.preload('assets/syamu.png');
	game.preload('assets/bullet.png');
	game.preload('assets/musyokuorig.png');
	game.preload('assets/musyokured.png');
	game.preload('assets/musyokublue.png');
	
	game.fps = 30;
	game.rootScene.backgroundColor = '00C3FF';
	game.scale = 1;
	game.score = 0;
	
	var SPEED = 3;
	var MOVE_RANGE_X = game.width - 32;
	var MOVE_RANGE_Y = game.height - 32;
	
	var left	 = 0;
	var right	= MOVE_RANGE_X;
	var top	= 0;
	var bottom = MOVE_RANGE_Y;

	var start = new Scene();
	var end = new Scene();
	
	game.onload = function() {
	
		game.keybind(' '.charCodeAt(0), 's');
		game.keybind(90, 'a');
		
		start.backgroundColor = "#FF9999";
		// シーンにメッセージを登録
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
		var versionMsg = new Label("ver.0");
		versionMsg.x = 250;
		versionMsg.y = 440;
		versionMsg.font = "normal normal 12px/1.0 monospace";
		versionMsg.color = "#FFFFFF";
		start.addChild(versionMsg);
		
		var endMsg = new Label("GameOver");
		var endScore = new Label("SCORE: "+ game.score);
		var endReMsg = new Label("Press F5 Key");
		endMsg.x = 100;
		endMsg.y = 200;
		endMsg.font = "normal normal 32px/1.0 monospace";
		endMsg.color = "#FFFFFF";
		end.addChild(endMsg);
		endScore.x = 130;
		endScore.y = 240;
		endScore.font = "normal normal 16px/1.0 monospace";
		endScore.color = "#FFFFFF";
		end.addChild(endScore);
		endReMsg.x = 130;
		endReMsg.y = 280;
		endReMsg.font = "normal normal 12px/1.0 monospace";
		endReMsg.color = "#FFFFFF";
		end.addChild(endReMsg);
		
		/*/end
		end.addEventListener('enterframe', function(){
			if(game.input.s){
				game.popScene(end);
			}
		});*/
		
		game.pushScene(start);
		
		//rmstart
		start.addEventListener('enterframe', function(){
			if(game.input.s){
				game.popScene(start);
			}
		});
		
		game.score = 0;
		enemies = [];
		enemiesR = [];
		enemiesB = [];
		
		Syamu = new Syamu(140, 440);
		
		score = new Label(0);
		score.color = "#000000";
		score.font = "normal normal 15px/1.0 monospace";
		
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
			game.rootScene.addChild(score);
		});
	}
	game.start(); // StartGame
	
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
				if(Syamu.within(this, 16)){ game.pushScene(end) }
			});
			game.rootScene.addChild(this);
		},
		remove: function(){
			game.rootScene.removeChild(this);
			delete enemies[this.key]; delete this;
		}
	});
	
	//enemyR
	var EnemyR = enchant.Class.create(enchant.Sprite, {
		initialize: function(x, y){
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
				if(Syamu.within(this, 16)){ game.pushScene(end) }
			});
			game.rootScene.addChild(this);
		},
		remove: function(){
			game.rootScene.removeChild(this);
			delete enemiesR[this.key]; delete this;
		}
	});
	
	//enemyB
	var EnemyB = enchant.Class.create(enchant.Sprite, {
		initialize: function(x, y){
			Sprite.call(this, 32, 32);
			this.image = game.assets['assets/musyokublue.png'];
			this.x = x;
			this.y = y;
			//move
			this.move = function(){
				this.y += 3;
			};
			this.addEventListener('enterframe', function(){
				this.move();
				if(this.y > 480 || this.x > 320 || this.x < -this.width || this.y < -this.height){
					this.remove();
				}
				if(Syamu.within(this, 16)){ game.pushScene(end) }
			});
			game.rootScene.addChild(this);
		},
		remove: function(){
			game.rootScene.removeChild(this);
			delete enemiesB[this.key]; delete this;
		}
	});
	
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
	
}