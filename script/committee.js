const titulos = 
{
    "PRES":"Presidencia",
    "MOD":"Moderación",
    "OFI":"Oficialía",
    "EJ":"Edición de Jefe",
    "DR":"Dirección de Redacción",
    "CC1":"Coordinación de Contenido",
    "CC2":"Coordinación de Contenido",
    "MPA":"Magistrada Primera",
    "MSA":"Magistrada Segunda",
    "SA":"Secretaría de Audiencia",
    "MPRESA":"Magistrada Presidenta"
}

const languages = 
{
    'en':"English",
    'es':"Español",
}

const modalities = 
{
    'en':
    {
        "PV":"On-site/Virtual",
        "P":"On-site",
        "V":"Virtual",
    },
    'es':
    {
        "PV":"Presencial/Virtual",
        "P":"Presencial",
        "V":"Virtual", 
    }
}

function load_committee(code, year) {
    console.log(year)
    document.title = code;
    fetch("../../../committees/" + year + "/" + year +".json")
    .then(response => {
        return response.json();
    })
    .then(response => {
        for(var i = 0; i < response.length; i++){
            if(response[i]["CODE"]==code){
                return response[i];
            }
        }
    })
    .then(committee => {
        console.log(committee["NAME"]);
        document.getElementById("IMAGE").src = "../../../style/img/committees/" + committee["CODE"] + ".png";
        document.getElementById("NAME").innerText = committee["NAME"];
        document.getElementById("LAN/MODALITY").innerText = languages[committee["LAN"]] + " - " + modalities[committee["LAN"]][committee["MODALITY"]]
        document.getElementById("INFO").innerText = committee["INFO"];
        document.getElementById("pdf").href = code+".pdf";
        document.getElementById("PDF").src = code+".pdf";


        for(var del in committee["DELEGATIONS"]){
                document.getElementById("DELEGATIONS").innerHTML+='<li class="committee subtitle">'+committee["DELEGATIONS"][del]+'<\li>';
        }


        if(Object.keys(committee["TOPICS"]).length > 1){
            document.getElementById("A").innerText = "A: " + committee["TOPICS"]["A"];
            document.getElementById("B").innerText = "B: " + committee["TOPICS"]["B"];
        }else{
            document.getElementById("A").innerText = committee["TOPICS"]["CASO"];
        }

        var chair_div = document.getElementById("CHAIR")
        chair_div.innerHTML = ""
        for(const titulo in committee["CHAIR"]){
            console.log(titulo)
            var element = document.createElement("li")

            var img = document.createElement("img")
            var name = document.createElement("h3")
            var position = document.createElement("h4")

            img.src = "./chair/"+ titulo +".jpg"
            img.alt = titulo
            img.id = titulo
            img.classList.add("chair")

            name.innerHTML = committee["CHAIR"][titulo];
            name.classList.add("committee")
            name.classList.add("subtitle")

            position.innerHTML = titulos[titulo]
            position.classList.add("committee")
            position.classList.add("subsubtitle")

            element.appendChild(img)
            element.appendChild(name)
            element.appendChild(position)

            chair_div.appendChild(element)

            if(Object.keys(committee["CHAIR"]).length > 3) chair_div.classList.add("plural")
        }

        

        
    })

    fetch("../../year_configurations.json")
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
        
        document.getElementsByClassName("primary")[0].style.backgroundColor = 'rgb(' + response[year]["background_one"][0] + ',' + response[year]["background_one"][1] + ',' + response[year]["background_one"][2] + ')';

        var divs = document.getElementsByClassName("secondary");
        for(var i = 0; i < divs.length; i++){
            divs[i].style.backgroundColor = 'rgb(' + response[year]["background_two"][0] + ',' + response[year]["background_two"][1] + ',' + response[year]["background_two"][2] + ')';
        }

        var divs = document.getElementsByClassName("title");
        for(var i = 0; i < divs.length; i++){
            divs[i].style.color = 'rgb(' + response[year]["main_title"][0] + ',' + response[year]["main_title"][1] + ',' + response[year]["main_title"][2] + ')';
        }

        var divs = document.getElementsByClassName("subtitle");
        for(var i = 0; i < divs.length; i++){
            divs[i].style.color = 'rgb(' + response[year]["subtitles"][0] + ',' + response[year]["subtitles"][1] + ',' + response[year]["subtitles"][2] + ')';
        }

        var divs = document.getElementsByClassName("subsubtitle");
        for(var i = 0; i < divs.length; i++){
            divs[i].style.color = 'rgb(' + response[year]["subsubtitles"][0] + ',' + response[year]["subsubtitles"][1] + ',' + response[year]["subsubtitles"][2] + ')';
        }
        
    })

}