class ParticleSystem {
  constructor(){
    this.amp = 0;
    this.particles = [];
    this.exploding = false;
  }



  createPS(){
    for(var x = 0; x<=width; x++){
      if(x < width/2){
        this.amp+= 0.2;
      }else{
        this.amp-= 0.2;
      }
      var y = this.amp * sin(x * 600/* * millis()/100000000*/);
      this.particles.push(new Particle(createVector(x,y), this.amp));
      //console.log("created p at: ", x, y);
    }
    //this.particles.forEach(function(item){console.log(item);});
  }

  runPS(){
    push();
    this.particles.forEach(function(item, idx){
      if(item.isDead()){ps.kill(idx);}
      item.run();
    });
    this.render();
    pop();
  }

  render(){

      for(let i = 0; i < this.particles.length - 1; i++){
        stroke(colGainsboro);
        strokeWeight(3);
        let p = this.particles[i];
        let p1 = this.particles[i + 1];
        if(!this.exploding){
          line(p.loc.x, p.loc.y, p1.loc.x, p1.loc.y);
        } else {
        this.particles[i].explode = true;
        this.particles[i].render();
        }
      }
  }

  explodePS(){
    this.exploding = true;
  }

  kill(index){
    this.particles.splice(index, 1);
  }
}
