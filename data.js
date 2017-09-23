var reviews = document.getElementsByClassName("review");
var buttons = document.getElementsByClassName("button");
var buttonDiv = document.getElementById("buttons");

//generate a button for each review, make the first one selected
for (var review of reviews) {
    buttonDiv.innerHTML += "<div class=\"button\"></div>";
};
buttons[0].classList.add("selected");

//remove selection from originally selected button
function removeBtnSelection() {
    for (var j = 0; j < buttons.length; j++) {
        if (buttons[j].classList.contains("selected")) {
            buttons[j].classList.remove("selected");
            return j;
        } 
    };
};

function rightToCenterSmooth(index) {
    reviews[index].classList.add("smooth");
    reviews[index].classList.add("center");
};

function leftToCenterSmooth(index) {
    reviews[index].classList.remove("left");
    reviews[index].classList.add("smooth");
    reviews[index].classList.add("center");
};

function centerToLeftSmooth(index) {
    reviews[index].classList.remove("center");
    reviews[index].classList.add("smooth");
    reviews[index].classList.add("left");
};

function centerToRightSmooth(index) {
    reviews[index].classList.remove("center");
    reviews[index].classList.add("smooth");
};

function LeftToRightSwap(index) {
    reviews[index].classList.remove("left");
    reviews[index].classList.remove("smooth");

    setTimeout(function() {
        reviews[index].classList.add("smooth");
        reviews[index].classList.add("center");
    }, 0);
} 

function RightToLeftSwap(index) {
    reviews[index].classList.add("left");
    reviews[index].classList.remove("smooth");

    setTimeout(function() {
        reviews[index].classList.remove("left");
        reviews[index].classList.add("smooth");
        reviews[index].classList.add("center");
    }, 0);
} 

var timeoutID;

var createHandler = function(current) {
	return function() { 
        //stop automatic sliding
        clearInterval(interval);

        //select button[current]
        var previous = removeBtnSelection();
        buttons[current].classList.add("selected");

        //according to selected button, move corresponding review to focus 
        if(previous < current && reviews[current].classList.contains("left")) {
            centerToLeftSmooth(previous);
            LeftToRightSwap(current);
        } else if(previous < current){
            centerToLeftSmooth(previous);
            rightToCenterSmooth(current);
        }
        if(previous > current && (reviews[current].className === "review" || reviews[current].className === "review smooth")) {
            centerToRightSmooth(previous);
            RightToLeftSwap(current);
        } else if(previous > current){
            centerToRightSmooth(previous);
            leftToCenterSmooth(current);
        }

        clearTimeout(timeoutID);

        timeoutID = setTimeout(function(){
            for (var i=0; i < reviews.length; i++){
                if(i !== current){
                    reviews[i].classList.remove("left");
                    reviews[i].classList.remove("smooth");
                }
            }
            automaticSliding(current);
        }, 5000);
    }
};   

//MANUAL selection
for (var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", createHandler(i));
};

//AUTOMATIC sliding
var interval;
function automaticSliding(index){
    interval = setInterval(function(){

        if (index === reviews.length){
            for (var review of reviews){
                review.classList.remove("left");
            }
            index = 0;
        }

        reviews[index].classList.add("left");
        reviews[index].classList.remove("center");
        buttons[index].classList.remove("selected");
        
        if (index + 1 < reviews.length) {
            reviews[index + 1].classList.add("smooth");
            reviews[index + 1].classList.add("center");
            buttons[index + 1].classList.add("selected");
        } else {
            reviews[0].classList.add("smooth");
            reviews[0].classList.add("center");
            buttons[0].classList.add("selected");
        }
        
        if (index - 1 >= 0) {
            reviews[index - 1].classList.remove("left");
            reviews[index - 1].classList.remove("smooth");
        } else {
            reviews[reviews.length - 1].classList.remove("left");
            reviews[reviews.length - 1].classList.remove("smooth");
        }
        
        index++;

    }, 2000);
};

automaticSliding(0);