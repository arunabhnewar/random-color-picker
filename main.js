// Global
let div = mull;


// Onload handler
window.onload = () => {
    main()
}


// main or boot function, this function will take care of getting all the DOM references
function main() {


}



// Event handlers




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

function hexToRgb(hex) {
    const red = parseInt(hex.slice(0, 2), 16)
    const green = parseInt(hex.slice(2, 4), 16)
    const blue = parseInt(hex.slice(4), 16)

    return `rgb(${red}, ${green}, ${blue})`;
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