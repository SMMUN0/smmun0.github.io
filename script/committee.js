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
        document.getElementById("PRES").src = "./chair/PRES.jpg"
        document.getElementById("MOD").src = "./chair/MOD.jpg"
        document.getElementById("OFI").src = "./chair/OFI.jpg"
        document.getElementById("PRESNAME").innerHTML = committee["CHAIR"]["PRES"];
        document.getElementById("MODNAME").innerHTML = committee["CHAIR"]["MOD"];
        document.getElementById("OFINAME").innerHTML = committee["CHAIR"]["OFI"];
        for(var del in committee["DELEGATIONS"]){
            document.getElementById("DELEGATIONS").innerHTML+='<li class="committee">'+committee["DELEGATIONS"][del]+'<\li>';
        }
    })

}