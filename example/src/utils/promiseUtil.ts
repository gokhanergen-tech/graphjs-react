/**
 * @description When you write code and want you to wait code time, this is very use full. you may make any animation. 
 * @param time 
 * @returns 
 */
export const sleep=(time:number)=>new Promise((resolve,reject)=>{
    try{
        setTimeout(()=>resolve(1),time)
    }catch(err){
        reject(new Error());
    }
   
})