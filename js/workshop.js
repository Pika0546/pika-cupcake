workshops = [
    { 
        name: "cupcake master",
        time: "3hr",
        price: 115,
        weekdays: ["Mon", "Wed"]
    },
    { 
        name: "baking",
        time: "2hr 30min",
        price: 65,
        weekdays: ["Tue", "Thu"]
    },
    { 
        name: "frosting",
        time: "2hr",
        price: 85,
        weekdays: ["Fri", "Sun"]
    }
];

guestWorkShop = {
    name: "",
    time: "",
    price: 0,
    date: ""
};

let currWorkshop = 0;


const address = "500 Terry Francois Street, San Francisco, CA, USA";


var months = [31,28,31,30,31,30,31,31,30,31,30,31];
var monthsName = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var now = new Date();
var today = now.getDate();
var today_month = now.getMonth() + 1;
var today_year = now.getFullYear();
var today_day = now.getDay();
var display_month = today_month - 1;
var display_year = today_year;
var displayWeek = 0;
var myCalendar = [];
var weekOnScreen = [];
const miliInDay = 1000*3600*24;

let workshopsBtn = document.getElementsByClassName("workshop__left");
let workshopsDetail= document.getElementsByClassName("workshop-detail");

for(let i = 0; i < workshopsBtn.length; i++){
    workshopsBtn[i].addEventListener("click", function(){
        changeSection("workshop-page")
     
        workshopsDetail[i].style.display = "block";
        
    })
}


document.getElementById("back-workshops--1").addEventListener("click", function(){
    for(let i = 0; i <  workshopsDetail.length; i++){
        workshopsDetail[i].style.display = "none";
    }
    changeSection("workshops");
})

document.getElementById("back-workshops--2").addEventListener("click", function(){
    changeSection("workshops");
})

document.getElementById("back-workshops--3").addEventListener("click", function(){
    changeSection("book-workshop");
})


//  window.onscroll = function(){
//     let slideBlock = document.getElementById("slide-up-down");
//     var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  
//     if(winScroll > 490 && slideBlock.offsetTop < 100){
//         slideBlock.style.top = winScroll - 490 + "px";
//     }

      
// }


const changeWorkShop = index =>{
    let displayWeekDay = document.getElementsByClassName("the-dow");
    $("#result__time").html("");
    document.querySelector(".result__name").innerHTML = workshops[index].name;
    document.querySelector(".result__time-price").innerHTML = workshops[index].time + " <span>|</span> $" + workshops[index].price;
    for(let i = 0; i < displayWeekDay.length; i++){
        if(displayWeekDay[i].innerHTML.trim() == workshops[index].weekdays[0] + "." ||
        displayWeekDay[i].innerHTML.trim() == workshops[index].weekdays[1] + "."){
            document.getElementsByClassName("the-time")[i].innerHTML = "10.00 am";
            $($(".display-week__day")[i]).addClass("is-available");
            $($(".display-week__day")[i]).off("click").on("click", function(){
                let d = weekOnScreen[i].getDate();
              
                let m = weekOnScreen[i].getMonth();
                let y = weekOnScreen[i].getFullYear();
                document.querySelector(".empty-booking").style.display = "none";
                $("#result__time").html("<span>"+monthsName[m] + " "+ d +", "+ y + " 10:00am </span>");

            })
        }else{
            document.getElementsByClassName("the-time")[i].innerHTML = "";
            $($(".display-week__day")[i]).removeClass("is-available");
            $($(".display-week__day")[i]).off("click")
        }
       
    }
}

