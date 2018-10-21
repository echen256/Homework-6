var questions;
var maxTime;
var Wins;
var losses;
var correctAnswerIndex;
var callback;
reset();


$(".answerContainer").click(
    function () {
        console.log($(this).attr("id") + " " + correctAnswerIndex);
        if ($(this).attr("id") == correctAnswerIndex) {
            $("#notifier").text("Correct");

            wins++;

        } else {
            $("#notifier").text("Wrong answer, the correct answer was choice #" + correctAnswerIndex);

            losses++;
        }

        clearInterval(callback);

        setTimeout(setQuestion, 2000);
    }
);

function reset() {
    $("#finalContainer").empty();
    maxTime = 5000;
    wins = 0;
    losses = 0;
    correctAnswerIndex = -1;
    questions = [
        {
            questionString: "Assume a gas obeys the ideal gas law: PV=nRT. Calculate the pressure P for 10.00 moles of an ideal gas if T=100.0K and V = 1.00m3",


            answerString: "8314 Pa"
            ,
            incorrectAnswers: [
                "916 Pa", "2048 Pa", "6584 Pa"
            ]
        },
        {
            questionString: "Using the ideal gas law obtain an expression for the partial derivative (dP/dT) with respect to V Calculate the value of this derivative for 10.00 moles of an ideal gas if T=100.0K and V=1.000m",
            answerString: "83.14 Pa/K",
            incorrectAnswers: [
                "0 Pa/K", "16.628 Pa/K", "41.75 Pa/K"
            ]
        },
        {
            questionString: "The  denaturation  transition  of  a  globular  protein  can  be  approximated  as  a structural " +
                "transition  from  the N  form  (structured)  to  the  D  form  (unstructured, denatured), i.e. N -> D.  Consider a protein that undergoes a structural change "
                + "from N to D at a temperature T and pressure P. At T=310K and P=1.00 bar. the heat absorbed per mole of protein undergoing this structural  transition  "
                + "qp is 1638PqH  kJ/mol,  the  entropy  change  is dS = S_d - S_n = 2000 J/(K * mol) .Calculate dG for converting one mole of protein from N to D. "
            ,
            answerString: "18000 J/mol",
            incorrectAnswers: [
                "18000 mol/J", "9000 J/mol", "12000 mol/J"
            ]
        },
        {
            questionString: "A solution of a protein in water is separated from pure water by a membrane that is impermeable to" +
                "the protein but is permeable to water. At T=293K the resulting osmotic pressure raises a column of water to a height of h=4.50m ." + 
                
                " From the data provided calculate the osmotic pressure, assuming the density of the solution is RHO = 1000kg/(m ^3 ). Give you answer in SI units of pressure." ,
            
            answerString: "44200 Pa",
            incorrectAnswers: [
                "20000 Pa", "41200 Pa", "142200 Pa"
            ]
        }


    ]

    setQuestion();
}

function tally() {

    clearInterval(callback);
    var final = $("#finalContainer");
    var winDiv = $("<div></div>");
    var lossDiv = $("<div></div>");
    final.append(winDiv);
    final.append(lossDiv);
    winDiv.text("Wins: " + wins);
    lossDiv.text("Losses: " + losses);

    var newGame = $("<div id = reset>Take Again?</div>")
    final.append(newGame);
    newGame.click(reset);
}

function alertFailure() {
    losses++;
    $("#notifier").text("Time's up, moving on!");
    clearInterval(callback);
    setTimeout(setQuestion, 2000);
}

function updateTimer() {
    var timer = $("#timer");
    var time = parseInt(timer.text()) - 1;
    console.log(time);
    timer.text(time);
    if (time === 0) {
        alertFailure();
    }
}

function resetTimer() {
    var timer = $("#timer");
    timer.text(maxTime);
    callback = setInterval(updateTimer, 1000);
}


function setQuestion() {
    resetTimer();
    if (questions.length === 0) {
        tally(callback);

        return;
    }
    var nextQuestion = questions.pop();

    var correctAnswerSet = false;
    $("#question").text(nextQuestion.questionString);
    for (var i = 1; i < 5; i++) {
        var field = $("#" + i);
        //console.log(field);
        if (!correctAnswerSet && Math.random() < .25) {
            setField(field, nextQuestion.answerString);
            correctAnswerSet = true;
            correctAnswerIndex = i;
        } else if (i === 4 && !correctAnswerSet) {
            setField(field, nextQuestion.answerString);
            correctAnswerIndex = i;
            correctAnswerSet = true;
        } else {
            setField(field, nextQuestion.incorrectAnswers.pop());
        }
    }
}

function setField(field, question) {
    $(field.find(".answer")).text(question);
}
