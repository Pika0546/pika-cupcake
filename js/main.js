

window.onresize = function(){
    if(window.innerWidth > 767){
        document.querySelector(".navigation").style.display = "flex";
    }else{
        document.querySelector(".navigation").style.display = "none";
    }
}

const changeSection = id =>{
    $(".section").fadeOut(500);
    $("#" + id).fadeIn(500);
    if(id !== "workshop-page" && id !== "book-workshop" && id !== "workshop-form"){
        let myBtns = document.getElementsByClassName('nav-btn');
        for(let i=0; i<myBtns.length; i++){
            myBtns[i].classList.remove("active");
        }
        document.getElementById(id + "-btn").classList.add("active");
    }
    if(window.innerWidth <= 767){
        document.querySelector(".close-nav").click();
    }
}

changeSection("order-online");

document.querySelector(".close-nav").addEventListener("click", function(){
    document.querySelector(".navigation").style.display = "none";
})

document.querySelector(".open-nav").addEventListener("click", function(){
    document.querySelector(".navigation").style.display = "flex";
})

const resetCupcakeCard = () =>{
    $(".cupcake-card-container .quantity .right span").text("1");
    $(".cupcake-card-container .special-request .card-textarea").val("");
    document.querySelector(".is-shown-card .show-card-request").style.display = "block";
    document.querySelector(".is-shown-card .card-request").style.display="none";    
}

const closeCupcakeCard = () =>{
    resetCupcakeCard();
    $(".cupcake-card-container").removeClass("is-shown-card");
    $(".cupcake-card-container").fadeOut(0);
    
}

const openCupCakeCard = (id, number = 0, request = "") =>{
    $("#" + id).addClass("is-shown-card");
    if(number !== 0){
        $("#" + id + " .quantity .right span").text(number);
       
        $("#" + id + " .special-request .content .card-textarea").val(request);
        if(request !== ""){
            $("#" + id + " .special-request .content .show-card-request").trigger("click");
        }
    }
    $("#" + id).fadeIn(200);
}

let orderItems = document.getElementsByClassName("menu-grid__item");
for(let i=0; i<orderItems.length; i++){
    orderItems[i].addEventListener("click", function(){
        
        openCupCakeCard(this.classList[1], 0, "");
    })
}

function calculateCost(){
    let sum = 0;
    let sumNumber = 0;
    let numbers = $("#ordered-list li .name p span")
    let moneys = document.getElementsByClassName("total-cupcake-cost");
    for(let i=0; i<moneys.length; i++){
        sumNumber += Number($(numbers[i]).text().replace("x", ""));
        sum += Number(moneys[i].innerHTML.slice(1));

    }

    if(sumNumber == 1){
        $("#item-number").text("(" + sumNumber + " item)")
    }else{
        $("#item-number").text("(" + sumNumber + " items)")
    }
    $("#subtotal").text("$" + sum);
}

function changeCupCakeAmount(n, element){
    let number = $(element).children(".name").children("p").children("span").text();
    let price = $(element).children(".price").children(".total-cupcake-cost").text();

    number = Number(number.replace("x", ""));
    price = Number(price.slice(1))/number;

    number += n;

    if(number == 1){
        $(element).children(".button").children(".decrease-amount").text("x")
    }else if(number == 0){
        $(element).remove();
        countItem -= 1;
        calculateCost();
        if($("#ordered-list li").length === 0){
            $(".my-cupcake").hide(0);
            $(".empty-shopping").show(0);
        }
        return;
    }else{
        $(element).children(".button").children(".decrease-amount").text(" - ");
    }
    $(element).children(".name").children("p").children("span").text(number + "x");
    $(element).children(".price").children(".total-cupcake-cost").text("$" + (price*number));
    calculateCost();
}

