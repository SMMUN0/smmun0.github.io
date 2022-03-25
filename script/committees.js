function addElement () {

    fetch("./committees/2022.json")
    .then(response => {
        return response.json();
    })
    .then(response => {
        var committees = response;
        var currentDiv = document.getElementById("committeesList");

        for(var i = 0; i < committees.length-1; i++){

            // Single committee
                var middleDiv = document.createElement("li");

                var img = document.createElement("img");
                img.src = "./style/img/committees/" + committees[i]["CODE"] + ".png";
                img.classList.add("committee")

                var link = document.createElement("a");
                link.href = "/committees/" + committees[i]["CODE"] + "/"+ committees[i]["CODE"] + ".html";
                link.appendChild(img);

                var header = document.createElement("h1");
                header.innerHTML = committees[i]["CODE"];
                header.className = "committee";

                middleDiv.appendChild(link);
                middleDiv.appendChild(header);
                currentDiv.appendChild(middleDiv);
        }

        // Prensa committee
        var Prensa = document.getElementById("Prensa");

        var img = document.createElement("img");
        img.src = "./style/img/committees/" + committees[committees.length-1]["CODE"] + ".png";
        img.classList.add("committee")

        var link = document.createElement("a");
        link.href = "/committees/" + committees[committees.length-1]["CODE"] + "/"+ committees[i]["CODE"] + ".html";
        link.appendChild(img);

        var header = document.createElement("h1");
        header.innerHTML = committees[committees.length-1]["CODE"];
        header.className = "committee";

        Prensa.appendChild(link);
        Prensa.appendChild(header);


    })

}