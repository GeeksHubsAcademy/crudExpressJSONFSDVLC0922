
const express = require('express');

const app = express();

let fs = require('fs');

const port = 3000;


//Middleware 

/*Json, ejecutamos el método json de express que nos permitirá 
poder trabajar con formato json en nuestra app*/
app.use(express.json());


//CRUD

//Get

app.get("/", (req, res) => {
    //Leo el archivo JSON con las películas

    fs.readFile('db/movies.json', 'utf-8', (err, data) => {

        if (err) {
            res.json(
                {
                    "error": err
                }
            )
        } else {
            let parseado = JSON.parse(data);
            res.send(parseado);
        };
    });
});

//Get search

app.get("/search/:busqueda", (req, res) => {

    //Recogemos el criterio de búsqueda

    let criterio = req.params.busqueda;

    //Nos traemos todas las películas del archivo JSON

    fs.readFile('db/movies.json', 'utf-8', (err, data) => {

        if (err) {
            res.json(
                {
                    "error": err
                }
            )
        } else {

            //Aqui ya tenemos las películas...ahora filtramos con el criterio...

            let pelis = JSON.parse(data);

            pelis.map(pelicula => {
                if (pelicula.Title == criterio) {
                    res.json(pelicula);
                    return;
                } else {
                    console.log("No se ha encontrado esta película");
                }
            });

        };
    });

});

// Post add

app.post("/add", (req,res) => {

    let newFilm = req.body;

    let convertido;

    fs.readFile('db/movies.json', 'utf-8', (err, data) => {

        if (err) {
            res.json(
                {
                    "error": err
                }
            )
        } else {
            //Convertimos los datos encontrados del archivo a JSON ya que fs.readFile nos los trae en string
            convertido = JSON.parse(data);


            //Guardamos en el JSON la nueva película, pusheando la película encontrada newFilm

            convertido.push(newFilm);


            /*En este paso, guardamos en la variable convertido el JSON convertido
            a string con un formateo de salto de línea.*/
            convertido = JSON.stringify(convertido,null,2);

            fs.writeFile("db/movies.json", convertido, (err) => {
                if(err){
                    console.log(err);
                } else {
                    res.send("Ha ido todo bien");
                }
            })
            
        };
    });

});


//Levantamos el servidor en escucha en el puerto designado en la constante port (en este caso 3000)
app.listen(port, () => {
    console.log(`Servidor levantado y funcionando en puerto `, port);
});