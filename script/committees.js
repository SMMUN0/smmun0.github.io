function addElement (year) {

    fetch("./committees/"+year+"/"+year+".json")
    .then(response => {
        return response.json();
    })
    .then(response => {
        var committees = response;
        var currentDiv = document.getElementById("committeesList");

        for(var i = 0; i < committees.length; i++){

            // Single committee
                var middleDiv = document.createElement("li");

                var img = document.createElement("img");
                img.src = "./style/img/committees/" + committees[i]["CODE"] + ".png";
                img.classList.add("committee")

                var link = document.createElement("a");
                link.href = "/committees/"+ year + "/" + committees[i]["CODE"] + "/"+ committees[i]["CODE"] + ".html";
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
        link.href = "/committees/" + year + "/" + committees[committees.length-1]["CODE"] + "/"+ committees[i]["CODE"] + ".html";
        link.appendChild(img);

        var header = document.createElement("h1");
        header.innerHTML = committees[committees.length-1]["CODE"];
        header.className = "committee";

        Prensa.appendChild(link);
        Prensa.appendChild(header);


    })

    fetch("./committees/year_configurations.json")
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)

        
        document.getElementById("committees").style.backgroundColor = 'rgb(' + response[year]["background_one"][0] + ',' + response[year]["background_one"][1] + ',' + response[year]["background_one"][2] + ')';
        
        document.getElementById('title').style.color = 'rgb(' + response[year]["main_title"][0] + ',' + response[year]["main_title"][1] + ',' + response[year]["main_title"][2] + ')';
        document.getElementById('subtitle').style.color = 'rgb(' + response[year]["subtitles"][0] + ',' + response[year]["subtitles"][1] + ',' + response[year]["subtitles"][2] + ')';
        document.getElementById('subtitle').innerHTML = response[year]["slogan"] + ' ' +  year

        var committees = document.getElementsByClassName("committee");

        for(var i = 0; i < committees.length; i++){
            committees[i].style.color = 'rgb(' + response[year]["main_title"][0] + ',' + response[year]["main_title"][1] + ',' + response[year]["main_title"][2] + ')';
        }
        
    })

}