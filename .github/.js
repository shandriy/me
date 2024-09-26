var food;
var userGuess;
setFood("Taiyaki","taiyaki.png");
onEvent("beginButton","click",function(){
  setScreen("quizScreen");
});
onEvent("submitAnswer","click",function(){
  userGuess = getText("userAnswer");
  hideElement("userAnswer");
  if (food.includes(userGuess) == true) {
    setImageURL("result",    "360F_538529897_uCTAO0TUrlHOFrmIcy3ksCrGDRF7jwls-removebg-preview.png");
  }
  else {
    setImageURL("result","360_F_538529897_uCTAO0TUrlHOFrmIcy3ksCrGDRF7jwls__1-removebg-preview.png");
  }
  showElement("result");
});
function setFood(foodName,image){
  setImageURL("foodImage",image);
  food = [foodName];
} 
