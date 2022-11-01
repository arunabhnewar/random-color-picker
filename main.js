// Global
// let div = mull;


// Onload handler
window.onload = () => {
    main()
}


// main or boot function, this function will take care of getting all the DOM references
function main() {

    // DOM Reference
    const randomGenerateColorBtn = document.getElementById("random-generate-color");
    const colorHexInput = document.getElementById("input-hex");
    const redColorRange = document.getElementById("color-range-red");
    const greenColorRange = document.getElementById("color-range-green");
    const blueColorRange = document.getElementById("color-range-blue");



    // Event listeners
    randomGenerateColorBtn.addEventListener('click', handleGenerateRandomColorBtn);

    colorHexInput.addEventListener('keyup', handleColorHexInput);

    redColorRange.addEventListener("change", handleColorRange(redColorRange, greenColorRange, blueColorRange));
    greenColorRange.addEventListener("change", handleColorRange(redColorRange, greenColorRange, blueColorRange));
    blueColorRange.addEventListener("change", handleColorRange(redColorRange, greenColorRange, blueColorRange));


    // copyBtn.addEventListener('click', function () {
    //     window.navigator.clipboard.writeText(`#${output.value}`);

    //     if (div !== null) {
    //         div.remove();
    //         div = null
    //     }

    //     // Step 11 - Prevent copying hex code if it is not valid
    //     if (isHexValid(output.value)) {
    //         toastMessage(`#${output.value} copied!!`)
    //     } else {
    //         alert('Invalid Color Code')
    //     }
    // });


    // copyBtn2.addEventListener('click', function () {
    //     window.navigator.clipboard.writeText(`${output2.value}`);

    //     if (div !== null) {
    //         div.remove();
    //         div = null
    //     }

    //     // Step 11 - Prevent copying hex code if it is not valid
    //     if (isHexValid(output2.value)) {
    //         toastMessage(`${output2.value} copied!!`)
    //     } else {
    //         alert('Invalid Color Code')
    //     }
    // });




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


// DOM Function
function toastMessage(msg) {
    div = document.createElement('div');
    div.innerText = msg;
    div.className = 'toast-message toast-message-slide-in';


    div.addEventListener('click', function () {
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');

        div.addEventListener('animationend', function () {

            div.remove();
            div = null;
        })
    })

    document.body.appendChild(div)
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