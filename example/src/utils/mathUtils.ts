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

export const calculateEbob: (a: number, b: number) => number = (a, b) => {
   let commonNumber = [];

   switch (b) {
      case 0:
      case -1:
      case 1:
         return 1;
   }

   switch (a) {
      case 0:
      case -1:
      case 1:
         return 1;
      default:
         let number1 = Math.abs(a);
         let number2 = Math.abs(b);
         let i = 2
         for (; i < number1 + 1; i++) {
            if (number2 % i === 0 && number1 % i === 0) {
               commonNumber.push(i);
               number1 /= i;
               number2 /= i;
               i = 2;
            }

         }
      
         return multiplicationOfArray(commonNumber)
   }
}