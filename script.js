 const questions = [

{
question:
"Which HTML element is used for the largest heading?",
answers:[
{text:"<h1>",correct:true},
{text:"<heading>",correct:false},
{text:"<head>",correct:false},
{text:"<h6>",correct:false}
]
},

{
question:
"What is the primary purpose of CSS Flexbox?",
answers:[
{text:"Database Management",correct:false},
{text:"Layout Alignment",correct:true},
{text:"Authentication",correct:false},
{text:"Networking",correct:false}
]
},

{
question:
"Which keyword is used to declare a variable in JavaScript?",
answers:[
{text:"let",correct:true},
{text:"int",correct:false},
{text:"create",correct:false},
{text:"variable",correct:false}
]
},

{
question:
"Which SQL command retrieves data from a database?",
answers:[
{text:"GET",correct:false},
{text:"SELECT",correct:true},
{text:"FETCH",correct:false},
{text:"SHOW",correct:false}
]
},

{
question:
"What is Git primarily used for?",
answers:[
{text:"Image Editing",correct:false},
{text:"Version Control",correct:true},
{text:"Database Design",correct:false},
{text:"Web Hosting",correct:false}
]
}

];

const questionElement =
document.getElementById("question");

const answerButtons =
document.getElementById("answer-buttons");

const nextButton =
document.getElementById("next-btn");

const scoreDisplay =
document.getElementById("score");

const progressFill =
document.getElementById("progress-fill");

const questionNumber =
document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){

currentQuestionIndex = 0;
score = 0;

showQuestion();

}

function showQuestion(){

resetState();

let currentQuestion =
questions[currentQuestionIndex];

questionNumber.innerText =
`Question ${currentQuestionIndex+1} of ${questions.length}`;

questionElement.innerText =
currentQuestion.question;

progressFill.style.width =
((currentQuestionIndex) /
questions.length) * 100 + "%";

currentQuestion.answers.forEach(answer=>{

const button =
document.createElement("button");

button.innerText =
answer.text;

button.classList.add(
"answer-btn"
);

if(answer.correct){

button.dataset.correct =
answer.correct;

}

button.addEventListener(
"click",
selectAnswer
);

answerButtons.appendChild(
button
);

});

}

function resetState(){

nextButton.style.display =
"none";

while(answerButtons.firstChild){

answerButtons.removeChild(
answerButtons.firstChild
);

}

}

function selectAnswer(e){

const selectedBtn =
e.target;

const correct =
selectedBtn.dataset.correct ===
"true";

if(correct){

score++;

scoreDisplay.innerText =
`Score: ${score}`;

selectedBtn.classList.add(
"correct"
);

}

else{

selectedBtn.classList.add(
"wrong"
);

}

Array.from(
answerButtons.children
).forEach(button=>{

if(button.dataset.correct==="true"){

button.classList.add(
"correct"
);

}

button.disabled = true;

});

nextButton.style.display =
"block";

}

function showResult(){

progressFill.style.width =
"100%";

document.getElementById(
"quiz-container"
).innerHTML =

`
<div class="result-card">

<h2>Assessment Complete</h2>

<p><strong>Final Score:</strong>
${score} / ${questions.length}</p>

<p>
${score >=4
? "Excellent Performance 🚀"
: score >=3
? "Good Performance 👍"
: "Keep Learning 📚"}
</p>

<button onclick="location.reload()"
id="restart-btn"
style="display:block">

Retake Assessment

</button>

</div>
`;

nextButton.style.display =
"none";

}

nextButton.addEventListener(
"click",
()=>{

currentQuestionIndex++;

if(
currentQuestionIndex <
questions.length
){

showQuestion();

}

else{

showResult();

}

}
);

startQuiz();
