'use strict';
const HEIGHT = 83;
const WIDTH = 101;
var Character = function(x = 0, y = 0, sprite) {
    this.ox = x;
    this.oy = y;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}
//在屏幕上画出游戏对象
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Character.prototype.update = function() {  
};
// 玩家要躲避的敌人 
var Enemy = function(x = 0, y = 0, speed = 100) {
    var enemy = Object.create(Enemy.prototype);
    Character.call(enemy, x, y, 'images/enemy-bug.png');
    enemy.speed = speed;
    return enemy;
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
// 更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt*this.speed;
    if(this.x >= HEIGHT*5)
        this.x = this.ox;
};


// 玩家类
var Player = function(x = WIDTH, y = HEIGHT*5) {
    var player = Object.create(Player.prototype);
    Character.call(player, x, y, 'images/char-boy.png');
    return player;
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

//处理玩家的键盘事件，敌人的移动范围不能超过游戏背景的范围
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x > 0)
                this.x -= WIDTH;
            break;
        case 'up':
            if(this.y > 0)
                this.y -= HEIGHT;
            break;
        case 'right':
            if(this.x < WIDTH*4)    
                this.x += WIDTH;
            break;
        case 'down':
            if(this.y < HEIGHT*5)
                this.y += HEIGHT;
            break;
    }
    collision(this);   
};

// allEnemies数组包含了所有敌人对象
// player是玩家对象
var allEnemies = [new Enemy(), new Enemy(0, HEIGHT, 200), new Enemy(0, HEIGHT*2, 300), new Enemy(0, HEIGHT*3, 400)];
var player = new Player();
//碰撞检测，检测玩家是否和敌人撞到
function collision(obj) {
//玩家到达河边，即过关。弹出“Congratulations”弹窗。
    if(obj.y <= 0) {
        setTimeout(function() {
            alert("Congratulations!");
            location.reload();
        },100); 
    } else {
        allEnemies.forEach(function(enemy) {
            var xdiv = Math.floor(enemy.x/WIDTH) + 1;
            //如果玩家和敌人碰到，则回到初始位置，重新开始游戏。
            if((obj.x <= ((xdiv+1)*WIDTH))
            &&(obj.x >= (xdiv*WIDTH))
            &&(obj.y == enemy.y)) {
                setTimeout(function() {
                    location.reload();
                },100);
            }       
        })
    }  
}
// 监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
