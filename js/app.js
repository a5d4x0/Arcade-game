// 玩家要躲避的敌人 
var Enemy = function(x = 0, y = 0) {
    this.sprite = 'images/enemy-bug.png';
    this.ox = x;
    this.oy = y;
    this.x = x;
    this.y = y;
};

// 更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt*100;
    if(this.x >= 83*5)
        this.x = this.ox;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 玩家类
var Player = function(x = 101, y = 83*5) {
    this.sprite = 'images/char-boy.png';
    this.ox = x;
    this.oy = y;
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};
//处理玩家的键盘事件，青蛙的移动范围不能超过游戏背景的范围
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x > 0)
                this.x -= 101;
            break;
        case 'up':
            if(this.y > 0)
                this.y -= 83;
            break;
        case 'right':
            if(this.x < 101*4)    
                this.x += 101;
            break;
        case 'down':
            if(this.y < 83*5)
                this.y += 83;
            break;
    }
    collision(this);   
};

// allEnemies数组包含了所有敌人对象
// player是玩家对象
var allEnemies = [new Enemy(), new Enemy(101, 83), new Enemy(101*2, 83*2), new Enemy(101*3, 83*3)];
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
            var xdiv = Math.floor(enemy.x/101) + 1;
            //如果玩家和敌人碰到，则回到初始位置，重新开始游戏。
            if((obj.x <= ((xdiv+1)*101))
            &&(obj.x >= (xdiv*101))
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
