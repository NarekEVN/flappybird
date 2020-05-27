class Game {
  constructor(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.bird = new Bird;
    this.tubes = new Tubes;
    this.score = 0;
    this.resize();
    this.update();
    this.tubes.generate();
    // this.bird.gameSound.play();
    // this.draw();
    console.log(this.bird);
  }

  update(){
    Game.ctx.fillStyle = '#000';
    Game.ctx.drawImage(bg, 0, 0, canvas.width, canvas.height + 40);
    this.collision();
    Game.ctx.font = '60px Arial';
    Game.ctx.fillText(this.score, 20, 60)
    // if (this.score % 10 == 0 && this.score != 0){
    //   this.bird.tenSound.play()
    // }
    if (!this.bird.fly){
      this.bird.y += this.bird.gravity;
      this.bird.gravity += this.bird.gravitySpeed;
    }
    if (this.bird.y + this.bird.gravity + 20 > canvas.height){
      this.bird.gravity = 0;
      this.bird.gravitySpeed = 0
      this.bird.groundSound.play();
      this.lose();
    }
    if (this.bird.isMoving){
      this.bird.gameSound.play();
    }
    requestAnimationFrame(() => {
      this.update();
      this.bird.draw();
      this.tubes.draw();
    })
  }
  collision(){
    this.tubes.tubes.forEach(elem => {
      if ((this.bird.x+40 >= elem.x && this.bird.x <= elem.x+40 && this.bird.y >= 0 && this.bird.y <= elem.y1) || (this.bird.x+40 >= elem.x && this.bird.x <= elem.x+40 && this.bird.y + 40 >= elem.y1+elem.y2)){
        this.lose();
        console.log(elem.y1)
      }
      if (elem.x <= this.bird.x + 40 && this.bird.x >= elem.x && this.bird.x <= elem.x && this.bird.y >= elem.y1 && this.bird.y <= elem.y1+elem.y2){
        this.bird.coinSound.play();
        this.score++;
      }
    })
  }

  lose(){
    this.bird.loseSound.play();
    this.tubes.tubes = [];
    this.score = 0;
    this.bird.x = 200;
    this.bird.y = canvas.height / 2 - 20;
  }
  resize() {
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    })
  }
}

Game.ctx = canvas.getContext('2d')

let bg = new Image();
bg.src = 'images/bg.png';

bg.onload = function(){
  Game.ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

new Game;