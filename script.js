let xHeader = document.querySelector ( "#xHeader" );
let oHeader = document.querySelector ( "#oHeader" );
let xScore = document.querySelector ( "#xScore" );
let oScore = document.querySelector ( "#oScore" );
let turnPara = document.querySelectorAll ( ".turnPara" );
let gameGrid = document.querySelector ( ".gameGrid" );
let GridLine1 = document.querySelector ( "#GridLine1" );
let GridLine2 = document.querySelector ( "#GridLine2" );
let GridLine3 = document.querySelector ( "#GridLine3" );
let GridLine4 = document.querySelector ( "#GridLine4" );
let winLines1 = document.querySelectorAll ( ".winLines1" );
let winLines2 = document.querySelectorAll ( ".winLines2" );
let isXTurn = true, whoWon = "";
let xWin = 0 , oWin = 0, totalMoveMade = 0;
let lastWinNum = -1;
let allCross = document.querySelectorAll ( ".cross" );
let allGolla = document.querySelectorAll ( ".golla" );
let gameEndBoxes = document.querySelectorAll ( ".gameEndBoxes" );
let restartBtn = document.querySelector ( "#restartBtn" );
let timeoutForXHeader, timeoutForStartPara, timeoutForShowWinLine;
let timeoutForGridLine1, timeoutForGridLine2, timeoutForGridLine3, timeoutForGridLine4;
let timeOutForGameGrid, timeOutForGameEndBox;
let arr = [[".", ".", "."], [".", ".", "."], [".", ".", "."]];
function classRemove ( ele , className ) {
    ele.classList.remove ( className );
}
function classAdd ( ele , className ) {
    ele.classList.add ( className );
}
function eleRemoveAdd ( ele, Remove, Add ) {
    classRemove ( ele , Remove );
    classAdd ( ele , Add );
}
function doesContain ( ele, thisClass ) {
    if ( ele.classList.contains ( thisClass ) ) return true;
    return false;
}
function arrFill(id){
    let rowNum = Math.floor(id/3), colNum = id%3;
    if ( isXTurn ) arr[rowNum][colNum] = "x";
    else arr[rowNum][colNum] = "o";
}
function makeArrNew(){
    for ( let i = 0 ; i < 3 ; i++ ) {
        for ( let j = 0 ; j < 3 ; j++ ) {
            arr[i][j] = ".";
        }
    }
}
function updateXScore(){
    if ( xWin == 0 ) xScore.innerText = "-";
    else xScore.innerText = xWin;
}
function updateOScore(){
    if ( oWin == 0 ) oScore.innerText = "-";
    else oScore.innerText = oWin;
}
function changeTurn(){
    isXTurn = isXTurn ^ false ^ true;
    if ( totalMoveMade % 2 === 1 ) {
        if ( totalMoveMade === 1 ) classRemove ( turnPara[0], "showWithOpacityOne");
        else classRemove ( turnPara[1], "showWithOpacityOne");
        classAdd ( turnPara[2], "showWithOpacityOne");
        eleRemoveAdd(xHeader, "showBottomBorder", "hideBottomBorder");
        eleRemoveAdd(oHeader, "hideBottomBorder", "showBottomBorder");
    }
    else {
        classRemove ( turnPara[2], "showWithOpacityOne");
        classAdd ( turnPara[1], "showWithOpacityOne");
        eleRemoveAdd(oHeader, "showBottomBorder", "hideBottomBorder");
        eleRemoveAdd(xHeader, "hideBottomBorder", "showBottomBorder");
    }
}
function winCheck(){
    for ( let i = 0 ; i < 3 ; i++ ) {
        let xCount = 0 , oCount = 0;
        for ( let j = 0 ; j < 3 ; j++ ) {
            if ( arr[i][j] === "." ) continue;
            if ( arr[i][j] === "x" ) xCount++ ;
            else oCount++ ;
        }
        if ( xCount === 3 || oCount === 3 ) {
            lastWinNum = 1 + i;
            return true;
        }
    }
    for ( let j = 0 ; j < 3 ; j++ ) {
        let xCount = 0 , oCount = 0;
        for ( let i = 0 ; i < 3 ; i++ ) {
            if ( arr[i][j] === "." ) continue;
            if ( arr[i][j] === "x" ) xCount++ ;
            else oCount++ ;
        }
        if ( xCount === 3 || oCount === 3 ) {
            lastWinNum = 4 + j;
            return true;
        }
    }
    if ( arr[1][1] !== "." && arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] ) {
        lastWinNum = 7;
        return true;
    }
    if ( arr[1][1] !== "." && arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0] ) {
        lastWinNum = 8;
        return true;
    }
    return false;
}
function showWinningLine(){
    if ( lastWinNum == -1 ) return;
    if ( lastWinNum <= 6 ) {
        classAdd ( winLines1[lastWinNum-1], "showWinLines" ); 
        if ( whoWon === "x" ) classAdd ( winLines1[lastWinNum-1], "showColorBlack" );
        else classAdd ( winLines1[lastWinNum-1], "showColorWhite" );
        return;
    }
    classAdd ( winLines2[lastWinNum-7], "showWinLines" );
    if ( whoWon === "x" ) classAdd ( winLines2[lastWinNum-7], "showColorBlack" );
    else classAdd ( winLines2[lastWinNum-7], "showColorWhite" );
}
function removeWinningLine(){
    if ( lastWinNum == -1 ) return;
    if ( lastWinNum <= 6 ) {
        classRemove ( winLines1[lastWinNum-1], "showWinLines" ); 
        if ( whoWon === "x" ) classRemove ( winLines1[lastWinNum-1], "showColorBlack" );
        else classRemove ( winLines1[lastWinNum-1], "showColorWhite" );
        return;
    }
    classRemove ( winLines2[lastWinNum-7], "showWinLines" );
    if ( whoWon === "x" ) classRemove ( winLines2[lastWinNum-7], "showColorBlack" );
    else classRemove ( winLines2[lastWinNum-7], "showColorWhite" );
}
function clearAllTimeOuts(){
    clearTimeout(timeOutForGameGrid); clearTimeout(timeOutForGameEndBox);
    clearTimeout(timeoutForShowWinLine);
    clearTimeout(timeoutForXHeader); clearTimeout(timeoutForStartPara);
    clearTimeout(timeoutForGridLine1); clearTimeout(timeoutForGridLine2);
    clearTimeout(timeoutForGridLine3); clearTimeout(timeoutForGridLine4);
}
function clearAllParaShowWithOpacity(){
    for ( let i = 0 ; i <= 3 ; i++ ) classRemove ( turnPara[i], "showWithOpacityOne" );
    for ( let i = 0 ; i <= 2 ; i++ ) classRemove ( gameEndBoxes[i], "showByScalingOne");
}
function newLoad(){
    if ( totalMoveMade === 0 ) {
        xWin = 0; oWin = 0;
    }
    removeWinningLine(); clearAllTimeOuts(); clearAllParaShowWithOpacity();
    classRemove ( gameGrid, "hideByScalingZero" );
    if ( doesContain(xHeader, "showBottomBorder") ) {
        eleRemoveAdd(xHeader, "showBottomBorder", "hideBottomBorder");
    }
    if ( doesContain(oHeader, "showBottomBorder") ) {
        eleRemoveAdd(oHeader, "showBottomBorder", "hideBottomBorder");
    }
    if ( doesContain(GridLine1, "afterWidth") ) {
        eleRemoveAdd(GridLine1, "afterWidth", "beforeWidth");
    }
    if ( doesContain(GridLine2, "afterWidth") ) {
        eleRemoveAdd(GridLine2, "afterWidth", "beforeWidth");
    }
    if ( doesContain(GridLine3, "afterHeight") ) {
        eleRemoveAdd(GridLine3, "afterHeight", "beforeHeight");
    }
    if ( doesContain(GridLine4, "afterHeight") ) {
        eleRemoveAdd(GridLine4, "afterHeight", "beforeHeight");
    } 
    isXTurn = true;
    lastWinNum = -1; whoWon = ""; totalMoveMade = 0;
    makeArrNew(); updateXScore(); updateOScore();
    timeoutForXHeader = setTimeout(()=>{
        eleRemoveAdd(xHeader, "hideBottomBorder", "showBottomBorder");
    },1400);
    timeoutForStartPara = setTimeout(()=>{
        turnPara[0].classList.add ( "showWithOpacityOne" );
    },1500);
    timeoutForGridLine1 = setTimeout(()=>{
        eleRemoveAdd(GridLine1, "beforeWidth", "afterWidth");
    },400);
    timeoutForGridLine2 = setTimeout(()=>{
        eleRemoveAdd(GridLine2, "beforeWidth", "afterWidth");
    },700);
    timeoutForGridLine3 = setTimeout(()=>{
        eleRemoveAdd(GridLine3, "beforeHeight", "afterHeight");
    },1000);
    timeoutForGridLine4 = setTimeout(()=>{
        eleRemoveAdd(GridLine4, "beforeHeight", "afterHeight");
    },1300);
    for ( let i = 0 ; i < allCross.length ; i++ ) {
        classRemove ( allCross[i], "showCross" );
        classRemove ( allGolla[i], "showGolla" );
    }
}
newLoad();
gameGrid.addEventListener ( "click" , (event)=>{
    if ( !doesContain(event.target, "gameCell") || whoWon !== "" ) return;
    let cross = event.target.querySelector ( ".cross" );
    let golla = event.target.querySelector ( ".golla" );
    if ( doesContain(cross, "showCross" ) ) return;
    if ( doesContain(golla, "showGolla" ) ) return;
    if ( isXTurn ) {
        classAdd( cross, "showCross");
    }
    else {
        classAdd( golla, "showGolla");
    }
    totalMoveMade++; arrFill(event.target.dataset.id);
    let gameEnd = false ;
    if ( winCheck() ) {
        if ( isXTurn ) {
            xWin++; whoWon = "x";
        }
        else {
            oWin++; whoWon = "o";
        }
        gameEnd = true;
    }
    else if ( totalMoveMade === 9 ) {
        gameEnd = true;
    }
    if ( !gameEnd ) changeTurn();
    else {
        timeoutForShowWinLine = setTimeout(()=>{
            showWinningLine(); updateXScore(); updateOScore();
            if ( whoWon === "o"  ) {
                eleRemoveAdd(oHeader, "showBottomBorder", "hideBottomBorder");
                classRemove ( turnPara[2], "showWithOpacityOne" );
            }
            else {
                eleRemoveAdd(xHeader, "showBottomBorder", "hideBottomBorder");
                classRemove ( turnPara[1], "showWithOpacityOne" );
            }
            classAdd ( turnPara[3], "showWithOpacityOne" );
        },700)
        timeOutForGameGrid = setTimeout(()=>{
            classAdd ( gameGrid, "hideByScalingZero" );
        },1300)
        timeOutForGameEndBox = setTimeout(()=>{
            if ( whoWon === "x" ) { // X is the Winner !!!
                classAdd ( gameEndBoxes[0], "showByScalingOne" );
            }
            else if ( whoWon === "o" ) { // O is the Winner !!!
                classAdd ( gameEndBoxes[1], "showByScalingOne" );
            }
            else { // DRAW !!!
                classAdd ( gameEndBoxes[2], "showByScalingOne" );
            }
        },1800)
    }
})
restartBtn.addEventListener ( "click" , ()=>{
    newLoad();
})