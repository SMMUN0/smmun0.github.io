function load(code) {
    document.title = code;
    fetch("../../committees/2022.json")
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
        document.getElementById("IMAGE").src = "../../style/img/committees/" + committee["CODE"] + ".png";
        document.getElementById("NAME").innerText = committee["NAME"];
        // document.getElementById("CODE").innerText = committee["CODE"];
        document.getElementById("INFO").innerText = committee["INFO"];
        document.getElementById("A").innerText = "A: " + committee["TOPICS"]["A"];
        document.getElementById("B").innerText = "B: " + committee["TOPICS"]["B"];

        if(code != "Prensa"){
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
        }

        

        for(var del in committee["DELEGATIONS"]){
            document.getElementById("DELEGATIONS").innerHTML+='<li class="committee">'+committee["DELEGATIONS"][del]+'<\li>';
        }
    })

}