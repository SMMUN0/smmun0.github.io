function addElement () {

    fetch("./committees/2022.json")
    .then(response => {
        return response.json();
    })
    .then(response => {
        var committees = response;

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
                img.src = "./style/img/committees/" + committees[i]["CODE"] + ".png";
                img.classList.add("committee")

                var link = document.createElement("a");
                link.href = "/committees/" + committees[i]["CODE"] + ".html";
                link.appendChild(img);

                var header = document.createElement("h1");
                header.innerHTML = committees[i]["NAME"];
                header.className = "committee";

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
                imgL.src = "./style/img/committees/" + committees[i+1]["CODE"] + ".png";

                var linkL = document.createElement("a");
                linkL.href = "/committees/" + committees[i+1]["CODE"] + ".html";
                linkL.appendChild(imgL);

                headerL.className = "committee";
                headerL.innerHTML = committees[i+1]["NAME"];
                leftDiv.appendChild(linkL);
                leftDiv.appendChild(headerL);
                newDiv.appendChild(leftDiv);

                var imgR = document.createElement("img");
                var headerR = document.createElement("h1");
                imgR.classList.add("committee")
                imgR.src = "./style/img/committees/" + committees[i]["CODE"] + ".png";

                var linkR = document.createElement("a");
                linkR.href = "/committees/" + committees[i]["CODE"] + ".html";
                linkR.appendChild(imgR);

                headerR.className = "committee";
                headerR.innerHTML = committees[i]["NAME"];
                rigthDiv.appendChild(linkR);
                rigthDiv.appendChild(headerR);
                newDiv.appendChild(rigthDiv);
                
            }

            currentDiv.appendChild(newDiv);
        }

    })

}