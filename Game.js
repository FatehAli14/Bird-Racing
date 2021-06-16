class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    bird1 = createSprite(100,200);
    bird1.addImage("bird1",bird1_img);
    bird1.scale=0.5;
    bird2 = createSprite(300,200);
    bird2.addImage("bird2",bird2_img);
    bird2.scale=0.3;
    bird3 = createSprite(500,200);
    bird3.addImage("bird3",bird3_img);
    bird3.scale=0.3;
    bird4 = createSprite(700,200);
    bird4.addImage("bird4",bird4_img);
    bird4.scale=0.03;
    birds = [bird1, bird2, bird3,bird4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(sky, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        birds[index-1].x = x;
        birds[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,100,100);
          birds[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = birds[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
