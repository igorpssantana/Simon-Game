// Script feito por Igor Paulo dos Santos Santana - Calouro de TADS na Unicamp (Universidade de Campinas)
// Script made by Igor Paulo dos Santos Santana - Undergraduate student of Computer Systems Development and Analysis at Unicamp (Campinas University)

// Variáveis Globais/Global Variables

var levels; //Variável que indica o presente nível no jogo/Variable that shows the level of the game

var choices = ["red", "green", "blue", "yellow"]; //Array que contém as opções de cores/Array that contains the color options

var audio_of_choices = ["sounds/red.mp3", "sounds/green.mp3", "sounds/blue.mp3", "sounds/yellow.mp3"]; //Array que contém os sons de cada botão/Array that has each button sound

var progress = [] // Array responsável por armazenar os botões selecionados/ Array that contains the buttons sequence

var chosed_color; // Variável que contém o valor da cor escolhida no presente nivel/ Variable responsable for carrying the present level color number

var step_of_the_way= 0; //Variável que checa a sequência de botões do jogador/Variable that checks the player's buttons sequence

var next = 2; // Variável que indica se deve ir ou não para a próxima fase/Variable that indicates if the player must or mustn't go to the next level

// Começando o jogo/Starting the game 

activating_Buttons(0);
activating_Buttons(1);
activating_Buttons(2);
activating_Buttons(3);

start();



function start (){

  levels = 1;

  step_of_the_way = 0;

  next = 2;

  
  $(document).keypress(function() {

  $("h1").text("Level " + levels)

  level_Construction(levels);
  
  $(document).unbind("keypress")

  //Aqui é onde o jogo começa, esta função também é responsável por redefinir o valor que algumas das variáveis pro jogo recomeçar
  //Here is where it all begins, this function is also responsable for redefining some variables to restart the game

})


}






function level_Construction() { 

    var randomize = Math.floor(Math.random() * 4);

    toMemorize_Animation(choices[randomize], randomize);

    // Basicamente, escolhe um numero aleatório entre 0 e 3/ Basically, it chooses an random number between 0 & 4

}

function toMemorize_Animation(right_one, num) {

  var music = new Audio(audio_of_choices[num]);

  $("#" + right_one).fadeOut("fast");

  music.play();

  setTimeout(function() {

    $("#" + right_one).fadeIn("fast");

  }, 150);

  if (num == 0){
    progress[levels - 1] = 0;
  }
  else if (num == 1){
    progress[levels - 1] = 1;
  }
  else if (num == 2){
    progress[levels - 1] = 2;
  } else {
    progress[levels - 1] = 3
  }
  
  // Aqui é onde a animação do botão escolhida e seu registro são feitos/ As you can see, this function makes the chosen button animation and register it
  
  }
  


function activating_Buttons(Button_number) {

  var music = new Audio(audio_of_choices[Button_number])

    $("." + choices[Button_number]).click(function() {

      $("." + choices[Button_number]).addClass("pressed");

      music.play();

      chosed_color = Button_number;

      check_in(progress[step_of_the_way], Button_number);

      if (next == 0){
        gameover();
        start();
      } else {
        step_of_the_way++;
      }

      if (step_of_the_way == levels){
        step_of_the_way = 0;
        levels++;
        $("h1").text("Level " + levels);
        level_Construction();
      }

      setTimeout(function() {

        $("." + choices[Button_number]).removeClass("pressed");

      }, 150);


    })

  // Esta é a função responsável por fazer os botões responsíveis a clicks e também é onde a validação entre as escolhas, tanto da máquina quanto do jogador, é feita (ou não :) )
  // This is the function that make all the buttons work and checks the player's answer
}

function check_in(right_choice, player_choice){

  if (right_choice == player_choice){
    next = 1;
  } 
  else if (right_choice != player_choice) {
    next = 0;
  }

  // Esta função é responsável, estritamente, por comparar as respostas
  // This function strict job is to compare the answers
}

function gameover (){

  var music = new Audio("sounds/gameover.mp3")

  $("body").addClass("game-over");

  music.play();

  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 100);

  $("h1").text("Game Over, Press Any Key to Restart");

  // Bom, essa é a função responsável por sinalizar quando o jogador errar através da animação de encerramento
  // Well, this function is the one responsable for telling the player that it's gameover through the ending animation

} 

 