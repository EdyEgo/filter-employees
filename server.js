const fs = require('fs');
// import { faker } from "@faker-js/faker";
const {faker} = require("@faker-js/faker")

let dummyDataToWrite = ""

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }


  const functiiAngajati = ["programator","bucatar","manager","avocat"]

function createDummyDepartamente() {
    const createdObject = [];

    for (let i = 0; i < 50000; i++) {
        const fullName = faker.name.fullName().split(" ")
    //   createdObject[i] = {id:i,idDepartament:getRandomArbitrary(0,9), name:fullName[0],prenume:fullName[1],cnp:245120124214124, description: "bruh" };
    createdObject.push({id:i,id_departament:getRandomArbitrary(0,9), name:fullName[0],prenume:fullName[1],cnp:faker.address.buildingNumber(), functie: functiiAngajati[getRandomArbitrary(0,3)],salariu:getRandomArbitrary(3000,32000),zileConcediu:getRandomArbitrary(2,25) })
   
}

     dummyDataToWrite = JSON.stringify(createdObject);

   
  }

  
  // createDummyDepartamente()

// fs.writeFileSync('employeesTable.json', dummyDataToWrite);

let departamentsDataToWrite = [
  {
    id:0,
    nume:"bucatarie",
    descriere:"descriere bucatarie: se gateste aici"
  },
 
  {
    id:1,
    nume:"avocatura",
    descriere:"descriere  avocatura : aici eu te judec pe tine si tu pe mine"
  },
  {
    id:2,
nume:"resurse umane",
descriere:"descriere resurse umane"
  },
  {
    id:3,
nume:"curatenie",
descriere:"descriere curatenie : unde se face curat si nu numai"
  },
  {
    id:4,
nume:"PR",
descriere:"PR descriere: trebuie sa dam bine "
  },
  {
    id:5,
nume:"minare cripto",
descriere:"minare cripto descriere: profit suta la suta...aha"
  },
  {
    id:6,
nume:"nfts",
descriere:"nfts descriere: nu exista dar exista si ii dam valoare"
  },
  {
    id:7,
nume:"am ramas fara idei",
descriere:"am ramas fara idei descriere: da"
  },
  {
    id:8,
nume:"alt departament",
descriere:"descriere alt departament: acest departament are alta descriere"
  },
  {
    id:9,
nume:"ultimul departament",
descriere:"ultimul departament descriere: din pacate acesta este ultimul departament"
  },


]

// fs.writeFileSync('departamentsTable.json', JSON.stringify(departamentsDataToWrite));