var countItem = 0;
const addItemToList =()=>{
    $(".empty-shopping").hide(0);
    let id = $(".is-shown-card").attr("id");
    let name = $(".is-shown-card .cupcake-card__info h2").text();
    let number = $(".is-shown-card .quantity .right span").text();
    let price = $(".is-shown-card .cupcake-card__info p span").text().substring(1);
    let request = $(".is-shown-card .special-request .content .card-textarea").val();
    number = Number(number);
    price = Number(price);
    
    //Tạo mới
    if(($(".is-ordered").length == 0)){
        let li = document.createElement("li");

        li.className = id;
        if(number > 1){
            li.innerHTML = '<div class="name"><p><span>' + number +'x </span>' + name +' </p><p class = "guest-request">'+request+'</p></div><div class="price"><p class="total-cupcake-cost">$' + price*number + '</p></div><div class="button"><button class="increase-amount"> + </button><button class="decrease-amount"> - </button></div>';
        }else{
            li.innerHTML = '<div class="name"><p><span>' + number +'x </span>' + name +' </p><p class = "guest-request">'+request+'</p></div><div class="price"><p class="total-cupcake-cost">$' + price*number + '</p></div><div class="button"><button class="increase-amount"> + </button><button class="decrease-amount"> &times; </button></div>';
        }
        
        li.addEventListener("click",function(){
            $(this).addClass("is-ordered");
            let n = $(".is-ordered .name p span").text().replace("x", "");
            let r = $(".is-ordered .name .guest-request").text();
            n = Number(n);
            
            openCupCakeCard(this.classList[0], n, r);
        })
        

        $("#ordered-list").append(li);
        let listBtnsAdd = document.getElementsByClassName("increase-amount");
        listBtnsAdd[countItem].addEventListener("click", function(e){
            e.stopPropagation();
            changeCupCakeAmount(1, this.parentNode.parentNode);
        })
       
        let listBtnsSub = document.getElementsByClassName("decrease-amount");
        listBtnsSub[countItem].addEventListener("click", function(e){
            e.stopPropagation();
            changeCupCakeAmount(-1, this.parentNode.parentNode);
        })
      
        countItem += 1;
    }else{
        $("#ordered-list li" + ".is-ordered" + " .name p span").text(number + "x ");
        $("#ordered-list li" + ".is-ordered" + " .price p").text("$" + number*price);
        $("#ordered-list li" + ".is-ordered" + " .name .guest-request").text(request);
        if(number <= 1){
            $("#ordered-list li" + ".is-ordered" + " .button .decrease-amount").text("x");
        }else{
            $("#ordered-list li" + ".is-ordered" + " .button .decrease-amount").text("-");
        }
    }
    calculateCost();
    $(".my-cupcake").fadeIn(0);
    $(".is-ordered").removeClass("is-ordered");
    closeCupcakeCard();
}

document.getElementById("show-big-request").addEventListener("click", function(){
    document.getElementsByClassName("special-request-form")[0].style.display = "block";
    this.style.display = "none";
    document.getElementById("big-request").focus();
})

document.getElementById("big-request").addEventListener("blur", function(){
    
    if(this.value == ""){
       
        document.getElementsByClassName("special-request-form")[0].style.display = "none";
        document.querySelector(".special-request h4").style.display = "block";
    }
})


let cardRequestBtns = document.getElementsByClassName("show-card-request");
for (let i = 0; i < cardRequestBtns.length; i++){
    cardRequestBtns[i].addEventListener("click", function(){
        document.getElementsByClassName("card-request")[i].style.display = "block";
        document.getElementsByClassName('card-textarea')[i].focus();
        this.style.display = "none";
    });
    document.getElementsByClassName("card-textarea")[i].addEventListener("blur", function(){
        if(this.value == ""){
            document.getElementsByClassName("card-request")[i].style.display = "none";
            cardRequestBtns[i].style.display = "block";

        }
    })
}


$(document).ready(function(){
    $('.cupcake-card-container').hide(0);
    $("#order-menu-types").click(function(){
       
        $("#menu-type-list").slideToggle(200);
        $("#show-menu-list-icon").toggleClass("rotate180");
    })
    $(".remove-item").click(function () {
        let number = Number($(".is-shown-card .quantity .right span").text());
        if(number > 1){
            number -= 1;
        }
        $(".is-shown-card .quantity .right span").text(number);
    })

    $(".add-item").click(function () {
        let number = Number($(".is-shown-card .quantity .right span").text());
        number += 1;
        $(".is-shown-card .quantity .right span").text(number);
    })

  
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            200:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    })
    
    
})