let bookWorkshopsBtn = document.getElementsByClassName("book-work-shop");
for(let i = 0; i < bookWorkshopsBtn.length; i++){
    bookWorkshopsBtn[i].addEventListener("click", function(){
        changeSection("book-workshop");
        for(let i = 0; i <  workshopsDetail.length; i++){
            workshopsDetail[i].style.display = "none";
        }
        displayMonth(display_month, display_year);
        for(let j = 0; j < 35 ; j++){
            if(myCalendar[j].getDate() == today){
                displayWeek = j;
                returnWeek(j);
                break;
            }
        }
        showWeekOnScreen();
        changeInputWeek();
        if(i < 3){
            currWorkshop = i;
            changeWorkShop(i);
        }
        else if(i < 5){
            changeWorkShop(0);
            currWorkshop = 0;
        }
        else if(i < 7){
            changeWorkShop(1);
            currWorkshop = 1;
        }else {
            changeWorkShop(2);
            currWorkshop = 2;
        }
        
    })
    
}

document.querySelector(".input-week").addEventListener("click", function(event){
    event.stopPropagation();
    $(".month-calendar").toggle();
    displayMonth(display_month, display_year);
    $(".input-week").toggleClass("is-choosing");
})

document.querySelector(".month-calendar").addEventListener("click", function(event){
    event.stopPropagation();
})

document.addEventListener("click", function(){
    $(".month-calendar").hide();   
     $(".input-week").removeClass("is-choosing");
})

/*=================calendar==============*/
function isLeap(y)
{
    if((y%4 == 0 && y%100 != 0)|| y%400==0)
        return true;
    return false;
}

const displayMonth = (m, y) =>{
    if(isLeap(y))
        months[1] = 29;
    else
        months[1] = 28;
    var d = new Date();
    d.setFullYear(y,m,1);
    var dow = d.getDay(); //1
    var last_month = (m-1) >= 0 ? m-1:11;
    var begin = months[last_month] - (dow - 1);
    var list = $(".calendar__cell");
    var dem = begin - 1;
    var present = -1;

    $(".month-calendar .head h4").text(monthsName[m] + " " + y);
    for(var i = 0; i < 35; i++)
    {
        dem = dem + 1;
        if(dem > months[last_month] && present == -1)
        {
            dem = 1;
            present = 0;
        }
        else if(dem > months[m] && present == 0)
        {
            dem = 1;
            present = 1;
           
        }
        if(dem === today && m+1 === today_month && today_year===y)
        {
            $(list[i]).addClass("is-today");
        }else{
            $(list[i]).removeClass("is-today");
        }
        var temp;
        if(present < 0){
            if(last_month == 11){
                temp = new Date(y-1, last_month, dem)
            }else{
                temp = new Date(y, last_month, dem)
            }
        }
        else if (present == 0){
            temp = new Date(y,m, dem);
        }else{
            if(m == 11){
                temp = new Date(y+1,0,dem)
            }else{
                temp = new Date(y,m + 1,dem);
            }
        }
        var temp2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if(temp.getTime() >= temp2.getTime()){
           $(list[i]).addClass("is-available")
           
        }else{
            $(list[i]).removeClass("is-available")  
        }
        myCalendar[i] = temp;
        
        list[i].innerHTML = dem;
    }
    for(let i = 0; i < 35; i++){
        if($(list[i]).attr("class").indexOf("is-available") != -1){
            $(list[i]).off("click").on("click", function(){
                displayWeek = i;
                returnWeek(displayWeek);
                showWeekOnScreen();
                changeInputWeek();
            })
        }else{
            $(list[i]).off("click");
        }
    }
}

document.querySelector("#prev-month").addEventListener("click",decreaseMonth);
document.querySelector("#next-month").addEventListener("click",increaseMonth);

function decreaseMonth()
{
    if(display_month > 0)
        display_month--;
    else
    {
        display_month =11;
        display_year--;
    }
    displayMonth(display_month,display_year);
}
function increaseMonth() {
    if(display_month < 11)
        display_month++;
    else
    {
        display_month = 0;
        display_year++;
    }
    displayMonth(display_month,display_year);
}

function returnWeek(index){
    let j = 0;
    for(let i = Math.floor(index/7) * 7 ; i < (Math.floor(index/7) + 1) * 7 ;i++){
        weekOnScreen[j] = myCalendar[i];
        j++;
    }
}

