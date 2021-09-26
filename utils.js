let createEl = (para) =>document.createElement(para);
let $ = (para, child=document) => child.querySelector(para);

let dateConvert = (x)=>{
    let time = new Date(x);
     
    return  time.getDate() + '.' + time.getMonth() + 1 + '.' + time.getFullYear(); 
}