const express = require("express");
var Hero = require("../model/hero")

const router = express.Router();

var heroesArray = [
  // {
  //   id: 1,
  //   name: "Ranjan",
  //   superPowers: ["power1", "power2"],
  //   likeCount: 100
  // },
  // {
  //   id: 2,
  //   name: "Aravinda",
  //   superPowers: ["liquorPower", "disappearance"],
  //   likeCount: 900
  // },
  // {
  //   id: 3,
  //   name: "Nisal",
  //   superPowers: ["TikTok", "blackmail"],
  //   likeCount: 1200
  // },
  // {
  //   id: 4,
  //   name: "Kemila",
  //   superPowers: ["Docker", "Girls"],
  //   likeCount: 1200
  // }
];

router.get("/", (req, res) => {
  res.send(heroesArray);
});

router.get("/:heroId", (req, res) => {
  let userRquestedId = parseInt(req.params.heroId);
  let requestedHero = heroesArray.find(h => h.id === userRquestedId);

  if (!requestedHero) {
    return res.status(404).send("Requested Id does not exist on our server");
  }

  return res.status(200).send(requestedHero);
});

router.post("/", async(req, res) => {
  // if (!req.body.name) {
  //   return res.status(400).send("Please check request again!");
  // }


  // let newHero = {
  //   id: heroesArray.length + 1,
  //   name: req.body.name,
  //   superPowers: req.body.superPowers,
  //   likeCount: req.body.likeCount
  // };

  // heroesArray.push(newHero);

  let heroToAdd = new Hero({

    name : "Hero 1",
    likeCount: 800,
  });
try{
  heroToAdd = await heroToAdd.save();

  res.send(heroToAdd);

}
catch( e){
//res.send(e.errors)
return res.status(500).send(e.message);
}
 
});

//get method in heros
router.get("/", async (req, res) =>
{
  try{
    let heros = await heros.find({name: /^Cap/})
    .sort({name: "asc"})
    .limit(5)
    .select({name: 1, deceased:1});
  res.send(heros);

  }catch(ex)
  {
    return res.status(500).send(ex.message);
  }

});
// end of get method in heros

//get call with id
/*router.get("/:heroId",(req, res)=> {
let userRequestedId = parseInt(req.params.heroId);
let requestedHero = heroesArray.find(h => h.id === userRequestedId);

if(!requestedHero)
{
return res.status(404).send("requested id does not exist on our server");

}

});*/
//end of get call with id

router.put("/:heroId",async (req, res) => {
  let requestedIdToEdit = parseInt(req.params.heroId);
  if (!req.body.likeCount) {
    return res.status(400).send("Request does not contain all values");
  }
  let herosEdit = await Hero.findById(req.params.heroId)
  herosEdit.set({likeCount: req.body.likeCount})
  let heroToEdit = heroesArray.find(h => h.id == requestedIdToEdit);

  if (!heroToEdit) {
    return res.status(404).send("Given Id does not exist");
  }

 // heroToEdit.likeCount = req.body.likeCount;
  //res.send(heroToEdit);
}); 
//first call find by id to the find theobject from the db then update ie

// end of find and update

//delete with hero id
router.delete("/:heroId", (req, res) => {
  let heroToDelete = heroesArray.find(h => h.id == parseInt(req.params.heroId));

  if (!heroToDelete) {
    return res.status(404).send("Given Id does not exist");
  }

  let indexOfHero = heroesArray.indexOf(heroToDelete);
  heroesArray.splice(indexOfHero, 1);
  res.send(heroToDelete);
});
//end of delete with hero id 


module.exports = router;
