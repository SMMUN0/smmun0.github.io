# SMMUN webpage

<img src="./style/img/logos/logoSMMUN.png" alt="SMMUNlogo" width="200" style="display: block; margin: auto"/>

Bienvenidx a la página del SMMUN. Esta página tiene el propópisto de ser la estándar para futuras secreatarías y servir el propósito de ser el punto común de toda la actividad del Modelo.

## committes script

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
```

`codigo_mesa_N.html` contiene el html de cada comité, todos los comités tienen el mismo código a excepción de la línea 16, donde se pone el nombre del comité. Cabe resaltar que los archivos están conectados a los siguientes codigos:

```html
<script src="../../script/committee.js"></script>
<link rel="stylesheet" href="../../style/css/committee.css">
```
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


# TODO

- Fix COMMITTE_CODE bug (two words code)
- Rewrite 2022 `.html` files
- Document code
- Change color for committes in each year
- Add known code names to `.json` generator