
/**
* Returns a random color.
* @returns {string}
*/
const generateColor = function (dark: boolean = true): string {
    const minimum = dark ? 0 : 100;
    const maximum = dark ? 128 : 255;

    return `rgb(${generateNumber(minimum, maximum)},${generateNumber(
        minimum,
        maximum
    )},${generateNumber(minimum, maximum)})`;
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

/**
 * Formats the number.
 * @param {number} num 
 * @param {number} digits 
 * @returns {string}
 */
const nFormatter = function (num:number, digits:number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

export {
    generateColor,
    generateNumber,
    findClosestNumber,
    nFormatter
}