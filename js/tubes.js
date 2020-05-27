class Tubes {
  constructor(){
    this.tubes = [];
  }

  generate(){
    setInterval(() => {
      let obj = {
        x: canvas.width + 25,
        y1: Math.abs(Math.round(Math.random()*(160-canvas.height - 200)+canvas.height - 200)),
        y2: Math.floor(Math.random()*(100 - 140)+140)
      }
      this.tubes.push(obj)
    }, 1800)
  }
  draw(){
    Game.ctx.fillStyle = '#10ac84';
    this.tubes.forEach((elem) => {
      Game.ctx.beginPath();
      Game.ctx.fillRect(elem.x, 0, 40, elem.y1)
      Game.ctx.fillRect(elem.x, elem.y1 + elem.y2, 40, canvas.height);
      elem.x -= 5;
    })
  } 
}