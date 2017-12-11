
Candy.Game = function(game){
    this.play = null
    this.candyGoup = null
    this.spawnCandyTimer = 0
    this.fontStyle = null
    Candy.scoreText = null
    Candy.score = 0
    Candy.health = 0
}

Candy.Game.prototype.create = function(){
    //开启物理引擎,设置重力
    this.physics.startSystem(Phaser.Physics.ARCADE)
    this.physics.arcade.gravity.y = 200
    
    //添加游戏元素
    this.add.sprite(0,0,'background')
    this.add.sprite(-30,Candy.GAME_HEIGHT-160,'floor')
    this.add.sprite(10,5,'score-bg')
    this.add.button(Candy.GAME_WIDTH-96-10,5,'button-pause',this.managePause,this)

    this.player = this.add.sprite(5,760,'monster-idle')
    this.player.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12],10,true)
    this.player.animations.play('idle')

    this.spawnCandyTimer = 0
    Candy.health = 10

    this.fontStyle = {font:"40px Arial",fill:"#ffcc00",stroke:"#333",strokeThickness:5,align: "center"}
    Candy.scoreText = this.add.text(120,20,"0",this.fontStyle)

    this.candyGoup = this.add.group()
    Candy.item.spawnCandy(this)
}

Candy.Game.prototype.managePause = function(){
    let pauseText
    this.game.paused = true
    pauseText = this.add.text(100,250,"Game pause. \nTap anywhere to continue.",this.fontStyle)
    this.input.onDown.addOnces(function(){
        pauseText.destroy()
        this.game.paused = false
    },this)
}

Candy.Game.prototype.update = function(){
    this.spawnCandyTimer += this.time.elapsed
    if(this.spawnCandyTimer > 1000) {
        this.spawnCandyTimer = 0
        Candy.item.spawnCandy(this)
    }
    this.candyGoup.forEach(function(candy){
        candy.angle += candy.rotateMe
    })
    if(!Candy.health) {
        this.add.sprite((Candy.GAME_WIDTH-594)/2,(Candy.GAME_HEIGHT-271)/2,'game-over')
        this.game.paused = true
    }
}

Candy.item = {
    spawnCandy(game){
        let dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH)
        let dropOffset = [-27,-36,-36,-38,-48]
        let candyType = Math.floor(Math.random()*5)
        //不断生成,浪费内存
        // let candy = game.add.sprite(dropPos,dropOffset[candyType],'candy')
        //使用糖果池
        let candy = game.candyGoup.getFirstExists(false)
        if(candy === null) {
            candy = game.add.sprite(dropPos,dropOffset[candyType],'candy')
            game.physics.enable(candy,Phaser.Physics.ARCADE)
            candy.inputEnabled = true
            candy.events.onInputDown.add(this.clickCandy,this)
            candy.checkWorldBounds = true
            candy.events.onOutOfBounds.add(this.removeCandy,this)
            candy.anchor.setTo(0.5,0.5)
            game.candyGoup.add(candy)
        } else {
            candy.reset(dropPos,dropOffset[candyType])
            candy.animations.add('anim',[candyType],10,true)
            candy.animations.play('anim')
            candy.rotateMe = (Math.random()*4) - 2
        }
    },
    clickCandy(candy){
        //kill和destroy的区别
        //因为使用了糖果池,因此使用kill方法,复用对象
        candy.kill()
        Candy.score += 1
        Candy.scoreText.setText(Candy.score)
    },
    removeCandy(candy){
        candy.kill()
        Candy.health -= 10
    }
}