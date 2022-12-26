import {Router} from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();

router.delete("/cards",(req,res)=>{
    ScoreCard. deleteMany({},()=>{
        console.log("Database deleted");
        res.json({message:"Database cleared."})
    });   
});
router.post("/card",(req,res)=>{
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    console.log('post command called',name);
    ScoreCard.findOneAndUpdate({name:name, subject:subject}, {name:name, subject:subject, score:score}, {upsert:true}, 
        function(err,obj) { 
        console.log('obj',obj); 
        if(!obj){
            console.log("object doesn't exist. create object.")
            res.json({message:"Adding ("+name+" , "+subject+" , "+score+")", card:1})
        }
        else{
            console.log('object already exists.')   
            res.json({message:"Updating ("+name+" , "+subject+" , "+score+")", card:1})
        }
    });
});
router.get("/cards",(req,res)=>{
    console.log('find '+req.query.type+':'+req.query.queryString)
    if(req.query.queryString){
       if(req.query.type === 'name'){
            console.log('find name '+req.query.queryString);
            const messages=[];
            ScoreCard.find({name:req.query.queryString},function(err,obj){
                if(obj.length){
                    console.log('find using name',obj,'type'+typeof(obj),'length'+obj.length);
                    for(let i=0; i<obj.length; i++){
                        messages[i] = 'Found card with name: ('+obj[i].name+', '+obj[i].subject+', '+obj[i].score+')'
                        console.log('Found card with name: ('+obj[i].name+', '+obj[i].subject+', '+obj[i].score+')');
                    }
                    console.log('messages returned', messages);
                    res.json({messages:messages});
                }
                else{
                    res.json({message:'name ( '+req.query.queryString+' ) not found ;-;'});
                }
            });
        } 
        else{
            console.log('find subject '+req.query.queryString);
            const messages=[];
            ScoreCard.find({subject:req.query.queryString},function(err,obj){
                if(obj.length){
                    console.log('find using subject',obj,'type'+typeof(obj),'length'+obj.length);
                    for(let i=0; i<obj.length; i++){
                        messages[i] = 'Found card with subject: ('+obj[i].name+', '+obj[i].subject+', '+obj[i].score+')'
                        console.log('Found card with subject: ('+obj[i].name+', '+obj[i].subject+', '+obj[i].score+')');
                    }
                    console.log('messages returned', messages);
                    res.json({messages:messages});
                }
                else{
                    res.json({message:'subject ( '+req.query.queryString+' ) not found ;-;'});
                }
            });
        }
    }  
});

export default router;

