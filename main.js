/*---------------　モード選択　--------------------*/
let darkModeBtn = document.querySelector("#darkMode");
let lightModeBtn = document.querySelector("#lightMode");
let mode = (btn, backgroundColor, fontColor) => {
    btn.addEventListener("click", () => {
        document.body.style.background = backgroundColor;
        document.body.style.color = fontColor;
    })
}
mode(darkModeBtn, "#121212", "white")
mode(lightModeBtn, "white", "black")

let quiz = [
    {
        Type: "button",
        Q: "Ducks recognize the first thing they see after hatching as their parents. \n True or False?",
        Answers: [
            ["True", true],
            ["False", false],
        ]
    },
    {
        Type: "button",
        Q: "What the phenomenon in the previous question is called?",
        Answers: [
            ["Ducking", false],
            ["Imprinting", true],
            ["Installing", false],
            ["Mimicking", false],
        ]
    },
    {
        Type: "checkbox",
        Q: "Choose two options. \n Which bird can imitate human words?",
        Answers: [
            ["Duck", false],
            ["Cockatiel", true],
            ["Cassowary", false],
            ["Budgerigar", true]
        ]
    },
    {
        Type: "button",
        Q: "Ducks often sleep by standing on one leg.",
        Answers: [
            ["True", true],
            ["False", false]
        ]
    },
    {
        Type: "checkbox",
        Q: "Choose two options. \n Which birds can potentially live more than 40 years?",
        Answers: [
            ["Duck", false],
            ["Quail", false],
            ["Barn Owl", true],
            ["Flamingo", true]
        ]
    },
    {
        Type: "button",
        Q: "What is the typical lifespan of a duck?",
        Answers: [
            ["3 years", false],
            ["8 years", true],
            ["13 years", false],
            ["20 years", false]
        ]
    },
    {
        Type: "checkbox",
        Q: "Choose two options. \n Which character is modeled after a duck?",
        Answers: [
            ["Chocobo of Final Fantacy", false],
            ["Donald Duck of Disney", true],
            ["Tweety of Looney Tunes", false],
            ["Farfetch'd of Pokemon", true],
        ]
    },
    {
        Type: "button",
        Q: "What is a group of ducks called?",
        Answers: [
            ["Herd", false],
            ["Pod", false],
            ["Flock", true],
            ["Quack", false],
        ]
    },
    {
        Type: "button",
        Q: "Which duck is the largest?",
        Answers: [
            ["Mallard", false],
            ["Pekin", false],
            ["Muscovy", true],
            ["Khaki Campbell", false]
        ]
    },
    {
        Type: "checkbox",
        Q: "Choose 2 options. \n In Japan, ducks are often raised in rice paddies. Because... ",
        Answers: [
            ["They are believed as the god of agriculture.", false],
            ["They are cute and good for landscape.", false],
            ["They eat weeds and pests.", true],
            ["They mix the mud and promotes the rice growth.", true],
        ]
    }
];

/*---------------　要素宣言　---------------*/
let mainImage = document.querySelector("#mainImage") //　画像(img)
let score = document.querySelector("#score") //　スコア置き場(div)
let mainText = document.querySelector("#mainText") // 質問文表示(p)
let btnDiv = document.querySelector("#buttons") //　回答ボタンたち置き場
let next = document.querySelector("#next") // 次へButton（大事）
let confetti = document.querySelector("#confetti");

/*---------------　Function　---------------*/
let addDuck = () => {
    let aDuck = document.createElement("img");
    aDuck.setAttribute('src', "./img/duck/scoreDuck.jpeg");
    aDuck.style.width = "50px";
    score.append(aDuck);
}

let addConfetti = (color) => {
    confetti.style.display = "block";
    confetti.firstElementChild.setAttribute("src", `./img/confetti/${color}Left.jpeg`);
    confetti.lastElementChild.setAttribute("src", `./img/confetti/${color}Right.jpeg`);
}

/*---------------　Nextボタンでクイズを引用　---------------*/
let quizIndex = 0;
next.addEventListener("click", () => {
    // クイズオープン
    mainImage.setAttribute('src', "./img/duck/duck.jpeg");
    next.style.display = "none";
    btnDiv.innerHTML = "";    //前回の引用内容を消す。

    if (quizIndex >= quiz.length) { //Result（Array内の質問完了）
        btnDiv.style.display = "none";
        next.innerText = "Continue finding";
        quizIndex = 0;
        // 評価 Max 14
        if (score.childElementCount >= 14 * 0.75) {
            mainImage.setAttribute('src', "./img/duck/happyDuck.jpeg");
            mainText.innerText = `Amazing!\n You found ${score.childElementCount} ducks!`;
            addConfetti(`green`)
        }
        else if (score.childElementCount >= 14 * 0.5) {
            mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg");
            mainText.innerText = `Nice!\n You found ${score.childElementCount} ducks!`;
            addConfetti(`orange`)
        }
        else {
            mainImage.setAttribute('src', "./img/duck/sadRedDuck.jpeg");
            mainText.innerText = `Only ${score.childElementCount} ducks!?\n You need to continue finding ducks.`;
            next.style.display = "block"; //もう一回遊ぶ
        }
    }
    else if (quiz[quizIndex].Type === "button") { //★Button type
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
                    mainImage.setAttribute('src', "./img/duck/happyDuck.jpeg");
                }
                else {
                    mainText.innerText = "Qwhaaat!?";
                    mainImage.setAttribute('src', "./img/duck/sadDuck.jpeg");
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
    else if (quiz[quizIndex].Type === "checkbox") { //★Checkbox type
        //★引用。クイズボタン作成
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
            checkboxDiv.append(checkbox, label);
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
        // 提出ボタン
        let checkboxSubmit = document.createElement("button")
        checkboxSubmit.innerText = "Submit"
        next.parentNode.insertBefore(checkboxSubmit, next);
        // ★チェックボックスSubmitで回答を提出。チェックしたもののValueがTrueだったらArrayに追加してその長さで判断。
        let checkedTrue = [];
        checkboxSubmit.addEventListener("click", () => {
            let checked = document.querySelectorAll("[type='checkbox']:checked");
            checked.forEach((aChecked) => {
                if (aChecked.value === "true") {
                    checkedTrue.push(aChecked);
                }
            })
            if (checkedTrue.length === 0) {
                mainImage.setAttribute('src', "./img/duck/sadDuck.jpeg")
                mainText.innerText = "Qwhaaat!?"
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
})