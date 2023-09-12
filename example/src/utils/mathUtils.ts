/**
 * @description If you want to sum your number array, you can pass an array as a parameter
 * @param data 
 * @returns 
 */
export const sumOfArray:(data:number[])=>number=(data)=>{
   return data.reduce((a,b)=>a+b,0);
}