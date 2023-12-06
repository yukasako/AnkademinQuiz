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
    // T/F
    {
        Q: "Which hamster is the biggest?",
        A1: ["Golden", true],
        A2: ["Roborovski", false],
    },
    {
        Q: "Which hamster is the biggest?",
        A1: ["Golden", true],
        A2: ["Roborovski", false],
    },
    // Multipule
    {
        Q: "Which hamster is the biggest?",
        A1: ["Golden", true],
        A2: ["Roborovski", false],
        A3: ["Djungarian", false],
        A4: ["Djungarian", false]
    },
    {
        Q: "How long is the lifespan of a hamster?",
        A1: ["7 days", false],
        A2: ["1-3 years", true],
        A3: ["5-10 years", false],
        A4: ["5-10 years", false]
    },
    {
        Q: "How long do hamster front teeth grow per week?",
        A1: ["1-2 mm", true],
        A2: ["1-2 cm", false],
        A3: ["5 cm", false],
        A4: ["5 cm", false],
    },
    {
        Q: "What color light are hamsters most sensitive to?",
        A1: ["Red", true],
        A2: ["Blue", false],
        A3: ["Green", false],
        A4: ["Blue", false],
    },
    {
        Q: "During which time of day are hamsters most active?",
        A1: ["Morning", false],
        A2: ["Afternoon", false],
        A3: ["Night", true],
        A4: ["Night", true],
    },
    // Check Box
    {
        Q: "Choose 2 options. \n \n Which duck is the largest?",
        A1: ["Mallard", false],
        A2: ["Pekin", true],
        A3: ["Muscovy", true],
        A4: ["Khaki Campbell", false]
    },
    {
        Q: "Choose 2 options. \n \n What color eggs do most ducks lay?",
        A1: ["White", true],
        A2: ["Brown", false],
        A3: ["Blue", false],
        A4: ["Green", true]
    },
    {
        Q: "Choose 2 options. \n \n In what environment do ducks prefer to live?",
        A1: ["Desert", false],
        A2: ["Forest", false],
        A3: ["Swamp", true],
        A4: ["Mountains", true]
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

//　回答ボタンたち３個(div, button)
let btnDiv = document.querySelector("#buttons")
let quizBtns = document.querySelectorAll("[name='quiz']")
let btn1 = document.querySelector("#btn1")
let btn2 = document.querySelector("#btn2")
let btn3 = document.querySelector("#btn3")
let btn4 = document.querySelector("#btn4")

//　checkboxたち4個(div, button)
let checkboxDiv = document.querySelector("#checkbox")
let checkBoxes = document.querySelectorAll("[name='checkbox']")
let box1 = document.querySelector("#box1")
let box2 = document.querySelector("#box2")
let box3 = document.querySelector("#box3")
let box4 = document.querySelector("#box4")
let label1 = document.querySelector("#labelForBox1")
let label2 = document.querySelector("#labelForBox2")
let label3 = document.querySelector("#labelForBox3")
let label4 = document.querySelector("#labelForBox4")

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

let i = 0;
next.addEventListener("click", () => {
    // クイズオープン
    mainImage.setAttribute('src', "./img/duck/duck.jpeg")
    next.style.display = "none";

    //Check reset
    let checked = document.querySelectorAll("[name='checkbox']:checked");
    checked.forEach((box) => {
        box.checked = false;
    })

    //クイズボタンたちをオンに
    quizBtns.forEach((btn) => {
        btn.disabled = false;
        btn.style.background = "lightgrey";
    })

    //引用
    if(i <= 1){
        btnDiv.style.display = "block";
        question.innerText = quiz[i].Q;
        btn1.innerText = quiz[i].A1[0];
        btn1.setAttribute('value', quiz[i].A1[1]);
        btn2.innerText = quiz[i].A2[0];
        btn2.setAttribute('value', quiz[i].A2[1]);
        btn3.style.display = "none";
        btn4.style.display = "none";
        i++;
    }
    else if (i <= 6) {
        // Button Open
        question.innerText = quiz[i].Q;
        btn1.innerText = quiz[i].A1[0];
        btn1.setAttribute('value', quiz[i].A1[1]);
        btn2.innerText = quiz[i].A2[0];
        btn2.setAttribute('value', quiz[i].A2[1]);

        btn3.style.display = "block";
        btn3.innerText = quiz[i].A3[0];
        btn3.setAttribute('value', quiz[i].A3[1]);
        btn4.style.display = "block";
        btn4.innerText = quiz[i].A4[0];
        btn4.setAttribute('value', quiz[i].A4[1]);
        i++;

    }
    else if (i < quiz.length) {
        // Checkbox Open
        btnDiv.style.display = "none";
        checkboxDiv.style.display = "flex";
        checkboxSubmit.style.display = "block";

        question.innerText = quiz[i].Q;
        label1.innerText = quiz[i].A1[0];
        box1.setAttribute('value', quiz[i].A1[1]);
        label2.innerText = quiz[i].A2[0];
        box2.setAttribute('value', quiz[i].A2[1]);
        label3.innerText = quiz[i].A3[0];
        box3.setAttribute('value', quiz[i].A3[1]);
        label4.innerText = quiz[i].A4[0];
        box4.setAttribute('value', quiz[i].A4[1]);
        i++;
    }
    else { //Array内の質問完了
        next.style.display = "none";
        checkboxDiv.style.display = "none";
        btnDiv.style.display = "none";
        question.style.display = "none";

        // 評価
        if (duckScore >= 4) {
            mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg")
            result.innerText = `Amazing!\n You found ${duckScore} ducks!`;
        }
        else if (duckScore >= 3) {
            mainImage.setAttribute('src', "./img/duck/oneDuck.jpeg")
            result.innerText = `Nice!\n You found ${duckScore} ducks!`;
        }
        else {
            mainImage.setAttribute('src', "./img/duck/noDuck.jpeg")
            result.innerText = `${duckScore} ducks!?\n I need continue finding.`;
        }
    }
})

/*---------------　チェックボックスの回答　--------------------*/

duckScore = 0;
checkboxSubmit.addEventListener("click", () => {
    checkedAnswer = [];
    let checked = document.querySelectorAll("[name='checkbox']:checked");
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
        duckScore++;
        addDuck()
    }
    else if (trueCount.length === 2) {
        mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg")
        question.innerText = "Wow, You found 2 ducks!"
        duckScore += 2;
        addDuck()
        addDuck()
    }
    console.log(duckScore)

    // NextBtn on
    next.style.display = "block";
    next.innerText = "Next";
    checkboxSubmit.style.display = "none";
})

/*---------------　ボタンタイプの回答　--------------------*/

quizBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        next.style.display = "block";
        next.innerText = "Next";

        if (btn.value == "true") {
            duckScore++;
            addDuck()
            question.innerText = "Yay! Correct!";
            mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg");
        }
        else {
            question.innerText = "Ooops"
            mainImage.setAttribute('src', "./img/duck/noDuck.jpeg")
        }

        // 正解がlightBlueで表示され、回答ボタンをオフに
        quizBtns.forEach((btn) => {
            btn.disabled = true;
            if (btn.value == "true") {
                btn.style.background = "lightblue";
            }
        })
        console.log(duckScore)

    })
})