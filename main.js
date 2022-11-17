// Global
let toastContent = null;
const defaultColor = {
    red: 0,
    green: 0,
    blue: 0,
};



// Background Sound
const backgroundCopySound = new Audio('./what-a-fuck-120320.mp3')



// Preset Colors
const defaultPresetColors = [
    "#94FE7A",
    "#6380D5",
    "#4A071B",
    "#E826D0",
    "#BCE781",
    "#698011",
    "#2B5F82",
    "#644552",
    "#AD1F3E",
    "#8E1400",
    "#C230A1",
    "#321477",
    "#F02D8E",
    "#3C6400",
    "#6EFA84",
    "#8B225D",
    "#9FBABA",
    "#81CF19"
]



// Custom Colors
const customColors = []



// Onload handler
window.onload = () => {
    main();
    updateColorCodes(defaultColor);

    // display preset colors
    presetColorBoxesDisplay(
        document.getElementById('preset_colors'),
        defaultPresetColors
    );
}



// main or boot function, this function will take care of getting all the DOM references
function main() {

    // DOM Reference
    const randomGenerateColorBtn = document.getElementById("random-generate-color");
    const colorHexInput = document.getElementById("input-hex");
    const redColorRange = document.getElementById("color-range-red");
    const greenColorRange = document.getElementById("color-range-green");
    const blueColorRange = document.getElementById("color-range-blue");
    const saveToCustomBtn = document.getElementById("save_to_custom");
    const copyToClipboard = document.getElementById("copy_to_clipboard");
    const presetColorsPuppy = document.getElementById("preset_colors");
    const customColorsPallet = document.getElementById("custom_colors");



    // Event listeners
    randomGenerateColorBtn.addEventListener('click', handleGenerateRandomColorBtn);

    colorHexInput.addEventListener('keyup', handleColorHexInput);


    redColorRange.addEventListener("change", handleColorRange(redColorRange, greenColorRange, blueColorRange));
    greenColorRange.addEventListener("change", handleColorRange(redColorRange, greenColorRange, blueColorRange));
    blueColorRange.addEventListener("change", handleColorRange(redColorRange, greenColorRange, blueColorRange));


    saveToCustomBtn.addEventListener("click", handleSaveToCustomColorBtn(customColorsPallet, colorHexInput));
    copyToClipboard.addEventListener("click", handleCopyToClipboard);


    presetColorsPuppy.addEventListener("click", handlePresetColorsPuppy)
}



// Event handlers
function handleGenerateRandomColorBtn() {
    const color = generateColorDecimal();
    updateColorCodes(color);

}


function handleColorHexInput(e) {
    const hexColor = e.target.value;

    if (hexColor) {
        this.value = hexColor.toUpperCase();

        if (isHexValid(hexColor)) {
            const color = hexToDecimalColors(hexColor);
            updateColorCodes(color);
        }
    }
}


function handleColorRange(redColorRange, greenColorRange, blueColorRange) {


    return function () {
        const color = {
            red: parseInt(redColorRange.value),
            green: parseInt(greenColorRange.value),
            blue: parseInt(blueColorRange.value),
        };
        updateColorCodes(color)
    }
}


function handleCopyToClipboard() {
    const colorModeRadios = document.getElementsByName("color_mode");
    const radioMode = checkValueFromRadios(colorModeRadios);

    if (radioMode === null) {
        throw new Error("Your radio input invalid")
    }


    if (toastContent !== null) {
        toastContent.remove();
        toastContent = null
    }


    if (radioMode === 'hex') {
        const hexColor = document.getElementById("input-hex").value;

        if (hexColor && isHexValid(hexColor)) {
            window.navigator.clipboard.writeText(`#${hexColor}`);
            toastMessage(`#${hexColor} Copied!!`)
        } else {
            alert("Invalid hex color code.")
        }

    } else {
        const rgbColor = document.getElementById("input-rgb").value;

        if (rgbColor) {
            window.navigator.clipboard.writeText(rgbColor);
            toastMessage(`${rgbColor} Copied!!`)
        } else {
            alert("Invalid rgb color code.")
        }
    }

}


