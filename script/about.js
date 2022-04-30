function setUpImage() { 
    list = document.getElementById("secreatariat");

    for(var i = 1; i <= 14;i++){
        list.innerHTML += '<li><img src="./secreatariats/' + i + '.jpg" alt=""></li>';
    }

}