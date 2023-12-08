/* モード選択 */
let darkModeBtn = document.querySelector("#darkMode");
let lightModeBtn = document.querySelector("#lightMode");
let mode = (btn, backgroundColor, fontColor) => {
    btn.addEventListener("click", () => {
        document.body.style.background = backgroundColor;
        document.body.style.color = fontColor;
    })
}
mode(darkModeBtn, "black", "white")
mode(lightModeBtn, "white", "black")

let quiz = [
    //T/F
    {
        Q: "Which hamster is the biggest?",
        Answers: [
            ["Golden", true],
            ["Roborovski", false],
        ]
    },
    {
        Q: "Which hamster is the biggest?",
        Answers: [
            ["Golden", true],
            ["Roborovski", false],
        ]
    },
    // Multipule
    {
        Q: "Which hamster is the biggest?",
        Answers: [
            ["Golden", true],
            ["Roborovski", false],
            ["Djungarian", false],
            ["Djungarian", false]
        ]
    },
    {
        Q: "How long is the lifespan of a hamster?",
        Answers: [
            ["7 days", false],
            ["1-3 years", true],
            ["5-10 years", false],
            ["5-10 years", false]
        ]
    },
    {
        Q: "How long do hamster front teeth grow per week?",
        Answers: [
            ["1-2 mm", true],
            ["1-2 cm", false],
            ["5 cm", false],
            ["5 cm", false]
        ]
    },
    {
        Q: "What color light are hamsters most sensitive to?",
        Answers: [
            ["Red", true],
            ["Blue", false],
            ["Green", false],
            ["Blue", false]
        ]
    },
    {
        Q: "During which time of day are hamsters most active?",
        Answers: [
            ["Morning", false],
            ["Afternoon", false],
            ["Night", true],
            ["Night", true],
        ]
    },
    // Check Box
    {
        Q: "Choose 2 options. \n \n Which duck is the largest?",
        Answers: [
            ["Mallard", false],
            ["Pekin", true],
            ["Muscovy", true],
            ["Khaki Campbell", false]
        ]
    },
    {
        Q: "Choose 2 options. \n \n What color eggs do most ducks lay?",
        Answers: [
            ["White", true],
            ["Brown", false],
            ["Blue", false],
            ["Green", true]
        ]
    },
    {
        Q: "Choose 2 options. \n \n In what environment do ducks prefer to live?",
        Answers: [
            ["Desert", false],
            ["Forest", false],
            ["Swamp", true],
            ["Mountains", true]
        ]
    },
];

/*---------------　要素宣言　--------------------*/
//　画像(img)
let mainImage = document.querySelector("#mainImage")
//　スコア置き場(div)
let score = document.querySelector("#score")
// 質問文表示(p)
let question = document.querySelector("#question")
// result
let result = document.querySelector("#result");
//　回答ボタンたち置き場
let btnDiv = document.querySelector("#buttons")
// 提出ボタン
let checkboxSubmit = document.querySelector("#checkboxSubmit")
// 次へButton（大事）
let next = document.querySelector("#next")

/*---------------　Function　--------------------*/
let addDuck = () => {
    let aDuck = document.createElement("img");
    aDuck.setAttribute('src', "./img/duck/scoreDuck.jpeg");
    aDuck.style.width = "50px";
    score.append(aDuck);
}

/*---------------　Nextボタンでクイズを引用　--------------------*/

let quizIndex = 0;
next.addEventListener("click", () => {
    // クイズオープン
    mainImage.setAttribute('src', "./img/duck/duck.jpeg");
    next.style.display = "none";
    //前回の引用内容を消す。
    btnDiv.innerHTML = "";

    //引用
    if (quizIndex <= 6) { //Button type
        btnDiv.style.display = "block";
        //引用
        question.innerText = quiz[quizIndex].Q;
        quiz[quizIndex].Answers.forEach((answer) => {
            let answerBtn = document.createElement("button");
            answerBtn.innerText = answer[0];
            answerBtn.setAttribute('value', answer[1]);
            answerBtn.setAttribute('name', 'quiz');
            btnDiv.append(answerBtn);
            //回答
            answerBtn.addEventListener("click", () => {
                next.style.display = "block";
                next.innerText = "Next";

                if (answerBtn.value == "true") {
                    addDuck();
                    question.innerText = "Yay! Correct!";
                    mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg");
                }
                else {
                    question.innerText = "Ooops";
                    mainImage.setAttribute('src', "./img/duck/noDuck.jpeg");
                    answerBtn.style.backgroundColor = "lightpink";
                }

                // 正解ボタンの色付け
                let answerBtns = document.querySelectorAll("[name='quiz']");
                answerBtns.forEach((btn) => {
                    if (btn.value == "true") {
                        btn.style.backgroundColor = "lightblue";
                    }
                })
            })
        })
        quizIndex++;
    }
    else if (quizIndex < quiz.length) { //Checkbox type
        // Checkbox Open
        checkboxSubmit.style.display = "block";
        //引用
        question.innerText = quiz[quizIndex].Q;
        quiz[quizIndex].Answers.forEach((answer) => {
            let checkbox = document.createElement("input");
            checkbox.setAttribute(`type`, `checkbox`);
            checkbox.setAttribute(`id`, `${answer[0]}`);
            checkbox.setAttribute(`value`, `${answer[1]}`);
            let label = document.createElement("label");
            label.innerText = answer[0];
            label.setAttribute(`for`, `${answer[0]}`);
            btnDiv.append(checkbox);
            btnDiv.append(label);
        })
        quizIndex++;
    }
    else { //Array内の質問完了
        next.style.display = "none";
        btnDiv.style.display = "none";
        question.style.display = "none";
        // 評価 Max 15
        if (score.childElementCount >= 11) {
            mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg")
            result.innerText = `Amazing!\n You found ${score.childElementCount} ducks!`;
        }
        else if (score.childElementCount >= 8) {
            mainImage.setAttribute('src', "./img/duck/oneDuck.jpeg")
            result.innerText = `Nice!\n You found ${score.childElementCount} ducks!`;
        }
        else {
            mainImage.setAttribute('src', "./img/duck/noDuck.jpeg")
            result.innerText = `${score.childElementCount} ducks!?\n I need continue finding.`;
        }
    }
})

/*---------------　チェックボックスの回答　--------------------*/
checkboxSubmit.addEventListener("click", () => {
    checkedAnswer = [];
    let checked = document.querySelectorAll("[type='checkbox']:checked");
    checked.forEach((aChecked) => {
        checkedAnswer.push(aChecked.value);
    })
    let trueCount = checkedAnswer.filter((value) => {
        return value === "true";
    })

    if (trueCount.length === 0) {
        mainImage.setAttribute('src', "./img/duck/noDuck.jpeg")
        question.innerText = "Oh, No duck."
    }
    else if (trueCount.length === 1) {
        mainImage.setAttribute('src', "./img/duck/oneDuck.jpeg")
        question.innerText = "Nice, You found a duck!"
        addDuck()
    }
    else if (trueCount.length === 2) {
        mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg")
        question.innerText = "Wow, You found 2 ducks!"
        addDuck()
        addDuck()
    }
    //正しい回答を青文字に　nextElementSibling
    let checkBoxes = document.querySelectorAll("input");
    checkBoxes.forEach((box) => {
        if (box.value === "true") {
            box.nextElementSibling.style.color = "blue";
            box.nextElementSibling.style.backgroundColor = "lightyellow";
        }
    })
    // NextBtn on, Submit off
    next.style.display = "block";
    checkboxSubmit.style.display = "none";
})