function setUpImage() { 
    // list = document.getElementById("secreatariat");

    // for(var i = 1; i <= 14;i++){
    //     list.innerHTML += '<li><img src="./secreatariats/' + i + '.jpg" alt=""></li>';
    // }

    fetch("../../models.json")
    .then(response => {
        return response.json();
    })
    .then(response => {
        for(var model in response){
            console.log("SMMUN " + response[model]["year"] + " For " + response[model]["for"] );
            document.getElementById("pastModels").innerHTML += `
            <div
            style="width:100%; margin: auto; text-align: justify; background-color: rgba(`+response[model]["backgroundcolor"][0]+`, `+response[model]["backgroundcolor"][1]+`, `+response[model]["backgroundcolor"][2]+`); padding-top: 100px; padding-bottom: 100px;">
            <div class="aboutSection">
            <h1 style="text-align: center; color: rgba(`+response[model]["h1"][0]+`, `+response[model]["h1"][1]+`, `+response[model]["h1"][2]+`);" class="model">`+"SMMUN " + response[model]["year"] + " For " + response[model]["for"]+`</h1>
            <br>
            <!-- Modal gallery -->
            <section class="">
            <!-- Section: Images -->
            <section class="">
                <div class="row">
                    <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                        <div
                        class="bg-image hover-overlay ripple shadow-1-strong rounded"
                        data-ripple-color="light"
                        >
                        <img
                        src="/style/img/about/`+response[model]["year"]+`/img1.jpg"
                            class="w-100"
                            />
                        <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal1">
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.2);"></div>
                        </a>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4 mb-lg-0">
                        <div
                        class="bg-image hover-overlay ripple shadow-1-strong rounded"
                        data-ripple-color="light"
                        >
                        <img
                            src="/style/img/about/`+response[model]["year"]+`/img2.jpg"
                            class="w-100"
                            />
                        <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal2">
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.2);"></div>
                        </a>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4 mb-lg-0">
                        <div
                        class="bg-image hover-overlay ripple shadow-1-strong rounded"
                        data-ripple-color="light"
                        >
                        <img
                        src="/style/img/about/`+response[model]["year"]+`/img3.jpg"
                            class="w-100"
                            />
                        <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal3">
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.2);"></div>
                        </a>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Section: Images -->
            <br>
            </div>
        </div>
            `
        }
    });

    

}