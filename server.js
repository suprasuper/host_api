const express = require('express');
const PORT=3000;
const axios = require("axios");
var whoFound = 0;
var cors = require("cors");
var champOfTheDay =  Math.floor(Math.random() * 165);
const players = [];
var cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
  champOfTheDay  = Math.floor(Math.random() * 165);
  whoFound = 0;
  console.log('champ of the day : '+champOfTheDay);
  console.log('nombre de personne ayant trouvée : '+whoFound);
});


const app = express();
var corsOptions = {
  origin: '*',
  credentials: true
 }
app.use(cors(corsOptions));

const API_KEY = "RGAPI-9b196488-c596-4edb-a913-154909f20feb"

function getPLayer(id) {
  return axios.get("https://euw1.api.riotgames.com"+"/lol/league/v4/entries/by-summoner/"+id+"?api_key="+API_KEY)
          .then(response=>{
            return response.data
          }).catch(err=>err)
}

app.get('/allLeagues',async(req,res)=>{
  const ids = ["EdlXilkFBeCqLWp4ueTZKjHBulsPyjrev1Mxg2_2yCHtqNM","NooO92s_pLaIkxu1MfQ0JzevllBzPReNlVjCfUZMwt5e3T8","dEdvO_yJpEBWtoOrR5ML-3oydz45lyA26FaH430rNazDDfU","kBWF56OOLJ6cmolafDqtEWsupL0lwtb8Z-Vb6GJJGZIc2b8","KXdujJcXyRwtC49D-ir2O4lGKmgZdbkXQ_mNJ58FuNryc_Xl","6W2lrvTtLClCgxAvHgon13AqmC6vCkY9LkwLVZqCrN-lrF0","An0DMGGlDEh1jS5XloAmIxbRdae82gLz02LHVjZKgYRcjW0L","wY5fu_yH2msVoZGdoyz1mn3nsMOVwEltn-0kvpODWcjEqPoQy7hoQByqqg"]
  for(const id of ids) {
    const player = await getPLayer(id)
    players.push(player)
  }
  res.status(200).json(players)
  players.length=0;
})


app.use(cors(corsOptions));
app.get('/champOfTheDay',async(req,res)=>{
  console.log(champOfTheDay)
  res.status(200).json(champOfTheDay)
})
  
app.use(cors(corsOptions));
app.get('/whoFound',async(req,res)=>{
  console.log("personne qui ont trouvé : "+whoFound)
  res.status(200).json(whoFound)
})
  
app.use(cors(corsOptions));
app.get('/oneFound',async(req,res)=>{
  whoFound++
  res.status(200).json(whoFound)
})

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
  })

module.exports = app;
