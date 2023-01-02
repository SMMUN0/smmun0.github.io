function load_documents(){
    fetch("./documents.json")
    .then( response => {
        return response.json()
    })
    .then( document_info => {
        var list = document.getElementById("documents");
        for(const DOC in document_info){
            var list_item = document.createElement("li")
            var list_link = document.createElement("a")
            list_link.innerText = DOC

            list_link.href = document_info[DOC]
            list_link.style.color = 'black'
            list_item.appendChild(list_link)
            list.appendChild(list_item)
        }
    })
}