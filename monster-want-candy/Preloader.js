Candy.Preloader = function(game){
    Candy.GAME_WIDTH = 640
    Candy.GAME_HEIGHT = 960
}

Candy.Preloader.prototype.preload = function(){
    this.stage.backgroundColor = '#b4d9e7'
    this.preloadBar = this.add.sprite((Candy.GAME_WIDTH-311)/2,(Candy.GAME_HEIGHT-27)/2,'preload-bar')
    this.load.setPreloadSprite(this.preloadBar)

    this.load.image('background','./images/background.png')
    this.load.image('floor','./images/floor.png')
    this.load.image('monster-cover','./images/monster-cover.png')
    this.load.image('title','./images/title.png')
    this.load.image('game-over','./images/gameover.png')
    this.load.image('score-bg','./images/score-bg.png')
    this.load.image('button-pause','./images/button-pause.png')
    
    this.load.spritesheet('candy','./images/candy.png',82,98)
    this.load.spritesheet('monster-idle','./images/monster-idle.png',103,131)
    this.load.spritesheet('button-start','./images/button-start.png',401,143)
}

Candy.Preloader.prototype.create = function(){
    this.state.start('MainMenu')
}