console.log("Let's Play Tic Tac Toe!");

let music = new Audio("forest.mp3");
let audioTurn = new Audio("turn.mp3");
let won = new Audio("success.mp3");
let defeat = new Audio("defeat.mp3");

let gameOver = false, finish=false;

let count=0, turn1, turn; 

let p1, p2, t=1, k=false;

$(".symbol").click(function(){

    if(k==false){

        turn1 = $(this).text();

        if(turn1=="X"){
            p1="X";
            p2="0";
        }

        else{
            p1="0";
            p2="X";
        }

        $("#symbol1").css("background-color", "black");
        $("#symbol2").css("background-color", "black");
        
        $(this).css("background-color", "green");

        $("#p1").css("background-color", "blue");
        $("#p2").css("background-color", "grey");

        document.getElementsByClassName("s")[0].innerText= p1;
        document.getElementsByClassName("s")[1].innerText= p2;

        $("#s1").css("background-color", "blue");
        $("#s2").css("background-color", "grey");

        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn1;
    }

    k=true;
});

//function to change the turn
const changeTurn = () => {
    return turn1 === "X" ? "0" : "X";
}

//function to check win
const checkWin = () => {

    let boxtext = document.getElementsByClassName('boxtext');

    let wins = [
        [0, 1, 2, 5, 4.6, 0],
        [3, 4, 5, 5, 15.7, 0],
        [6, 7, 8, 5, 26.7, 0],
        [0, 3, 6, -8, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 18, 15, 90],
        [0, 4, 8, 4, 15, 45],
        [2, 4, 6, 6, 15, 135],
    ]

    wins.forEach(e => {
        
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            
            document.querySelector('.info').innerText = boxtext[e[1]].innerText + " Won";

            if(boxtext[e[1]].innerText==p1){
                document.querySelector('.win').innerText = $("#p1").text() + " Won !!!";
                document.querySelector('.win').style.color = "green";
            }

            else if(boxtext[e[1]].innerText==p2){
                document.querySelector('.win').innerText = $("#p2").text() + " Won !!!";
                document.querySelector('.win').style.color = "green";
            }

            gameOver = true;

            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "140px";

            won.play();

            document.querySelector('.line').style.width = "29vw";

            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;

            turn1=undefined;

            if(turn1==undefined){
                $(".box").text = "";
            }
        }       
    })
}

//Game Logic

music.play();

//here our boxes of X/0 are in variable boxes now 
boxes = document.getElementsByClassName("box");

//create array of these boxes so we can use forEach in them
Array.from(boxes).forEach(element => {

    //span content which is the actual where X and 0 will be written
    let boxtext = element.querySelector(".boxtext");

    element.addEventListener('click', () => {

        if((boxtext.innerText === '')&&(turn1==undefined)){
            $(".box").text() = "";
        }

        else if((boxtext.innerText === '')&&(turn1!=undefined)){
                boxtext.innerText = turn1;
                turn1 = changeTurn();
                audioTurn.play();
                checkWin();
    
                if (!gameOver) {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn1;

                    console.log("No");
                    if(t==1){
                        console.log("player1");
                        $("#p1").css("background-color", "grey");
                        $("#p2").css("background-color", "blue");
                        $("#s1").css("background-color", "grey");
                        $("#s2").css("background-color", "blue");
                        t=2;
                    }

                    else if(t==2){
                        console.log("player2");
                        $("#p1").css("background-color", "blue");
                        $("#p2").css("background-color", "grey");
                        $("#s1").css("background-color", "blue");
                        $("#s2").css("background-color", "grey");
                        t=1;
                    }

                    count++;
                } 
        }

        if((count==9)&&(gameOver!=true)){
            document.querySelector('.win').innerText = "Game Over!!!";
            document.querySelector('.win').style.color = "red";
            document.querySelector('.imgBox').getElementsByTagName('img')[1].style.width = "140px";
            defeat.play();
            count=0;
        }      
    })
})

//add on click listener to reset 
reset.addEventListener('click', () => {
    
    k=false;
    t=1; 
    
    $("#symbol1").css("background-color", "black");
    $("#symbol2").css("background-color", "black");

    $("#p1").css("background-color", "black");
    $("#p2").css("background-color", "black");
    $("#s1").css("background-color", "black");
    $("#s2").css("background-color", "black");

    let boxtext = document.querySelectorAll(".boxtext");

    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    });

    turn1 = undefined;
    turn = turn1;
    count=0;
  
    gameOver = false;

    if ((!gameOver)&&(turn!=undefined)) {
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    }
    if(turn==undefined){
        document.getElementsByClassName("info")[0].innerText = "Please Select a Symbol!";
    }

    document.querySelector('.line').style.width = "0";

    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "0";
    document.querySelector('.imgBox').getElementsByTagName('img')[1].style.width = "0";

    document.querySelector('.win').innerText = "";
});