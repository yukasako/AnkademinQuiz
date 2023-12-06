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


/* クイズ内容 */

let hamsterQuiz = [
    {
        Q: "Which hamster is the biggest?",
        A: ["Golden", true],
        B: ["Roborovski", false],
        C: ["Djungarian", false],
        D: ["Djungarian", false]
    },
    {
        Q: "How long is the lifespan of a hamster?",
        A: ["7 days", false],
        B: ["1-3 years", true],
        C: ["5-10 years", false],
        D: ["5-10 years", false]
    },
    {
        Q: "How long do hamster front teeth grow per week?",
        A: ["1-2 mm", true],
        B: ["1-2 cm", false],
        C: ["5 cm", false],
        D: ["5 cm", false],
    },
    {
        Q: "What color light are hamsters most sensitive to?",
        A: ["Red", true],
        B: ["Blue", false],
        C: ["Green", false],
        D: ["Blue", false],
    },
    {
        Q: "During which time of day are hamsters most active?",
        A: ["Morning", false],
        B: ["Afternoon", false],
        C: ["Night", true],
        D: ["Night", true],
    }
];

/* 要素指定 */

//　画像(img)
let mainImage = document.querySelector("#mainImage")

//　たね置き場(div)
let seeds = document.querySelector("#seed")

// 質問文表示(p)
let question = document.querySelector("#question")

//　回答ボタンたち３個(div, button)
let quizBtnDiv = document.querySelector("#buttons")
let quizBtns = document.querySelectorAll("[name='quiz']")
let btn1 = document.querySelector("#btn1")
let btn2 = document.querySelector("#btn2")
let btn3 = document.querySelector("#btn3")
let btn4 = document.querySelector("#btn4")

// result
let duckResult = document.querySelector("#duckResult");

/* hamsterNextボタンの設定 */
let hamsterResult = document.querySelector("#hamsterResult");
let hamsterNext = document.querySelector("#hamsterNext")
let sunflowerSeeds = 0;
hamsterNext.addEventListener("click", () => {
    //回答しないと次に進めないようNextボタンをオフ
    hamsterNext.style.display = "none";
    duckNext.style.display = "none";
    duckResult.style.display = "none";

    // クイズボタンボックスを表示
    quizBtnDiv.style.display = "flex";

    //ボタンたちをオンにし、背景色を戻す
    mainImage.setAttribute('src', "./img/hamster/hamster1.jpeg")
    quizBtns.forEach((btn) => {
        btn.disabled = false;
        btn.style.background = "lightgrey";
    })

    //Quiz Arrayの内容を引用してく
    if (sunflowerSeeds < hamsterQuiz.length) {
        hamsterNext.innerText = "Next";
        question.innerText = hamsterQuiz[sunflowerSeeds].Q;

        btn1.innerText = hamsterQuiz[sunflowerSeeds].A[0];
        btn1.setAttribute('value', hamsterQuiz[sunflowerSeeds].A[1]);

        btn2.innerText = hamsterQuiz[sunflowerSeeds].B[0];
        btn2.setAttribute('value', hamsterQuiz[sunflowerSeeds].B[1]);

        btn3.innerText = hamsterQuiz[sunflowerSeeds].C[0];
        btn3.setAttribute('value', hamsterQuiz[sunflowerSeeds].C[1]);

        btn4.innerText = hamsterQuiz[sunflowerSeeds].D[0];
        btn4.setAttribute('value', hamsterQuiz[sunflowerSeeds].D[1]);

        sunflowerSeeds++;
    }
    else { //Array内の質問完了
        hamsterNext.style.display = "none";
        duckNext.style.display = "flex";

        // タネの数によって評価
        if (seeds.childElementCount === 5) {
            mainImage.setAttribute('src', "./img/hamster/happyHamster.jpeg")
            hamsterResult.innerText = "Amazing!\n You answered all questions!\n Thank you hooman :)";
        }
        else if (seeds.childElementCount === 4) {
            mainImage.setAttribute('src', "./img/hamster/happyHamster.jpeg")
            hamsterResult.innerText = "Great!\n You got " + seeds.childElementCount + " seeds!\n Good job hooman :)";
        }
        else if (seeds.childElementCount >= 2) {
            hamsterResult.innerText = "Nice!\n You got " + seeds.childElementCount + " seeds!\n Not bad hooman :)";
        }
        else if (seeds.childElementCount === 1) {
            mainImage.setAttribute('src', "./img/hamster/sadHamster.jpeg")
            hamsterResult.innerText = "Oh no.\n Only " + seeds.childElementCount + " seed.\n I am hungryyyy!";
        }
        else {
            mainImage.setAttribute('src', "./img/hamster/sadHamster.jpeg")
            hamsterResult.innerText = "What!? No seed?\n Where is my food hooman!?";
        }
    }
})

