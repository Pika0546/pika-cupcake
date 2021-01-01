document.querySelector(".book-it").addEventListener("click", function(){
    let guestName = document.getElementById("guest-name");
    let flag = true;
    if(guestName.value == ""){
        document.querySelector(".guest-name .invalid-anounce").style.display = "block";
        flag = false;
    }else{
        document.querySelector(".guest-name .invalid-anounce").style.display = "none";
    }
    let guestEmail = document.getElementById("guest-email");
    if(guestEmail.value.indexOf("@") == -1){
        document.querySelector(".guest-email .invalid-anounce").style.display = "block";
        flag = false;
    }else{
        document.querySelector(".guest-email .invalid-anounce").style.display = "none";
    }
    if(flag == true){
       
    }
    
})