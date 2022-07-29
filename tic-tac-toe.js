let circle;

function draw(turn){
    let resalt;
    let OandX = ["O","X"];
    return resalt = (turn === circle? OandX[0]:OandX[1]);
}

function handleClick(e){
    const cell = e.target;
    const turn = !circle? circle:!circle;
    const currentTurn = draw(turn)
    const winDiv = document.getElementById("winner");
    placeMark(cell,currentTurn);
    console.log(isDraw(cell));
    circle = !circle;
    if(isDraw(cell) || checkWinner(cell,currentTurn)) {
        if(isDraw(cell)) winDiv.children[0].innerHTML = `Draw !!!`;
        if(checkWinner(cell,currentTurn)) winDiv.children[0].innerHTML = `${currentTurn} win !!!`;
        winDiv.style.display = "flex";
        winDiv.addEventListener("click",()=> window.location.reload());
    }
}

function placeMark(cell,resalt){
    cell.innerHTML = resalt;
}

function checkWinner(cell,currentTurn){
    const combination =[];
    const wrapCells = cell.parentNode.children;
    for(let i = 0; i < 9; i++){
        if(wrapCells[i].innerHTML === currentTurn){
            let found = wrapCells[i].dataset.item;
            combination.push(found);
        }
    }
    return combiCheck(combination);
}
function combiCheck(arr) {
    const array = arr;
    //check diagonal
    if((array.includes("1")&&array.includes("5")&&array.includes("9"))
       ||(array.includes("3")&&array.includes("5")&&array.includes("7"))) return true;
    //check row
    if((array.includes("1")&&array.includes("2")&&array.includes("3"))
    ||(array.includes("4")&&array.includes("5")&&array.includes("6"))
    ||(array.includes("7")&&array.includes("8")&&array.includes("9"))) return true;
    //check column
    if((array.includes("1")&&array.includes("4")&&array.includes("7"))
    ||(array.includes("2")&&array.includes("5")&&array.includes("8"))
    ||(array.includes("3")&&array.includes("6")&&array.includes("9"))) return true;
    //none
    return false;
};
function isDraw(cell){
    return [...cell.parentNode.children].every(cell =>{
        return cell.innerHTML !="";
    });
}

const blockElement = document.querySelectorAll(".block");
//main event listener
const main=(()=>{
    const wrapDiv = document.getElementById("wrap");
    for(let i = 0; i < wrapDiv.childElementCount; i++){
        var id = wrapDiv.children[i].getAttribute("id");
        wrapDiv.children[i].style = "grid-area : "+id;
        wrapDiv.children[i].addEventListener("click",handleClick,{ once:true});
    };
})();