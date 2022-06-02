const gridContainer = document.querySelector(".grid-container");
const clearBtn = document.querySelector("button#clear");
const refreshBtn = document.querySelector("button#refresh");
let xAxis = document.querySelector("#x-axis").value;
let yAxis = document.querySelector("#y-axis").value;

let grid = { 
    dimensions : {x : xAxis, y : yAxis},
    cellSize : {x : 20, y : 20} /*px*/
};


function createGrid(){
    xAxis = document.querySelector("#x-axis").value;
    yAxis = document.querySelector("#y-axis").value;
    grid.dimensions.x = xAxis;
    grid.dimensions.y = yAxis;


    gridContainer.style.cssText = `
                                width: ${grid.cellSize.x * grid.dimensions.x}px;
                                height: ${grid.cellSize.y * grid.dimensions.y}px;
                                grid-template-columns: repeat(${grid.dimensions.x}, auto);
                                grid-template-rows: repeat(${grid.dimensions.x}, auto);
                            `;
    for(let x=0; x<grid.dimensions.x; x++){
        for(let y=0; y<grid.dimensions.y; y++){
            const newCell = document.createElement("div");
            newCell.style.cssText = `width: ${grid.cellSize.x}px; height: ${grid.cellSize.y}px;`;
            newCell.setAttribute("draggable", "false");
            gridContainer.appendChild(newCell);
        }
    }
}

function fillCell(e){
    if(e.target == e.currentTarget) {return;}
    console.log(e.type);
    e.target.style.cssText += `background-color: rgba(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256}, ${Math.random()});`
}

function clear(e){
    Array.from(gridContainer.children).forEach(e=>{
        e.style.backgroundColor = "transparent";
    });
}

function refresh(e){
    Array.from(gridContainer.children).forEach(e=>{e.remove();});
    createGrid();
}

createGrid();

document.body.addEventListener("mouseup", ()=>{gridContainer.removeEventListener("mouseover", fillCell);});
document.body.addEventListener("mousedown", ()=>{gridContainer.addEventListener("mouseover", fillCell);});
clearBtn.addEventListener("click", clear);
refreshBtn.addEventListener("click", refresh);