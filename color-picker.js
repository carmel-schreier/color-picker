const inputR = document.querySelector(".R")
const inputG = document.querySelector(".G")
const inputB = document.querySelector(".B")

inputR.value = "";
inputG.value = "";
inputB.value = "";

const numberInputs = document.querySelector("#number-inputs")
const inputContainer = document.querySelector(".input-container")
const coloredContainer = document.querySelector(".color-container")
const submitBtn = document.querySelector(".submit-btn")
const textBox = document.querySelector(".text-box")
const savedColors = document.querySelector(".saved-colors")

let savedArr = [];
let flag = 0

numberInputs.addEventListener("submit", (e) => {
    e.preventDefault();
    if (flag == 2) {
        return clear()
    }
    if (validateValues()) {

        let R = inputR.value;
        let G = inputG.value;
        let B = inputB.value;

        if (flag == 0) createColor_1(R, G, B)
        else if (flag == 1) {
            createColor_2(R, G, B);
            submitBtn.value = "clear"
        }

    }

})

function validateValues() {
    let valid = true
    clearStatusClass()
    Array.from(inputContainer.children).forEach((elem) => {
        qq = elem.firstElementChild.value

        if (!qq) valid = false

        else if (qq && qq > 255) {
            elem.lastElementChild.classList.remove("hidden");
            valid = false


        } else if (qq && qq < 0) {
            elem.lastElementChild.innerHTML = "*positive numbers only"
            elem.lastElementChild.classList.remove("hidden");
            valid = false

        }
    })
    return valid
}

function clearStatusClass() {
    Array.from(inputContainer.children).forEach((elem) => {
        elem.lastElementChild.classList.add("hidden");
    })
}

function createColor_1(R, G, B) {
    createElement(R, B, G, 1)
    textBox.innerText = "Choose arguments for second color";
    flag = 1
}

function createColor_2(R, G, B) {
    createElement(R, B, G, 2)
    flag = 2
    textBox.innerText = "Click on colors to save"
}

function createElement(R, B, G, index) {
    let color = `rgb(${R}, ${G}, ${B})`
    let hex = ConvertRGBtoHex(R, G, B)
    let colorWrap = document.createElement("div");
    colorWrap.classList.add("color-wrap");
    coloredContainer.appendChild(colorWrap);
    let colored = document.createElement("div")
    colored.classList.add("colored");
    index == 1 ? colored.classList.add("first") : colored.classList.add("second")
    colored.style.backgroundColor = color;
    colorWrap.appendChild(colored);
    let rgbName = document.createElement("h3");
    rgbName.classList.add("color-name");
    rgbName.innerHTML = color + `<br>` + hex;
    colorWrap.appendChild(rgbName);
    colored.addEventListener("click", () => {
        colorObj = {
            R: R,
            G: G,
            B: B,
        }
        let compare = savedArr.filter(x => x.R == R && x.B == B && x.G == G)
        if (compare.length == 0) {
            savedArr.push(colorObj);
            copy = colorWrap.cloneNode(true)
            copy.classList.add("small")
            savedColors.appendChild(copy)
        }

    })
}

function clear() {
    while (coloredContainer.hasChildNodes()) {
        coloredContainer.removeChild(coloredContainer.firstChild);
    }
    submitBtn.value = "show color"
    textBox.innerText = "Choose RGB color parameters";
    flag = 0
}

function toHex(numb) {
    let hex = Number(numb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

function ConvertRGBtoHex(red, green, blue) {
    color = "#" + toHex(red) + toHex(green) + toHex(blue);
    return color.toUpperCase()
}