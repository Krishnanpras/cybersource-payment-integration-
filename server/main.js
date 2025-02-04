const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');       
const crypto = require('crypto');
// const queryString = require('query-string');

require('dotenv').config();
const axios = require('axios');

const access_key=process.env.access_key
const profile_id=process.env.profile_id
const secret_id=process.env.secret_id

// import CryptoJS from 'crypto-js';
// var configuration = require('./Configuration.js');


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/click',(req,res)=>{
    const name=(req.body.name)
    const number=Number(req.body.number)

    const last=req.body.last
    const st1=req.body.st1
    const st2=req.body.st2
    const zip=Number(req.body.zip)
    const city=req.body.city
    const state=req.body.state
    const amount=Number(req.body.amount)
    
//     const refer=req.body.refer
//     const tran=req.body.tran
// const date=req.body.date

    const transaction_uuid=req.body.transaction_uuid
    const reference_number=req.body.reference_number
    const signed_date_time=req.body.signed_date_time

    // const v=number.length;


    // console.log(number)
    if(!Number.isFinite(number)){
        return res.send('Number must not be string')
    }
    if(!Number.isFinite(zip)){
        return res.send('zip code must not be string')
    }

    const re = /^[a-zA-Z]+$/;
    if (!re.test(name)) {
      res.send('Name must be string');
    }
// if(number.length<10){
// res.(number.length)
// }

if(number.toString().length>10||number.toString().length<10){
    res.send('Number must be 10 digits')
}

if(!Number.isFinite(amount)){
    return res.send('Amount must not be string')
} 
if(amount<=0){
    res.send('Amount must be greater than Zero')
}




const sta = /^[a-zA-Z]+$/;
    if (!sta.test(state)) {
      res.send('State must be string');
    }



    // const re1 = /^[a-zA-Z]{2}$/;
    // if (!re1.test(last)) {
    //   res.send('Lastname must be in two character');
    // }

    // const re2 = /^[a-zA-Z]{2}$/;
    // if (!re2.test(state)) {
    //   res.send('state must be in two character');
    // }





    const message=`access_key=${access_key},profile_id=${profile_id},transaction_uuid=${transaction_uuid},signed_field_names=access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,unsigned_field_names=,signed_date_time=${signed_date_time},locale=en,transaction_type=authorization,reference_number=${reference_number},amount=${amount},currency=USD,payment_method=card,bill_to_forename=${name},bill_to_surname=${last},bill_to_email=${st2},bill_to_phone=${number},bill_to_address_line1=${st1},bill_to_address_city=${city},bill_to_address_state=${state},bill_to_address_country=US,bill_to_address_postal_code=${zip}`;
    const secret=secret_id
    // console.log(message);
 

    const hmac = crypto.createHmac('sha256', secret);
    // Update the HMAC instance with the message to be hashed
    hmac.update(message);
    // Compute the HMAC hash of the message
    const hmacHash = hmac.digest();
    // Encode the HMAC hash in base64
    const encodedHmac = hmacHash.toString('base64');


     return res.send({name,number,last,st1,st2,zip,city,state,amount,encodedHmac,transaction_uuid,reference_number,signed_date_time,access_key,profile_id,secret_id})
    
})
app.post('/last',(req,res)=>{

// const s=JSON.par(res) 
// res.send(s)
console.log(req.body);
// res.send(req.body.decision)
const decision=req.body.decision;
var message
if(decision=='ERROR'){
// res.send("")
message="Payment failed !"
}
else{
//   res.send("Payment has been completed")
// res.redirect('http://localhost:3000/last')
 message = 'Payment has been completed';


}
const redirectUrl = `http://localhost:3000/last?message=${encodeURIComponent(message)}`;
res.redirect(redirectUrl);
})













app.listen(3002,()=>{
    console.log("Running the port 3002");
})
