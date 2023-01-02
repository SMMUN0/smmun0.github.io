function load_contacts(){
    fetch("./contact.json")
    .then(response => {
        return response.json();
    })
    .then(contact_info => {
        console.log(contact_info)
        for(const name in contact_info){
            var li = document.createElement("li");
            var strong = document.createElement("strong");
            var a = document.createElement("a")
            strong.innerHTML = name
            a.style.color = "black"
            a.href = "mailto: " + contact_info[name]
            a.innerHTML = contact_info[name]
            li.appendChild(strong)
            li.appendChild(document.createElement("br"))
            li.appendChild(a)
            document.getElementById("contact_info").appendChild(li)
            document.getElementById("contact_info").appendChild(document.createElement("br"))
        }
    })
}