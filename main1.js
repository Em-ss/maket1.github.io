class View {
constructor() {

this.app = document.getElementById('app');

// this.title = this.createElement('h1','title');
// this.title.textContent = 'Github Search Rep';

this.searchLine = this.createElement('div','search-line');
this.searchInput = this.createElement('input','search-input');
this.searchCounter = this.createElement('span','counter');
this.searchLine.append(this.searchInput);
this.searchLine.append(this.searchCounter);



this.repsWrapper = this.createElement('div','rep-wrapper');
this.repsList = this.createElement('ul','reps');
this.repsList2 = this.createElement('ul','reps2');
this.repsWrapper.append(this.repsList);
this.repsWrapper.append(this.repsList2);

this.main = this.createElement('div','main');
this.main.append(this.repsWrapper);

// this.app.append(this.title);
this.app.append(this.searchLine);
this.app.append(this.main);
}


createElement(elementTag,elementClass) {


const element = document.createElement(elementTag);
if (elementClass) {
    element.classList.add(elementClass);
}
return element;
}

creatRep(repData) {
    const repElement = this.createElement('li','rep-prev');
    repElement.addEventListener('click',this.swowUserData(repData.name));
   repElement.innerHTML = `<span class='rep-prev-span'>${repData.name}</span>`;
//    <span class='rep-prev'>${repData.stargazers_count}</span><br>
//    <span class='rep-prev'>${repData.owner['login']}</span>`;
    this.repsList.append(repElement);
    repElement.addEventListener('click',() => {
        const repElement2 = this.createElement('li','rep-prev2');
        // const a = this.createElement('a','a');
        // const close = this.createElement('span','close');


        // repElement2.addEventListener('click',this.swowUserData(repData.login));
       repElement2.innerHTML = `<span class='rep-prev-span'>name:${repData['name']}</span><br>
       <span class='rep-prev-span'>owner:${repData['owner']['login']}</span><br>
       <span class='rep-prev-span'>starts:${repData['stargazers_count']}</span><br>
       <a href="#"><span class="close"></span></a></div>`;
       
      
    // this.repElement2.append(a);
       this.repsList2.append(repElement2);
    //    this.a.append(close);
    repElement2.addEventListener('click',(e) => {
        const close = document.querySelectorAll('.close');
        close.forEach(item => {
        if(e.target == item) {
        repElement2.remove();
        }
    })
       });
    const close = querySelectorAll('.close');

   
       
          
    
      
    });

}
// async searchReps2() {
//     console.log(view.searchInput.value);
    
   
//     return await fetch(`https://api.github.com/search/repositories?q=${searchVlue}&per_page=5`).then((res => {
//         if (res.ok) {
//             res.json().then(res => {
//                 res.items.forEach(rep => this.view.creatRep2(rep));
//             })
//         }
//     }));
   
//     }








// creatRep2(repData) {
// console.log(3);
//     const repElement = this.createElement('li','rep-prev2');
//     // repElement.addEventListener('click',this.swowUserData(repData.name));
//    repElement.innerHTML = `<span class='rep-prev'>${repData.name}</span><br>`;
// //    <span class='rep-prev'>${repData.stargazers_count}</span><br>
// //    <span class='rep-prev'>${repData.owner['login']}</span>`;
// this.repsList.append(repElement);
//     this.repsWrapper.append(repElement);
// }






swowUserData(name) {
    // const reps;
this.loadRepsData(name);
}
async loadRepsData(){
    return await fetch(`https://api.github.com/search/repositories?q=${searchVlue}&per_page=5`).then(res => {res});
}

}

class Search {
constructor(view) {
this.view = view;

this.view.searchInput.addEventListener('keyup',this.debounce(this.searchReps.bind(this),500));


}

async searchReps() {
const searchVlue = this.view.searchInput.value;
if (searchVlue) {
return await fetch(`https://api.github.com/search/repositories?q=${searchVlue}&per_page=5`).then((res => {
    if (res.ok) {
        res.json().then(res => {
            res.items.forEach(rep => this.view.creatRep(rep));
        })
    }
}));
} else this.clearReps();
}

clearReps() {
    this.view.repsList.innerHTML = '';
}

debounce(fn, debounceTime) {
    let timeout;
     return function wrapper () {
 
 let func = () => fn.apply(this,arguments);
 clearTimeout(timeout);
 timeout = setTimeout(func,debounceTime);
     }
 };


}





new Search(new View());