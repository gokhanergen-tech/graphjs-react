export const sleep=(time:number)=>new Promise((resolve,reject)=>{
    try{
        setTimeout(()=>resolve(1),time)
    }catch(err){
        reject(new Error());
    }
   
})