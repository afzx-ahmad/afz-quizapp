// Object that contain user data
let userData = {
  username: "",
  currentQuestion: 0,
  score: 0,
  userChoice: {},
};

// Object that contain question data
const dataQuiz = {
  q1: {
    question: "Siapa nama presiden pertama indonesia ?",
    optionAnswer: {
      a: "Soekarno",
      b: "Megawati",
      c: "Jokowi",
      d: "Prabowo",
    },
    correctAnswer: "a",
  },
  q2: {
    question: "Ibu kota negara Indonesia adalah ?",
    optionAnswer: {
      a: "New York",
      b: "Surabaya",
      c: "Jakarta",
      d: "Ngawi",
    },
    correctAnswer: "c",
  },
  q3: {
    question: "Bandara International Juanda berlokasi di ?",
    optionAnswer: {
      a: "Lumajang",
      b: "Surabaya",
      c: "Jakarta",
      d: "Ngawi",
    },
    correctAnswer: "b",
  },
};

// Get total Question
const totalQuestion = Object.keys(dataQuiz).length;

// tempOptionChoice for hold option value in previous question
let tempOptionChoice;

let tempCorrectOption;

// Randomize sort key of question
let sortQustionKeys;

let cMain;

window.addEventListener("load", () => {
  // Setting DOM
  cMain = document.querySelector("main");
  const cFirstButton = document.querySelector("button.firstButton");

  // Handling click button event to call 'StartQuiz' function
  cFirstButton.addEventListener("click", () => StartQuiz());
});

