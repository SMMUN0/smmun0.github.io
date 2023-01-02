# SMMUN webpage

<img src="./style/img/logos/logoSMMUN.png" alt="SMMUNlogo" width="200" style="display: block; margin: auto"/>

Bienvenidx a la página del SMMUN. Esta página tiene el propópisto de ser la estándar para futuras secreatarías y servir el propósito de ser el punto común de toda la actividad del Modelo.

## Logos y Documentación

Estos son unos archivos a los que talvez quieras acceder
- [Documentación de archivos pasados](./documentation/)
- [Logos de modelos pasados](./style/img/logos/)
- [Logos de comités pasados](./style/img/committees/)
- [Imágenes de modelos pasados](./style/img/about/)

## committes script (year_json_generator.cpp & generate_folders.py)

Cada año tiene una carpeta con el siguiente formato

```txt
/codigo_mesa_1
/codigo_mesa_2
...
/codigo_mesa_N
    /codigo_mesa_N.html
    /codigo_mesa_N.pdf
    /chair
        /MOD.jpg
        /OFI.jpg
        /PRES.jpg
año.json
committees.txt
```

`codigo_mesa_N.html` contiene el html de cada comité, todos los comités tienen el mismo código a excepción en el tag de body, donde se encuentra una funcion con el año y código del comité:

```html
<body onload='load(codigo_mesa_N,año)'>
```

Cabe resaltar que los archivos están conectados a los siguientes codigos:

```html
<script src="../../../script/committee.js"></script>
<link rel="stylesheet" href="../../../style/css/committee.css">
```

Puedes encontrar el código template de cada comité en [Aquí](./committees/template.html)

`codigo_mesa_N.pdf` contiene el Manual del Delegado de cada comité.

`año.json` contiene la información de los comités de ese año en una lista. Cada mesa tiene el siguiente formato:

```json
{
    "CODE":"codigo_mesa_1",
    "NAME":"nombre_mesa",
    "LAN":"idioma_mesa",
    "INFO":"info_mesa",
    "TOPICS":
    {
        "A":"topico_a",
        "B":"topico_c"
    },
    "DELEGATIONS":
    [
        "pais_1",
        "pais_1",
        // ...
        "pais_N"
    ],
    "CHAIR":{
        "PRES":"nombre_presidencia",
        "MOD":"nombre_moderacion",
        "OFI":"nombre_oficialia"
    }
}
```

### generate_folders.py

Este código se encarga de generar las carpetas de los comités de cada año. Lo comités para crear están enlistos en `./committees/año/committees.txt`

### year_json_generator.cpp

Este código se encarga de generar el código default de cada comité. Lo comités para crear están enlistos en `./committees/año/committees.txt`


# TODO

- Documentation page