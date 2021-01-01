var slideIndex = 0;

const plusSlide = (n) =>{
    slideIndex += n;
    showSlide(slideIndex);
}

const showSlide = n =>{
    let mySlide = document.getElementsByClassName("slide");
    if(n >= mySlide.length ){
        slideIndex = 0;
    }
    if(n < 0){
        slideIndex = mySlide.length - 1;
    }
    for(let i = 0; i < mySlide.length; i++){
        mySlide[i].style.left = -33.333333333*(slideIndex) + "%";
    }
}

setInterval(function(){
    plusSlide(1);
}, 4000);