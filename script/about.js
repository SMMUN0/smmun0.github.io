function setUpImage() { 
    carousel = document.getElementById("carouselExampleIndicators");
    fetch("./secretariats/2022.json")
    .then(response => {
        return response.json();
    })
    .then(secretariat => {
        sizeOfCarousel = Math.ceil(secretariat.length/4);
        carouselIndicators = document.getElementById("carousel-indicators");
        carouselItems = document.getElementById("carousel-inner");

        for(var i = 0; i < sizeOfCarousel; i++){
            var indicator = document.createElement("li");
            indicator.dataset.target = "#carouselExampleIndicators";
            indicator.setAttribute("data-slide-to","\""+i+"\"");
            indicator.id = "indicator"+i;
            carouselIndicators.appendChild(indicator);

            var item = document.createElement("div");
            item.classList.add("carousel-item");
            item.id = "item"+i;
            var newGallery = document.createElement("div");
            newGallery.classList.add("newGallery");
            newGallery.id = "newGallery"+i;

            item.appendChild(newGallery);
            carouselItems.appendChild(item);
        }

        document.getElementById("indicator0").classList.add("active");
        document.getElementById("item0").classList.add("active");
        
        var indx = 0;
        secretariat.forEach(person => {
            newGallery = document.getElementById("newGallery"+Math.floor(indx/4));

            var gallery = document.createElement("div");
            gallery.classList.add("gallery");

            var a = document.createElement("a");
            a.target = "_blank";
            a.href = "./style/img/secretariats/2022/"+person["ID"]+".jpg";

            var img = document.createElement("img");
            img.src = "./style/img/secretariats/2022/"+person["ID"]+".jpg";
            img.alt = person["Nombre"] + " " + person["Primer Apellido"];

            var desc = document.createElement("div");
            desc.classList.add("desc");
            desc.innerHTML = "<h2 class='name'>"+person["Nombre"]+" "+person["Primer Apellido"]+" "+person["Segundo Apellido"]+"</h2>"+"<h3 class='poss'>"+person["Secretaria"]+"<\h3>";


            a.appendChild(img);
            gallery.appendChild(a);
            gallery.appendChild(desc);
            newGallery.appendChild(gallery);

            indx++;
        });
    });
}