// AddChild function is used to add a component inside target component
function AddChild(element, pSection) {
  const section = [
    "firstSection",
    "generateQuiz",
    "wrongSection",
    "correctSection",
    "endSection",
  ];

  switch (pSection) {
    case section[0]: {
      // Create a div element with class name 'headerQuiz'
      const headerQuiz = document.createElement("div");
      headerQuiz.className = "headerQuiz";

      // Create a h2 element
      const h2QuizHeader = document.createElement("h2");

      // Insert text element inside h2 'h2QuizHeader'
      const textQuizHeader = document.createTextNode(
        "Please enter your name....",
      );
      h2QuizHeader.appendChild(textQuizHeader);

      // Insert h2 'h2QuizHeader' inside div 'headerQuiz'
      headerQuiz.appendChild(h2QuizHeader);

      // Insert div 'headerQuiz' inside main
      element.appendChild(headerQuiz);

      // Create a div element with class name 'bodyQuiz'
      const bodyQuiz = document.createElement("div");
      bodyQuiz.className = "bodyQuiz";

      // Create html element
      const bodyQuizContent = `<form id="userForm">
                <label for="name">Full Name</label>
                <input type="text" id="userName" name="name" required>
                <input type="submit" value="START" id="buttonStartQuiz">
            </form>`;
      // Insert html element inside 'bodyQuiz'
      bodyQuiz.insertAdjacentHTML("afterbegin", bodyQuizContent);

      // Insert div 'bodyQuiz' inside main
      element.appendChild(bodyQuiz);
      break;
    }
    case section[1]: {
      // Create a div element with class name 'headerQuiz'
      const headerQuiz = document.createElement("div");
      headerQuiz.className = "headerQuiz";

      // Create a h2 element
      const h2QuizHeader = document.createElement("h2");

      // Insert text element inside h2 'h2QuizHeader'
      const textQuizHeader = document.createTextNode(
        `Question Number ${userData.currentQuestion + 1}`,
      );
      h2QuizHeader.appendChild(textQuizHeader);

      // Insert h2 'h2QuizHeader' inside div 'headerQuiz'
      headerQuiz.appendChild(h2QuizHeader);

      // Insert div 'headerQuiz' inside main
      element.appendChild(headerQuiz);

      // Create a div element with class name 'bodyQuiz'
      const bodyQuiz = document.createElement("div");
      bodyQuiz.className = "bodyQuiz";

      // add id to 'bodyQuiz'
      bodyQuiz.id = "bodyQuiz1";

      // Create a div element with class name 'quiestionQuiz'
      const questionQuiz = document.createElement("div");
      questionQuiz.className = "questionQuiz";

      // Create html element and add question of current question
      const currentQuestion =
        dataQuiz[sortQustionKeys[userData.currentQuestion]];

      const questionQuizContent = `<p>${currentQuestion.question}</p>`;
      // Insert html element inside 'questionQuiz'
      questionQuiz.insertAdjacentHTML("afterbegin", questionQuizContent);

      // Insert div 'questionQuiz' inside 'questionQuiz'
      bodyQuiz.appendChild(questionQuiz);

      // Create a div element with class 'optionAnswer'
      const optionAnswer = document.createElement("div");
      optionAnswer.className = "optionAnswer";

      const randomOptionKey = GenerateRandom(currentQuestion.optionAnswer);
      console.table(randomOptionKey);
      // console.log(currentQuestion.optionAnswer[randomOptionKey["c"]]);

      let sortAbcd = "a";
      randomOptionKey.forEach((e) => {
        let optionAnswerContent = `<div class="option">
                <input type="radio" name="optionAnswer" id=${e} value=${e} />
                <label for=${e}><span style="text-transform: uppercase;">${sortAbcd}. </span>${currentQuestion.optionAnswer[e]}</label>
              </div>
            `;
        optionAnswer.insertAdjacentHTML("beforeend", optionAnswerContent);
        sortAbcd = String.fromCharCode(sortAbcd.charCodeAt(0) + 1);
      });
      bodyQuiz.appendChild(optionAnswer);

      const submitAnswer = document.createElement("button");
      submitAnswer.className = "submitAnswer";
      submitAnswer.insertAdjacentText("afterbegin", "next");
      bodyQuiz.appendChild(submitAnswer);

      element.appendChild(bodyQuiz);
      break;
    }
    case section[2]: {
      // Create a div element with class name 'headerQuiz'
      const headerQuiz = document.createElement("div");
      headerQuiz.className = "headerQuiz";
      headerQuiz.id = "checkAnswered";

      // Create a h2 element
      const h2QuizHeader = document.createElement("h2");

      // Insert text elemment / text node inside h2 'h2QuizHeader'tagName
      const textQuizHeader = document.createTextNode(
        `Question number ${userData.currentQuestion + 1}`,
      );
      h2QuizHeader.appendChild(textQuizHeader);

      // Insert h2 'h2QuizHeader' inside div 'headerQuiz'
      headerQuiz.appendChild(h2QuizHeader);

      // Insert div 'headerQuiz' inside main
      element.appendChild(headerQuiz);

      // Create a status incorect choice
      const statusIcon = `
        <svg class="statusIcon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 0C3.1325 0 0 3.1325 0 7C0 10.8675 3.1325 14 7 14C10.8675 14 14 10.8675 14 7C14 3.1325 10.8675 0 7 0ZM4.375 3.115L7 5.74L9.625 3.115L10.885 4.375L8.26 7L10.885 9.625L9.625 10.885L7 8.26L4.375 10.885L3.115 9.625L5.74 7L3.115 4.375L4.375 3.115Z" fill="black"/>
        </svg>
      `;

      // Insert 'statusIcon' to headerQuiz
      h2QuizHeader.insertAdjacentHTML("afterend", statusIcon);

      // Create a div element with class name 'bodyQuiz'
      const bodyQuiz = document.createElement("div");
      bodyQuiz.className = "bodyQuiz";

      // add id to 'bodyQuiz'
      bodyQuiz.id = "bodyQuiz1";

      // User answer section
      // Create div element and give a name userAnswerDes
      const userAnswerDes = document.createElement("div");
      userAnswerDes.className = "userAnswerDes";

      const userAnswerDesContent = document.createElement("p");
      userAnswerDesContent.innerText = "Your answer:";

      const userAnswerDesContent1 = document.createElement("p");
      userAnswerDesContent1.innerHTML = "Oops ☹️ <br>your choice is uncorrect";

      const currentUserChoice = document.createElement("p");
      currentUserChoice.className = "currentUserChoice";
      currentUserChoice.innerHTML = tempOptionChoice;
      console.table(userData.userChoice.userChoice);

      userAnswerDes.appendChild(userAnswerDesContent);
      userAnswerDes.appendChild(currentUserChoice);
      userAnswerDes.appendChild(userAnswerDesContent1);

      bodyQuiz.appendChild(userAnswerDes);

      // Reveal correct answer
      // Create a div element and giving a name revealCorrect
      const revealCorrect = document.createElement("div");
      revealCorrect.className = "revealCorrect";

      const revealCorrectContent = document.createElement("p");
      revealCorrectContent.innerText = "The correct answer:";

      const correctOption = document.createElement("p");
      correctOption.innerHTML = tempCorrectOption;

      revealCorrect.appendChild(revealCorrectContent);
      revealCorrect.appendChild(correctOption);

      bodyQuiz.appendChild(revealCorrect);

      const submitAnswer = document.createElement("button");
      submitAnswer.className = "submitAnswer";
      submitAnswer.insertAdjacentText("afterbegin", "next");
      bodyQuiz.appendChild(submitAnswer);

      element.appendChild(bodyQuiz);

      break;
    }
    case section[3]: {
      // Create a div element with class name 'headerQuiz'
      const headerQuiz = document.createElement("div");
      headerQuiz.className = "headerQuiz";
      headerQuiz.id = "checkAnswered";

      // Create a h2 element
      const h2QuizHeader = document.createElement("h2");

      // Insert text elemment / text node inside h2 'h2QuizHeader'tagName
      const textQuizHeader = document.createTextNode(
        `Question number ${userData.currentQuestion + 1}`,
      );
      h2QuizHeader.appendChild(textQuizHeader);

      // Insert h2 'h2QuizHeader' inside div 'headerQuiz'
      headerQuiz.appendChild(h2QuizHeader);

      // Insert div 'headerQuiz' inside main
      element.appendChild(headerQuiz);

      // Create a status incorect choice
      const statusIcon = `
        <svg class="statusIcon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 0C3.1325 0 0 3.1325 0 7C0 10.8675 3.1325 14 7 14C10.8675 14 14 10.8675 14 7C14 3.1325 10.8675 0 7 0ZM10.5 3.115L11.76 4.375L6.125 10.01L3.115 7L4.375 5.74L6.125 7.49L10.5 3.115Z" fill="black"/>
        </svg>
      `;

      // Insert 'statusIcon' to headerQuiz
      h2QuizHeader.insertAdjacentHTML("afterend", statusIcon);

      // Create a div element with class name 'bodyQuiz'
      const bodyQuiz = document.createElement("div");
      bodyQuiz.className = "bodyQuiz";

      // add id to 'bodyQuiz'
      bodyQuiz.id = "bodyQuiz1";

      // User answer section
      // Create div element and give a name userAnswerDes
      const userAnswerDes = document.createElement("div");
      userAnswerDes.className = "userAnswerDes";

      const userAnswerDesContent = document.createElement("p");
      userAnswerDesContent.innerText = "Your answer:";

      const userAnswerDesContent1 = document.createElement("p");
      userAnswerDesContent1.innerHTML = "Cool 👍 <br>your choice is correct";

      const currentUserChoice = document.createElement("p");
      currentUserChoice.className = "currentUserChoice";
      currentUserChoice.innerHTML = tempOptionChoice;
      console.table(userData.userChoice.userChoice);

      userAnswerDes.appendChild(userAnswerDesContent);
      userAnswerDes.appendChild(currentUserChoice);
      userAnswerDes.appendChild(userAnswerDesContent1);

      bodyQuiz.appendChild(userAnswerDes);

      const submitAnswer = document.createElement("button");
      submitAnswer.className = "submitAnswer";
      submitAnswer.insertAdjacentText("afterbegin", "next");
      bodyQuiz.appendChild(submitAnswer);

      element.appendChild(bodyQuiz);
      break;
    }
    case section[4]: {
      // Create a div element with class name 'headerQuiz'
      const headerQuiz = document.createElement("div");
      headerQuiz.className = "headerQuiz";

      // Create a h2 element
      const h2QuizHeader = document.createElement("h2");

      // Insert text elemment / text node inside h2 'h2QuizHeader'tagName
      const textQuizHeader = document.createTextNode("Your Final Score:");
      h2QuizHeader.appendChild(textQuizHeader);

      // Insert h2 'h2QuizHeader' inside div 'headerQuiz'
      headerQuiz.appendChild(h2QuizHeader);

      // Insert div 'headerQuiz' inside main
      element.appendChild(headerQuiz);

      // Create a div element with class name 'bodyQuiz'
      const bodyQuiz = document.createElement("div");
      bodyQuiz.className = "bodyQuiz";

      // User score section
      // Create div element and give a name userScoreContainer
      const userScoreContainer = document.createElement("div");
      userScoreContainer.className = "userScoreContainer";

      const resultSvg = `
        <svg class="scoreIcon" width="73" height="95" viewBox="0 0 73 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V95H73V47.5H31.2857V0H0ZM41.7143 0V35.625H73L41.7143 0ZM10.4286 23.75H20.8571V35.625H10.4286V23.75ZM10.4286 47.5H20.8571V59.375H10.4286V47.5ZM10.4286 71.25H52.1429V83.125H10.4286V71.25Z" fill="#FF8B8B"/>
        </svg>
      `;
      userScoreContainer.insertAdjacentHTML("afterbegin", resultSvg);

      const userScore = document.createElement("div");
      userScore.className = "userScore";

      const name = document.createElement("p");
      name.className = "usernameResult";
      name.innerHTML = `<span style="font-weight: bold;">Name : </span>${userData.username}`;

      const score = document.createElement("p");
      score.className = "scoreResult";
      score.innerHTML = `<span style="font-weight: bold;">Score: </span>${Math.floor((userData.score / totalQuestion) * 100)}`;

      userScore.appendChild(name);
      userScore.appendChild(score);

      userScoreContainer.appendChild(userScore);

      bodyQuiz.appendChild(userScoreContainer);

      const restartButton = document.createElement("button");
      restartButton.className = "restartButton";
      restartButton.insertAdjacentText("afterbegin", "START AGAIN");
      bodyQuiz.appendChild(restartButton);

      element.appendChild(bodyQuiz);
      break;
    }
    default: {
      console.log("No Section");
      throw new Error(`${pSection} does not exist`);
    }
  }
}

