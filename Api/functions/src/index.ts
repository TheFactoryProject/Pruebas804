import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import * as express from 'express';
import { newEcom, newEvo, newGPS } from "./interface/type";


const serviceAccount = require('./permisos.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const DB = admin.firestore();

const ex = express();
const main = express();

const pruebaCollection = 'Prueba';
const ecomCollection = 'Ecom';
const evoCollection = 'Evo';
const gpsCollection = 'GPS';
const ecomCollectionUnique = 'EcomUnique';
const gimpCollection = 'Gimp';
const gimpCollectionUnique = 'GimpUnique';

//const evoCollectionUnique = 'EvoUnique';



main.use('/api/', ex);
main.use(express.json());
// webApi is your functions name, and you will pass main as 
// a parameter




ex.post('/addEvo', async (req, res) => {

      try{     
        
        let evoDocuments: newEvo = {
            id_evo: req.body.id_evo,
            fecha_evo: req.body.fecha_evo,
            hora_evo: req.body.hora_evo,
            temperatura_evo: req.body.temperatura_evo,
            acc_x_evo: req.body.acc_x_evo,
            acc_y_evo: req.body.acc_y_evo,
            acc_z_evo: req.body.acc_z_evo,
            giro_x_evo: req.body.giro_x_evo,
            giro_y_evo: req.body.giro_y_evo,
            giro_z_evo: req.body.giro_z_evo,
            pm100: req.body.pm100,
            pm25: req.body.pm25,
            pm10: req.body.pm10,
            ecom_asignado: req.body.ecom_asignado,
            id_sensor: req.body.id_sensor,
            date_evo: Date.now().toString()

        }   

            let ecom_asignado_evo = await DB.collection(ecomCollection).where( 'id_ecom', '==', evoDocuments.ecom_asignado).get()

            if(ecom_asignado_evo.empty){
                res.status(400).json({status: 'false', error: 'Ecom not found'}).send(console.log('Ecom not found'));
            }
            else{
                //add collection in ecom_asignado_evo named evo and add evoDocuments
                await ecom_asignado_evo.forEach(async (doc) => {
                    await doc.ref.collection(evoCollection).doc(evoDocuments.id_evo).set(evoDocuments);
                }
                )
                res.status(201).json({status: 'success', message: 'Evo add', data:evoDocuments})
                .send(console.log('Evo add'));
            }

}catch(error){

    console.log(error);
    res.status(400).json({status: 'false', error: error}).send(console.log('Error EVO'));
    
    }
});

ex.post('/addEcom', async (req, res) => {

    try{
        
        let ecomAdd : newEcom = {
            id_ecom: req.body.id_ecom,
            fecha_ecom: req.body.fecha_ecom,
            hora_ecom: req.body.hora_ecom,
            temperatura_ecom: req.body.temperatura_ecom,
            acc_x_ecom: req.body.acc_x_ecom,
            acc_y_ecom: req.body.acc_y_ecom,
            acc_z_ecom: req.body.acc_z_ecom,
            giro_x_ecom: req.body.giro_x_ecom,
            giro_y_ecom: req.body.giro_y_ecom,
            giro_z_ecom: req.body.giro_z_ecom,
            evo_asignado: req.body.evo_asignado,
            date_ecom: Date.now().toString()

        }
         



     await DB.collection(ecomCollection).doc(ecomAdd.id_ecom).collection(ecomCollectionUnique).doc(ecomAdd.date_ecom).set(ecomAdd);
     
        res.status(201).json({status: 'success', message: 'Ecom add', data: {ecomAdd}})


    }catch(error){
    console.log(error);
    res.status(400).json({status: 'false no agregado', error: error}).send(console.log('Error ECOM'));
    
    }

});

ex.post('/addEcomJson', async (req, res) => {

    //add json with any format
    try{

        const jsonItem = {
            date:req.body.date,
            lat: req.body.lat,
            lon: req.body.lon,
            pm10: req.body.pm10,
            horaLlegada: Date.now(),
            station: req.body.station
		}

    await DB.collection(gimpCollection).doc(jsonItem.station).collection(gimpCollectionUnique)
    .doc(jsonItem.horaLlegada.toString()).set(jsonItem);

    res.status(201).json({status: 'success', message: 'Ecom add', data: {jsonItem}})
    }catch(error){
    console.log(error);
    res.status(400).json({status: 'false no agregado', error: error}).send(console.log('Error ECOM'));
    
    }

});


ex.post('/addGPS', async (req, res) => {

    try{     
      
      let gpsDocuments: newGPS = {
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            altitud: req.body.altitud,
            velocidad: req.body.velocidad,
            fecha_gps: req.body.fecha_gps,
            hora_gps: req.body.hora_gps,
            id_ecom: req.body.id_ecom,
            date_gps: Date.now().toString()
      }   

          let ecom_asignado_gps = await DB.collection(ecomCollection).where( 'id_ecom', '==', gpsDocuments.id_ecom).get()

          if(ecom_asignado_gps.empty){
              res.status(400).json({status: 'false', error: 'Ecom not found'}).send(console.log('Ecom not found'));
          }
          else{
              //add collection in ecom_asignado_evo named evo and add evoDocuments
              await ecom_asignado_gps.forEach(async (doc) => {
                 await doc.ref.collection(gpsCollection).doc(gpsDocuments.date_gps).set(gpsDocuments);
              }
              )
              res.status(201).json({status: 'success', message: 'Evo add', data:gpsDocuments})
              .send(console.log('Evo add'));
          }

}catch(error){

  console.log(error);
  res.status(400).json({status: 'false', error: error}).send(console.log('Error EVO'));
  
  }
});






// Add new prueba
ex.post('/prueba', async (req, res) => {
    try {
        let prueba ={

            id_ecom: req.body.id_ecom,
            fecha_ecom: req.body.fecha_ecom,
            hora_ecom: req.body.hora_ecom
        
        }
        
       await DB.collection(pruebaCollection).doc().set(prueba);
        res.status(201).json({status: 'success', message: 'Prueba added', data: {prueba: prueba}});

    } catch (error) {
        res.status(400).send(`Texto mal ingresado`).json({status: 'false', error: error});
    }        
});



// View all pruebas
ex.get('/prueba', (req, res) => {
  
    DB.collection(pruebaCollection).get()
        .then((data:any) => res.status(200).send(data))
        .catch((error:any) => res.status(400).send(`Cannot get pruebas: ${error}`));
})



ex.get('/getEcomAll', async (req, res) => {

    try{
        let ecom = await DB.collection(ecomCollection).get()
        res.status(200).json({status: 'success', message: 'Ecoms', data: ecom})
    }catch(error){
        res.status(400).json({status: 'false', error: error})
    }

})

ex.get('/getEcomUnique/:idEcom', async (req, res) => {

    try{
        let ecom = await DB.collection(ecomCollection).doc(req.params.idEcom).collection(ecomCollectionUnique).get()
        res.status(200).json({status: 'success', message: 'Ecoms', data: ecom})
    }catch(error){
        res.status(400).json({status: 'false', error: error})
    }

})

ex.get('/getAllGimp', async (req, res) => {
    
        try{
            let gimp = await DB.collection(gimpCollection).get()
            res.status(200).json({status: 'success', message: 'Gimp', data: gimp})
        }catch(error){
            res.status(400).json({status: 'false', error: error})
        }
    

})

ex.get('/getGimp/:station', async (req, res) => {

    try{
        let gimp = await DB.collection(gimpCollection).doc(req.params.station).collection(gimpCollectionUnique).get()
        res.status(200).json({status: 'success', message: 'Gimp', data: gimp})
    }catch(error){
        res.status(400).json({status: 'false', error: error})
    }



})




export const webApi = functions.https.onRequest(main);