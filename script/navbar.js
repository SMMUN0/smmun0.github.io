const pages = {
    'index':'Inicio',
    'about':'¿Quiénes somos?',
    'register':'Inscripciones',
    'committees':'Comités',
    'contact':'contacto'
}

function addNavBar(page, inside_committee) {
    nav_bar_link = ""
    if(inside_committee) nav_bar_link += "../../"
    nav_bar_link += "nav_bar.html"
    fetch(nav_bar_link)
    .then(navbar_html => {
        return navbar_html.text()
    })
    .then(navbar_html => {
        document.getElementById("navBar").innerHTML = navbar_html
    })
}

function addFooter(inside_committee) {
    footer_link = ""
    if(inside_committee) footer_link += "../../"
    footer_link += "footer.html"
    fetch(footer_link)
    .then(footer_html => {
        return footer_html.text()
    })
    .then(footer_html => {
        document.getElementById("footer").innerHTML = footer_html
    })
}

function load(page, inside_committee = false) {
    addNavBar(page, inside_committee)
    addFooter(inside_committee)
}