// CheckAnswer function is used to check input of answered choice
function CheckAnswer(userChoice) {
  tempOptionChoice = document.querySelector(
    `label[for='${userChoice}']`,
  ).innerHTML;

  // Record user choice
  userData.userChoice = {
    questionKey: sortQustionKeys[userData.currentQuestion],
    userChoice: userChoice,
  };

  const correctAnswer =
    dataQuiz[sortQustionKeys[userData.currentQuestion]].correctAnswer;

  tempCorrectOption = document.querySelector(
    `label[for='${correctAnswer}']`,
  ).innerHTML;

  RemoveChild(cMain);

  if (userChoice == correctAnswer) {
    userData.score += 1;
    AddChild(cMain, "correctSection");
  } else {
    AddChild(cMain, "wrongSection");
  }

  const nextButton = document.querySelector("button.submitAnswer");
  nextButton.addEventListener("click", () => {
    if (userData.currentQuestion == totalQuestion - 1) {
      EndQuiz();
    } else {
      userData.currentQuestion += 1;
      LoadQuiz("generateQuiz");
    }
  });
}

// GenerateRandom function is used to get random sort of question and answer option
function GenerateRandom(object) {
  let randomSortKey = [];

  // Get key of object 'object'
  const key = Object.keys(object);

  // Randomize index of 'key' and push on 'randomSortKey'
  while (randomSortKey.length < key.length) {
    let randomIndex = Math.floor(Math.random() * key.length);
    if (!randomSortKey.includes(key[randomIndex])) {
      randomSortKey.push(key[randomIndex]);
    }
  }

  return randomSortKey;
}

