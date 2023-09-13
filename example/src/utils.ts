
/**
* Returns a random color.
* @returns {string}
*/
const generateColor = function (): string {
    return `rgb(${generateNumber(0, 255)},${generateNumber(
        0,
        255
    )},${generateNumber(0, 255)})`;
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns
 */
const generateNumber = function (min: number, max: number): number {
    if (max < min) {
        throw new Error("Max number is greater than mi number or equal with it ");
    }
    return Math.round(min + Math.random() * (max - min));
}

/**
 * Find the closest number.
 * @param {number} number
 * @returns {number}
 */
const findClosestNumber = function (number: number, range: number = 10): number {
    if (number % range === 0)
        return number;

    const remainingNumber = number % range;
    return number > 0 ? number - remainingNumber + range : number - remainingNumber - range;
}

export {
    generateColor,
    generateNumber,
    findClosestNumber
}