/* 回答ボタンの設定 */

//　最初は回答ボタンをオフにしておく。（Start(Next)を押すとオン）
quizBtns.forEach((btn) => {
    btn.disabled = true;
})

// 最初はクイズボタンボックスを非表示に
quizBtnDiv.style.display = "none";

// 正解したら画像が変わってタネをもらえるよ
quizBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        hamsterNext.style.display = "block";
        //回答するとNextボタンが使える

        if (btn.value == "true") {
            // タネ増える
            let aSeed = document.createElement("img");
            aSeed.setAttribute('src', "./img/hamster/seed.jpeg");
            aSeed.style.width = "70px";
            seeds.append(aSeed);
            // ハム喜ぶ
            question.innerText = "Yay! Correct!";
            mainImage.setAttribute('src', "./img/hamster/happyHamster.jpeg");

        }
        else {
            question.innerText = "Ooops"
            mainImage.setAttribute('src', "./img/hamster/sadHamster.jpeg")
        }

        // 正解がピンクで表示され、回答ボタンをオフに
        quizBtns.forEach((btn) => {
            btn.disabled = true;
            if (btn.value == "true") {
                btn.style.background = "lightblue";
            }
        })
    })
})

/*------------ Duck Quiz ------------------*/

let duckQuiz = [
    {
        Q: "Which duck is the largest?",
        A: ["Mallard", false],
        B: ["Pekin", true],
        C: ["Muscovy", true],
        D: ["Khaki Campbell", false]
    },
    {
        Q: "What color eggs do most ducks lay?",
        A: ["White", true],
        B: ["Brown", false],
        C: ["Blue", false],
        D: ["Green", true]
    },
    {
        Q: "In what environment do ducks prefer to live?",
        A: ["Desert", false],
        B: ["Forest", false],
        C: ["Swamp", true],
        D: ["Mountains", true]
    }
];

let checkboxSubmit = document.querySelector("#checkboxSubmit")
let duckNext = document.querySelector("#duckNext")

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
    duckScore += trueCount.length;
    console.log(duckScore)

    if (trueCount.length === 0) {
        mainImage.setAttribute('src', "./img/duck/noDuck.jpeg")
        question.innerText = "Oh, No duck."
    }
    else if (trueCount.length === 1) {
        mainImage.setAttribute('src', "./img/duck/oneDuck.jpeg")
        question.innerText = "Nice, You found a duck!"
    }
    else if (trueCount.length === 2) {
        mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg")
        question.innerText = "Wow, You found 2 ducks!"
    }

    // NextBtn on
    duckNext.style.display = "flex";
    duckNext.innerText = "Next";
    checkboxSubmit.style.display = "none";
})

let i = 0;
duckNext.addEventListener("click", () => {
    //Quiz Arrayの内容を引用してく
    if (i < duckQuiz.length) {
        checkboxSubmit.innerText = "Submit Answer";
        question.innerText = duckQuiz[i].Q;

        label1.innerText = duckQuiz[i].A[0];
        box1.setAttribute('value', duckQuiz[i].A[1]);

        label2.innerText = duckQuiz[i].B[0];
        box2.setAttribute('value', duckQuiz[i].B[1]);

        label3.innerText = duckQuiz[i].C[0];
        box3.setAttribute('value', duckQuiz[i].C[1]);

        label4.innerText = duckQuiz[i].D[0];
        box4.setAttribute('value', duckQuiz[i].D[1]);

        i++;

        // クイズボタンボックスを表示
        checkboxDiv.style.display = "flex";
        checkboxSubmit.style.display = "flex";
        duckNext.style.display = "none";
        hamsterNext.style.display = "none";
        mainImage.setAttribute('src', "./img/duck/duck.jpeg")
    }
    else { //Array内の質問完了
        checkboxDiv.style.display = "none";
        duckNext.style.display = "none";
        checkboxSubmit.style.display = "none";
        hamsterNext.style.display = "flex";

        // 評価
        if (duckScore >= 4) {
            mainImage.setAttribute('src', "./img/duck/twoDucks.jpeg")
            duckResult.innerText = `Amazing!\n You found ${duckScore} ducks!`;
        }
        else if (duckScore >= 3) {
            duckResult.innerText = `Nice!\n You found ${duckScore} ducks!`;
        }
        else {
            mainImage.setAttribute('src', "./img/hamster/sadHamster.jpeg")
            duckResult.innerText = `${duckScore} ducks!?\n I need continue finding.`;
        }
    }

    //Check reset
    let checked = document.querySelectorAll("[name='checkbox']:checked");
    checked.forEach((box) => {
        box.checked = false;
    })
})