function handlePresetColorsPuppy(e) {
    if (e.target.className === "single_colorBox") {
        window.navigator.clipboard.writeText(e.target.getAttribute("data-color"));
        backgroundCopySound.volume = 0.5;
        backgroundCopySound.play();
    }
}


function handleSaveToCustomColorBtn(customColorsPallet, inputHex) {

    return function () {
        customColors.push(`#${inputHex.value}`);

        removeChildren(customColorsPallet);
        presetColorBoxesDisplay(customColorsPallet, customColors)
    }
}

// DOM Function

/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} msg
 */

function toastMessage(msg) {
    toastContent = document.createElement('div');
    toastContent.innerText = msg;
    toastContent.className = 'toast-message toast-message-slide-in';


    toastContent.addEventListener('click', function () {
        toastContent.classList.remove('toast-message-slide-in');
        toastContent.classList.add('toast-message-slide-out');

        toastContent.addEventListener('animationend', function () {

            toastContent.remove();
            toastContent = null;
        })
    })

    document.body.appendChild(toastContent);
}



/**
 * find the checked elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {string | null}
 */

function checkValueFromRadios(nodes) {
    let valueChecked = null;
    for (let i = 0; i < nodes.length; i++) {

        if (nodes[i].checked) {
            valueChecked = nodes[i].value;
            break;
        }
    }
    return valueChecked;
}




/**
 * update dom elements with calculated color values
 * @param {object} color : ;
 */

function updateColorCodes(color) {
    const rgbColor = generateRGBColor(color);
    const hexColor = generateHexColor(color);


    // Reference
    document.getElementById("color-display").style.background = `#${hexColor}`;
    document.getElementById("input-hex").value = hexColor;
    document.getElementById("input-rgb").value = rgbColor;

    document.getElementById("color-range-red-label").innerText = color.red;
    document.getElementById("color-range-red").value = color.red;

    document.getElementById("color-range-green-label").innerText = color.green;
    document.getElementById("color-range-green").value = color.green;

    document.getElementById("color-range-blue-label").innerText = color.blue;
    document.getElementById("color-range-blue").value = color.blue;



}




/**
 * create a div element with class name color-box
 * @param {string} color : ;
 * @returns {object}
 */
function singleColorBoxGenerator(color) {
    const div = document.createElement("div");
    div.className = "single_colorBox";
    div.style.background = color;
    div.style.border = `1px solid ${color}`
    div.setAttribute("data-color", color);

    return div;
}




/**
 * this function will create and append new color boxes to it's parent
 * @param {object} parent
 * @param {Array} colors
 */
function presetColorBoxesDisplay(puppy, colors) {
    colors.forEach(color => {
        const colorBox = singleColorBoxGenerator(color);
        puppy.appendChild(colorBox);
    })
}



/**
 * remove all children from parent
 * @param {object} parent
 */
function removeChildren(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}



// Utilities Function
/**
 * generate and return an object of three color decimal values
 * @returns {object}}
 */

function generateColorDecimal() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return {
        red,
        green,
        blue,
    };
}





/**
 * take a color object of three decimal values and return a hexadecimal color code
 * @param {object} color
 * @returns {string}
 */

function generateHexColor({ red, green, blue }) {
    const getTwoCode = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    };

    return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}



/**
 * take a color object of three decimal values and return a rgb color code
 * @param {object} color
 * @returns {string}
 */

function generateRGBColor({ red, green, blue }) {
    return `rgb(${red}, ${green}, ${blue})`;
}



/**
 * convert hex color to decimal colors object
 * @param {string} hex
 * @returns {object}
 */

function hexToDecimalColors(hex) {
    const red = parseInt(hex.slice(0, 2), 16)
    const green = parseInt(hex.slice(2, 4), 16)
    const blue = parseInt(hex.slice(4), 16)

    return {
        red,
        green,
        blue,
    };
}



/**
 * validate hex color code
 * @param {string} color;
 * @returns {boolean}
 */

function isHexValid(color) {
    if (color.length !== 6) return false;

    return /^[0-9A-Fa-f]{6}$/i.test(color)
}