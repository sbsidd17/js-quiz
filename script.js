let quizContainer = document.querySelector(".quizContainer ");
let submitBtn = document.querySelector(".submit-btn");
let result = document.querySelector(".result");
let answers = [];
let selectedOptionsArray = [];
let correctAnswer = 0;
let wrongAnswer = 0;
let notAnswered = 0;
let data;
let questions = [];

async function getData() {
  let res = await fetch("https://the-trivia-api.com/api/questions?limit=100");
  data = await res.json();
  data.map((item) => {
    let opt = item.incorrectAnswers;
    opt.splice(((opt.length + 1) * Math.random()) | 0, 0, item.correctAnswer);

    questions.push({
      question: item.question,
      answer: item.correctAnswer,
      options: {
        a: opt[0],
        b: opt[1],
        c: opt[2],
        d: opt[3],
      },
    });
  });
}

(async () => {
  await getData();
  let quizBody = questions.map((item, index) => {
    answers.push(item.answer);
    return `<h4 class="question">${index + 1} : ${item.question}</h4>
      <div class="option-div">
        <label><input type="radio" value="${item.options.a}" name="question${index + 1}" />${
      item.options.a
    }</label><br/>
        <label><input type="radio" value="${item.options.b}" name="question${index + 1}" />${
      item.options.b
    }</label><br/>
        <label><input type="radio" value="${item.options.c}" name="question${index + 1}" />${
      item.options.c
    }</label><br/>
        <label><input type="radio" value="${item.options.d}" name="question${index + 1}" />${
      item.options.d
    }</label><br/>
        </div>
        <p class="rightAnswer" style="display:none">Right Answer : ${
          item.answer
        }</p>
      `;
  });
  quizContainer.innerHTML = quizBody.join("\n");
})();



submitBtn.addEventListener("click", (e) => {
  for (let i = 0; i < questions.length; i++) {
    let selectedOption = "";
    let optionArray = document.querySelectorAll(
      `input[name="question${i + 1}"]`
    );
    optionArray.forEach((item) => {
      if (item.checked) {
        selectedOption = item.value;
      }
    });
    selectedOptionsArray.push(selectedOption);
  }
  for (let i = 0; i < questions.length; i++) {
    if (selectedOptionsArray[i] == answers[i]) {
      correctAnswer++;
      document.querySelector(
        `input[name="question${i + 1}"]:checked`
      ).parentElement.style.color = "green";
    } else if (selectedOptionsArray[i] == "") {
      notAnswered++;
    } else {
      wrongAnswer++;
      document.querySelector(
        `input[name="question${i + 1}"]:checked`
      ).parentElement.style.color = "red";
    }
  }

  let rightAns = document.querySelectorAll(".rightAnswer");
  rightAns.forEach((item) => {
    item.style.display = "block";
  });

  Swal.fire({
    title: "<strong>Quiz Submitted Successfully..</strong>",
    icon: "success",
    html: `<h3>Result : You got ${correctAnswer} out of ${
      questions.length
    }.</h3><br />
        Total Question : ${questions.length}<br />
        You Attempet : ${correctAnswer + wrongAnswer}<br />
        Right Answer : ${correctAnswer}<br />
        Wrong Answer : ${wrongAnswer}<br />
        Not Answered : ${notAnswered} <br /> 
        
        `,
    showCloseButton: false,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: "OK",
  });

  answers = [];
  selectedOptionsArray = [];
  submitBtn.style.display = "none";
  document.querySelector(".start-btn").style.display = "block";
});
