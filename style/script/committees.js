var committees = ["UNFPA", "UNSC", "ACNUDH", "UNW", "UNESCO", "ECOSOC", "Tercera Comisión", "CPI", "Prensa"];

function addElement () {

    var currentDiv = document.getElementById("committees");

    console.log("HERE");

    for(var i = 0; i < committees.length; i+=2){

        var newDiv = document.createElement("div");
        newDiv.classList.add("group");
        if(i+1 == committees.length){
            // single committee
            var middleDiv = document.createElement("div");
            middleDiv.classList.add("committee-middle");

            var img = document.createElement("img");
            img.src = "./style/img/committees/" + committees[i] + ".png";
            img.classList.add("committee")

            var link = document.createElement("a");
            link.href = "/committees/" + committees[i] + ".html";
            link.appendChild(img);

            var header = document.createElement("h1");
            header.innerHTML = committees[i];

            middleDiv.appendChild(link);
            middleDiv.appendChild(header);
            newDiv.appendChild(middleDiv);
        }else{
            // double committe
            var leftDiv = document.createElement("div");
            leftDiv.classList.add("committee-left");
            var rigthDiv = document.createElement("div");
            rigthDiv.classList.add("committee-rigth");

            var imgL = document.createElement("img");
            var headerL = document.createElement("h1");
            imgL.classList.add("committee")
            imgL.src = "./style/img/committees/" + committees[i+1] + ".png";

            var linkL = document.createElement("a");
            linkL.href = "/committees/" + committees[i+1] + ".html";
            linkL.appendChild(imgL);

            headerL.innerHTML = committees[i+1];
            leftDiv.appendChild(linkL);
            leftDiv.appendChild(headerL);
            newDiv.appendChild(leftDiv);

            var imgR = document.createElement("img");
            var headerR = document.createElement("h1");
            imgR.classList.add("committee")
            imgR.src = "./style/img/committees/" + committees[i] + ".png";

            var linkR = document.createElement("a");
            linkR.href = "/committees/" + committees[i] + ".html";
            linkR.appendChild(imgR);

            headerR.innerHTML = committees[i];
            rigthDiv.appendChild(linkR);
            rigthDiv.appendChild(headerR);
            newDiv.appendChild(rigthDiv);
            
        }

        currentDiv.appendChild(newDiv);
    }

//   // crea un nuevo div
//   // y añade contenido
//   var newDiv = document.createElement("div");
//   var newContent = document.createTextNode("Hola!¿Qué tal?");
//   newDiv.appendChild(newContent); //añade texto al div creado.

//   // añade el elemento creado y su contenido al DOM
//   var currentDiv = document.getElementById("div1");
//   document.body.insertBefore(newDiv, currentDiv);
}