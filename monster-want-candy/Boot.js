let Candy = {}

Candy.Boot = function(game){}

Candy.Boot.prototype.preload = function(){
    this.load.image('preloadBar','./images/loading-bar.png')
}

Candy.Boot.prototype.create = function(){
    this.input.maxPointers = 1
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.scale.setScreenSize(true)
    this.state.start('Preloader')
}