function changeInputWeek(){
    let result = "";
    let d1 = weekOnScreen[0].getDate();
    let m1 = weekOnScreen[0].getMonth();
    let y1 = weekOnScreen[0].getFullYear();
    let d2 = weekOnScreen[6].getDate();
    let m2 = weekOnScreen[6].getMonth();
    let y2 = weekOnScreen[6].getFullYear();

    if(m1 == m2 && y1 == y2){
        result += monthsName[m1].substr(0,3) + ". " + d1 + " - " +d2 + ", " + y1;
    }
    else if(m1 < m2){
       
            result += monthsName[m1].substr(0,3) + ". " + d1 + " - " + monthsName[m2].substr(0,3) + ". " + d2 + ", " + y1;
       
    } else{
        result += monthsName[m1].substr(0,3) + ". " + d1 + ", " + y1 + " - " + monthsName[m2].substr(0,3) + ". " + d2 + ", " + y2;
    }
    $("#value-week").text(result);
}

function nextWeek(){

    displayWeek += 7;

    if(displayWeek >= 35){
        let t = displayWeek - 7;
        let d1 = myCalendar[t].getDate();
        increaseMonth();
        displayWeek = displayWeek%35;
        let d2 = myCalendar[displayWeek].getDate();
        if(d1 == d2){
            nextWeek();
        }
    }
    returnWeek(displayWeek);
    changeInputWeek();
    showWeekOnScreen();
}

function prevWeek(){

    displayWeek -= 7;

    if(displayWeek < 0){
        let t = displayWeek + 7;
        let d1 = myCalendar[t].getDate();
        decreaseMonth();
        displayWeek = displayWeek + 35;
        let d2 = myCalendar[displayWeek].getDate();
        if(d1 == d2){
            prevWeek();
        }
    }
    returnWeek(displayWeek);
    changeInputWeek();
    showWeekOnScreen();
}

document.getElementById("prev-week").addEventListener("click", function(){
    prevWeek();
})

document.getElementById("next-week").addEventListener("click", function(){
    nextWeek();
})

function showWeekOnScreen(){
    for(let i = 0 ; i < 7 ; i ++){
        document.getElementsByClassName("the-date")[i].innerHTML = weekOnScreen[i].getDate();
        if(weekOnScreen[i].getDate() == today){
            $($(".display-week__day")[i]).addClass("is-today");

        }else{
            $($(".display-week__day")[i]).removeClass("is-today");
        }
    }
}

document.getElementById("today").addEventListener("click", function(){
    display_month = today_month-1;

    display_year = today_year;
 

    displayMonth(display_month, display_year);
    for(let j = 0; j < 35 ; j++){
        if(myCalendar[j].getDate() == today){
            displayWeek = j;
            returnWeek(j);
            break;
        }
    }
    showWeekOnScreen();
    changeInputWeek();
})





let nextStepBtn = document.querySelector(".booking-next-step");
nextStepBtn.addEventListener("click", function(){
  
    if(document.getElementById("result__time").innerHTML == ""){
        document.querySelector(".empty-booking").style.display = "block";
    }
    else{
        document.querySelector(".empty-booking").style.display = "none";
        guestWorkShop.name = workshops[currWorkshop].name;
        guestWorkShop.time = workshops[currWorkshop].time;
        guestWorkShop.price = workshops[currWorkshop].price;
        guestWorkShop.date = $("#result__time span").text();
        document.querySelector(".guest-work-shop__name").innerHTML = guestWorkShop.name;
        document.querySelector(".guest-work-shop__time-price").innerHTML = guestWorkShop.time + "<span>|</span>" + guestWorkShop.price;
        document.querySelector(".guest-work-shop__detail").innerHTML = "<span>" + guestWorkShop.date + address+"</span>";

        changeSection("workshop-form");
    }
})