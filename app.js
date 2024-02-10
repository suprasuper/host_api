const express = require('express');
const axios = require("axios");
var cors = require("cors");
const players = [];


const app = express();
const options = {
  origin: 'http://127.0.0.1:5500',
}
app.use(cors(options));

const API_KEY = "RGAPI-faeead12-e326-47cc-8bc3-a3744ab2f0de"

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
  

module.exports = app;
