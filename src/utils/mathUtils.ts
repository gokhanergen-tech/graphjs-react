import { findClosestNumber } from "../utils";

/**
 * @description If you want to sum your number array, you can pass an array as a parameter
 * @param data 
 * @returns 
 */
export const sumOfArray: (data: number[]) => number = (data) => {
  return data.reduce((a, b) => a + b, 0);
}

export const multiplicationOfArray: (data: number[]) => number = (data) => {
  return data.reduce((a, b) => a * b, 1);
}

export const sigmoid = (value: number) => 1 / (1 + Math.E ** (-(value)))

export function nFormatter(num: number, digits: number) {
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
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function calculateMaxMinAndRange(allValues: number[], spacingCount: number, range: null | number = null) {
  const maxValueInItems = Math.max(...allValues)
  const minValueInItems = Math.min(...allValues)

  let RANGE = Math.ceil(
    (Math.abs(maxValueInItems) + Math.abs(minValueInItems)) / (spacingCount - 1)
  )
  RANGE = RANGE < 0 ? -RANGE : RANGE

  if (range) {
    RANGE = range > 10 ? range : 10
  }

  let minValue = findClosestNumber(minValueInItems, RANGE)
  minValue = minValue < 0 ? minValue : 0
  let maxValue = findClosestNumber(maxValueInItems, RANGE)
  maxValue = maxValue < 0 ? 0 : maxValue
  const temporaryMinValue = minValue < 0 ? -minValue : 0
  maxValue = temporaryMinValue > maxValue ? temporaryMinValue : maxValue

  return [RANGE,minValue,maxValue]
}

