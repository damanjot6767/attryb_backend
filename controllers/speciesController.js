
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const { carModel } = require("../models");
dotenv.config();

const carManufacturers = [
  {
    name: "Tesla",
    foundedYear: 2003,
    country: "United States",
    headquarters: "Palo Alto, California",
    website: "https://www.tesla.com/",
    logo: "https://example.com/tesla_logo.png",
    models: [
      {
        name: "Model S",
        year: 2022,
        segment: "Luxury Sedan",
        price: 79990
      },
      {
        name: "Model 3",
        year: 2022,
        segment: "Compact Sedan",
        price: 39990
      },
      {
        name: "Model X",
        year: 2022,
        segment: "SUV",
        price: 89990
      }
    ]
  },
  {
    name: "Toyota",
    foundedYear: 1937,
    country: "Japan",
    headquarters: "Toyota City, Japan",
    website: "https://www.toyota-global.com/",
    logo: "https://example.com/toyota_logo.png",
    models: [
      {
        name: "Camry",
        year: 2022,
        segment: "Midsize Sedan",
        price: 24925
      },
      {
        name: "Corolla",
        year: 2022,
        segment: "Compact Sedan",
        price: 20950
      },
      {
        name: "RAV4",
        year: 2022,
        segment: "Compact SUV",
        price: 26725
      }
    ]
  },
  // Add more manufacturers and their respective models here
];


module.exports ={

    fetchSpecies :  (req, res) => {
        try{
           res.json({status:"success", data: carManufacturers});
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    },

    filterSpecies : async(req, res)=>{
        const { name} = req.query;

  try {
    const res = carManufacturers.find((ele)=>ele.name===name);
    res.json({status:"success", data: res});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
    },
}