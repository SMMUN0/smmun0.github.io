
function load(code, year) {
    console.log("HERE")
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
        // document.getElementById("CODE").innerText = committee["CODE"];
        document.getElementById("INFO").innerText = committee["INFO"];
        document.getElementById("pdf").href = code+".pdf";
        document.getElementById("PDF").src = code+".pdf";
        

        if(code != "Prensa"){
            if(code != "CPI"){
                document.getElementById("A").innerText = "A: " + committee["TOPICS"]["A"];
                document.getElementById("B").innerText = "B: " + committee["TOPICS"]["B"];
                for(var del in committee["DELEGATIONS"]){
                    document.getElementById("DELEGATIONS").innerHTML+='<li class="committee">'+committee["DELEGATIONS"][del]+'<\li>';
                }
            }else{
                document.getElementById("DELEGATIONS").innerHTML="El comité se dividirá en dos equipos, la mitad será quienes representarán a la fiscalía de la Corte Penal Internacional, y la otra mitad serán los representantes de la defensa de la persona imputada. Cada equipo estará conformado por ocho personas, quienes se turnarán para tener el uso de la voz en las sesiones, fungir como asesores jurídicos y la elaboración de las minutas.";
            }
            
            document.getElementById("PRES").src = "./chair/PRES.jpg"
            document.getElementById("MOD").src = "./chair/MOD.jpg"
            document.getElementById("OFI").src = "./chair/OFI.jpg"
            document.getElementById("PRESNAME").innerHTML = committee["CHAIR"]["PRES"];
            document.getElementById("MODNAME").innerHTML = committee["CHAIR"]["MOD"];
            document.getElementById("OFINAME").innerHTML = committee["CHAIR"]["OFI"];
            
        }else{
            document.getElementById("EJ").src = "./chair/EJ.jpg"
            document.getElementById("DR").src = "./chair/DR.jpg"
            document.getElementById("CC1").src = "./chair/CC1.jpg"
            document.getElementById("CC2").src = "./chair/CC2.jpg"
            document.getElementById("EJNAME").innerHTML = committee["CHAIR"]["EJ"];
            document.getElementById("DRNAME").innerHTML = committee["CHAIR"]["DR"];
            document.getElementById("CC1NAME").innerHTML = committee["CHAIR"]["CC1"];
            document.getElementById("CC2NAME").innerHTML = committee["CHAIR"]["CC2"];
            document.getElementById("DELEGATIONS").innerHTML = "El Cuerpo de Prensa es una comisión de cobertura especializada y estrategica para la difusión de información y contenido, que tiene como finalidad comunicar lo acontecido durante el flujo del debate y el desarrollo de las hojas de ruta y los acuerdos propuestos. Las Delegaciones representarán a un medio internacional en el ámbito, de acuerdo con un perfil, postura e ideología establecidas, el cual les será asignado. A su vez, tendrán la oportunidad de intervenir en la discusión y búsqueda de información, a través de espacios de diálogo y redacción, conforme a los tópicos a abordar en el Comité asignado.";
        }

        

        
    })

}