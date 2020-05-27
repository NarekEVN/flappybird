class Bird {
  constructor(){
    this.x = 200;
    this.y = canvas.height / 2 - 20;
    this.gravity = 0.8;
    this.gravitySpeed = 0.3;
    this.fly = 1;
    this.move();
    this.isMoving = false;
    this.birdImg = new Image();
    this.birdImg.src = 'images/flappy-bird-2.png';
    this.jumpSound = new Sound('sounds/jump.wav');
    this.groundSound = new Sound('sounds/ground.wav');
    this.loseSound = new Sound('sounds/lose.wav');
    this.coinSound = new Sound('sounds/coin.wav');
    this.tenSound = new Sound('sounds/ten.wav');
    this.gameSound = new Sound('sounds/song.wav');
  }
  draw(){
    Game.ctx.beginPath();
    Game.ctx.fillStyle = 'yellow';
    // Game.ctx.arc(this.bird.x, this.bird.y, 20, 0, Math.PI * 2);
    // Game.ctx.fill();
    // Game.ctx.fillRect(this.x, this.y, 40, 40);
    // this.birdImg.onload = () => {
    //   Game.ctx.drawImage(this.birdImg, this.x, this.y, 20, 20);
    // }
    Game.ctx.drawImage(this.birdImg, this.x, this.y, 40, 40);
  }
  move(){
    window.addEventListener('keypress', e => {
      if (e.keyCode === 32){
        this.jump();
      }
    })
    window.addEventListener('keyup', e => {
      if (e.keyCode === 32){
        this.fall();
      }
    })
    try {
      document.createEvent('TouchEvent');
      window.addEventListener('touchstart', () => {
        this.jump();
      })
      window.addEventListener('touchend', () => {
        this.fall();
      })
    }
    catch (e) {
      window.addEventListener('mousedown', () => {
        this.jump();
      })
      window.addEventListener('mouseup', () => {
        this.fall();
      })
    }
  }
  jump(){
    this.jumpSound.play();
    this.isMoving = true;
    if (this.y - 10 < 0){
      // this.fly = 0
      // this.gravitySpeed = 0.3;
      this.bird.y = -20;
    }
    else{
      this.y -= 20;
      this.gravitySpeed = 0;
      this.gravity = 0.5;
      this.fly = 1;
    }
  }
  fall(){
    this.fly = 0
    this.gravitySpeed = 0.3;
  }
}