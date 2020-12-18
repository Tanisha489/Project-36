var dog,happyDog,database,foodS,foodStock
var dogImage,happyDogImage
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload()
{
 dogImage = loadImage("images/dogImg.png")
 happyDogImage = loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database()
  createCanvas(1000,400);
food = new Food();

  dog=createSprite(800,200,150,150)
  dog.addImage(dogImage);
  dog.scale=0.15;

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  textSize(20)

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87)
food.display();

fedTime = database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed = data.val();
})
fill (255,255,254)
textSize(15)
if(lastFed>=12){
  text("Last Feed : " + lastFed%12 + "PM",350,30)

}
else if(lastFed===0){
  text("Last Feed : 12 am" , 350,30)
}
else{
  text("LasT Fed :" +lastFed+"AM",350,30)
}

   drawSprites();

  }

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImage);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS ++
  database.ref('/').update({
    Food:foodS
  })
  
}



 