/*---------------　モード選択　--------------------*/
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
    }
];

/*---------------　要素宣言　--------------------*/
let mainImage = document.querySelector("#mainImage") //　画像(img)
let score = document.querySelector("#score") //　スコア置き場(div)
let mainText = document.querySelector("#mainText") // 質問文表示(p)
let result = document.querySelector("#result") // result
let btnDiv = document.querySelector("#buttons") //　回答ボタンたち置き場
let checkboxSubmit = document.querySelector("#checkboxSubmit") // 提出ボタン
let next = document.querySelector("#next") // 次へButton（大事）

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
    btnDiv.innerHTML = "";    //前回の引用内容を消す。

    if (quizIndex <= 6) { //★Button type
        btnDiv.style.display = "flex";
        //★引用
        mainText.innerText = quiz[quizIndex].Q;
        quiz[quizIndex].Answers.forEach((answer) => {
            let answerBtn = document.createElement("button");
            answerBtn.innerText = answer[0];
            answerBtn.setAttribute('value', answer[1]);
            answerBtn.setAttribute('name', 'quiz');
            btnDiv.append(answerBtn);
            //★回答
            answerBtn.addEventListener("click", () => {
                next.style.display = "block";
                next.innerText = "Next";
                if (answerBtn.value === "true") {
                    addDuck();
                    mainText.innerText = "Yay! Correct!";
                    mainImage.setAttribute('src', "./img/duck/oneDuck.jpeg");
                }
                else {
                    mainText.innerText = "Ooops";
                    mainImage.setAttribute('src', "./img/duck/noDuck.jpeg");
                    answerBtn.style.textDecoration = "line-through";
                }
                // 正解ボタンの色付け
                let answerBtns = document.querySelectorAll("[name='quiz']");
                answerBtns.forEach((btn) => {
                    btn.disabled = true;
                    if (btn.value === "true") {
                        btn.style.backgroundColor = "lightblue";
                    }
                })
            })
        })
        quizIndex++;
    }
    else if (quizIndex < quiz.length) { //★Checkbox type
        //★引用
        mainText.innerText = quiz[quizIndex].Q;
        quiz[quizIndex].Answers.forEach((answer) => {
            let checkboxDiv = document.createElement("div")
            let checkbox = document.createElement("input");
            checkbox.setAttribute(`type`, `checkbox`);
            checkbox.setAttribute(`id`, answer[0]);
            checkbox.setAttribute(`value`, answer[1]);
            let label = document.createElement("label");
            label.innerText = answer[0];
            label.setAttribute(`for`, answer[0]);
            checkboxDiv.append(checkbox);
            checkboxDiv.append(label);
            btnDiv.append(checkboxDiv);
        })
        //チェックボックスの個数制限。ボックスがチェック（チェンジ）される度にチェック数（length）を取得しcheckMaxと比較。超えていたらチェックできなくする。
        let checkMax = 2;
        let checkBoxes = document.querySelectorAll("[type='checkbox']");
        checkBoxes.forEach((aBox) => {
            aBox.addEventListener(`change`, () => {
                let checked = document.querySelectorAll("[type='checkbox']:checked")
                if (checked.length > checkMax) {
                    aBox.checked = false;
                }
            })
        })
        // ★チェックボックスSubmitで回答を提出。チェックしたもののValueがTrueだったらArrayに追加してその長さで判断。
        checkboxSubmit.style.display = "block";
        checkboxSubmit.addEventListener("click", () => {
            let checkedTrue = [];
            let checked = document.querySelectorAll("[type='checkbox']:checked");
            checked.forEach((aChecked) => {
                if (aChecked.value === "true") {
                    checkedTrue.push(aChecked);
                }
            })    
            if (checkedTrue.length === 0) {
                mainImage.setAttribute('src', "./img/duck/noDuck.jpeg")
                mainText.innerText = "Oh, No duck."
            }
            else if (checkedTrue.length === 1) {
                mainImage.setAttribute('src', "./img/duck/oneDuck.jpeg")
                mainText.innerText = "Nice, You found a duck!"
                addDuck()
            }
            else if (checkedTrue.length === 2) {
                mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg")
                mainText.innerText = "Wow, You found 2 ducks!"
                addDuck()
                addDuck()
            }
            //正しい回答を青文字に　nextElementSibling
            let checkBoxes = document.querySelectorAll("input");
            checkBoxes.forEach((box) => {
                box.nextElementSibling.style.color = "lightgrey"
                if (box.value === "true") {
                    box.nextElementSibling.style.color = "blue";
                }
            })
            // NextBtn on, Submit off
            next.style.display = "block";
            checkboxSubmit.style.display = "none";
        })
        quizIndex++;
    }
    else { //Result（Array内の質問完了）
        btnDiv.style.display = "none";
        next.style.display = "block"; //もう一回遊ぶ
        next.innerText = "Continue finding";
        quizIndex = 0;
        // 評価 Max 15
        if (score.childElementCount >= 11) {
            mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg")
            mainText.innerText = `Amazing!\n You found ${score.childElementCount} ducks!`;
            next.style.display = "none"
        }
        else if (score.childElementCount >= 8) {
            mainImage.setAttribute('src', "./img/duck/oneDuck.jpeg")
            mainText.innerText = `Nice!\n You found ${score.childElementCount} ducks!`;
        }
        else {
            mainImage.setAttribute('src', "./img/duck/noDuck.jpeg")
            mainText.innerText = `Only ${score.childElementCount} ducks!?\n I need continue finding.`;
        }
    }
})