// RemoveChild function is used to remove all component inside target component
function RemoveChild(element) {
  while (element.firstElementChild) {
    element.removeChild(element.firstElementChild);
  }
}

// StartQuiz function is used to process after user clicked start button
function StartQuiz() {
  // Add id 'startQuiz'
  cMain.setAttribute("id", "startQuiz");

  // Remove the child;
  RemoveChild(cMain);
  AddChild(cMain, "firstSection");

  const UserSection = {
    startButton: document.getElementById("buttonStartQuiz"),
    form: document.getElementById("userForm"),
    nameField: document.getElementById("userName"),
  };

  UserSection.form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get value of user name form
    userData.username = UserSection.nameField.value;

    // Process to 'generateQuiz' section
    LoadQuiz("generateQuiz");
  });
}

// LoadQuiz function is used to process load quiz question
function LoadQuiz(section) {
  console.log(`current number: ${userData.currentQuestion}`);
  if (userData.currentQuestion == 0) {
    // Get randomize sort of question and answer option
    sortQustionKeys = GenerateRandom(dataQuiz);
  }

  // Remove all of child element inside a target
  RemoveChild(cMain);

  // Add some element inside a target element with specific section
  AddChild(cMain, section);

  const submitAnswerButton = document.querySelector(".submitAnswer");
  submitAnswerButton.disabled = true;

  const optionInputs = document.querySelectorAll("input[name='optionAnswer']");

  let userChoice;

  optionInputs.forEach((i) => {
    i.addEventListener("change", () => {
      if (i.checked) {
        userChoice = i.value;
        submitAnswerButton.disabled = false;
      }
    });
  });

  submitAnswerButton.addEventListener("click", () => {
    // Check answer
    CheckAnswer(userChoice);
  });
}

// EndQiz function is used to show user score in end of quiz
function EndQuiz() {
  // Remove all of child element inside a target
  RemoveChild(cMain);

  // AddChild endSection
  AddChild(cMain, "endSection");

  const restartButton = document.querySelector("button.restartButton");
  restartButton.addEventListener("click", () => {
    userData = {
      username: "",
      currentQuestion: 0,
      score: 0,
      userChoice: {},
    };

    StartQuiz();
  });
}
