import { useFormik } from 'formik';
import axios from 'axios';
import userContext from './context';
import {useContext} from 'react'
import { useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

function MyForm() {
  function generateRandomNumber(count, max) {
    if (count === 0) {
      return '';
    }
    let randomNumber = Math.floor(Math.random() * max) + 1;
    return randomNumber.toString() + generateRandomNumber(count - 1, max);
  }
let reference_number = generateRandomNumber(7, 100);
  
function getRandomDate() {
  let date = new Date();
  let year = date.getUTCFullYear();
  let month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  let day = ('0' + date.getUTCDate()).slice(-2);
  let hours = ('0' + date.getUTCHours()).slice(-2);
  let minutes = ('0' + date.getUTCMinutes()).slice(-2);
  let seconds = ('0' + date.getUTCSeconds()).slice(-2);
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
let signed_date_time = getRandomDate();

function generateRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
var transaction_uuid = generateRandomString(15);

  const navigate=useNavigate();
  const data=useContext(userContext);
  const handleCancel = () => {
    
    formik.resetForm();
  
  };

  const formik = useFormik({
    initialValues: { name: '',number:'' ,last:'',st1:'',city:'',st2:'',zip:'',state:'',amount:'',transaction_uuid:'',reference_number:'',signed_date_time:''},
    onSubmit: (values) => {
    
   
      Click();
    },
  
    validate: values => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Required*';
      }
      if(!values.number){
        errors.number='Required*'
      }
      if(!values.last){
        errors.last='Required*'
      }
      if(!values.st1){
        errors.st1='Required*'
      }    
      if(!values.city){
        errors.city='Required*'
      }
      if(!values.st2){
        errors.st2='Required*'
      }
      if(!values.zip){
        errors.zip='Required*'
        
      }
      if(!values.state){
        errors.state='Required*'
      }
      if(!values.amount){
        errors.amount='Required*'
      }
      // else if (
      //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      // ) {
      //   errors.email = 'Invalid email address';
      // }
      return errors;
    },
  });


  async function Click(){
    await axios.post('http://localhost:3002/click',{
    name:formik.values.name,
    number:formik.values.number,
    last:formik.values.last,
    st1:formik.values.st1,
    st2:formik.values.st2,
    zip:formik.values.zip,
    city:formik.values.city,
    state:formik.values.state,
    amount:formik.values.amount,
    transaction_uuid:transaction_uuid,
    reference_number:reference_number,
    signed_date_time:signed_date_time,
  })
    
    .then(res=>{
      console.log(res.data.encodedHmac);
      console.log(res.data);

      
     if(res.data==='Number must not be string') {
     return alert(' Number must not be string')
     }
     if(res.data==='zip code must not be string') return alert('Zip code must not be  string')
     if(res.data==='Name must be string') return alert('Name must be string')
     if(res.data==='Lastname must be in two character') return alert('Lastname must be in two character')
     if(res.data==='Number must be 10 digits') return alert('Number must be 10 digits')
     if(res.data==='Amount must not be string')return alert('Amount must be only Number')
     if(res.data==='State must be string')return alert('State must be string')
     if(res.data==='Amount must be greater than Zero')return alert('Amount must be greater than Zero')
      data.number=res.data.number
          data.last=res.data.last
          data.st1=res.data.st1
          data.name=res.data.name;
          data.st2=res.data.st2
          data.zip=res.data.zip
          data.city=res.data.city
          data.state=res.data.state
          data.amount=res.data.amount
          data.transaction_uuid=res.data.transaction_uuid
          data.reference_number=res.data.reference_number
          data.signed_date_time=res.data.signed_date_time
          data.encodedHmac=res.data.encodedHmac
      return    navigate('/hi')    
    })
  
   } 
  return (
    <div className='box'>
     <div className='Heading'>
     <h1>cybersource</h1>
     <div class="vl"></div>
     <h5>Payment gateway</h5>
     <h4>User Details</h4>
     </div>




    <form onSubmit={formik.handleSubmit}>





    <div className='box1'>



<div className='Labels'>

     
         <label id='fname'>FirstName<sup>*</sup></label>
         <br></br>
      <input
        type="text"
        name="name"
        placeholder= {formik.errors.name}
        value={formik.values.name}
        onChange={formik.handleChange}
        
      />
    
      
      {/* {formik.errors.name ?  <span className='er'>{formik.errors.name}</span> : null} */}
      {/* <br></br> */}
      



      <br></br>
      {/* <label>LastName*</label> */}
      <label id='fname'>LastName<sup>*</sup></label>
      <br></br>
      <input
        type="text"
        name="last"
        placeholder={formik.errors.last}
        value={formik.values.last}
        onChange={formik.handleChange}
      />
      
      {/* {formik.errors.last?  <span className='er'>{formik.errors.last}</span> : null} */}

      <br></br>
      <label id='Number'>Number<sup>*</sup></label>
      <br></br>
      <input
        type="text"
        name="number"
        placeholder={formik.errors.number}
        // pattern="[0-9]*"
        value={formik.values.number}
        onChange={formik.handleChange}
      />
      
      {/* {formik.errors.number ? <span className='er'>{formik.errors.number}</span> : null} */}

<br></br>
      <label id='Address'>Street Address 1<sup>*</sup></label>
      <br></br>
      <input
        type="text"
        name="st1"
        placeholder= {formik.errors.st1}
        value={formik.values.st1}
        onChange={formik.handleChange}
      />
     
      
      {/* {formik.errors.st1 ? <span className='er'> {formik.errors.st1}</span> : null} */}

      <br></br>

      <label id="Amount" >Amount<sup>*</sup></label>
         <br></br>
      <input
        type="text"
        name="amount"
        placeholder={formik.errors.amount}
        value={formik.values.amount}
        onChange={formik.handleChange}
      />
   
      {/* {formik.errors.amount ?  <span className='er'>{formik.errors.amount}</span> : null} */}

      </div>
      </div>
    <div className='box2'    >
      <label id="Email">Email<sup>*</sup> </label>
      <br></br>
      <input
        type="email"
        name="st2"
       
        placeholder={formik.errors.st2}
        value={formik.values.st2}
        onChange={formik.handleChange}
      />
     
      {/* {formik.errors.st2 ? <span className='er'>{formik.errors.st2}</span> : null} */}

      <br></br>
      <label id="City">City<sup>*</sup></label>
      <br></br>
      <input
        type="text"
        name="city"
        placeholder={formik.errors.city}
        value={formik.values.city}
        onChange={formik.handleChange}
      />
      
      {/* {formik.errors.city ? <span className='er'>{formik.errors.city}</span> : null} */}

   
      <br></br>
      <label id="Zip">Zip Code<sup>*</sup></label>
      <br></br>
      <input
        type="text"
        name="zip"
        placeholder={formik.errors.zip}
        value={formik.values.zip}
        onChange={formik.handleChange}
      />
   
      {/* {formik.errors.zip ? <span className='er'>{formik.errors.zip}</span> : null} */}


      <br></br>
      <label id="State">State<sup>*</sup></label>
      <br></br>
      <input
        type="text"
        name="state"
        placeholder={formik.errors.state}
        value={formik.values.state}
        onChange={formik.handleChange}
      />
   
      {/* {formik.errors.state ? <span className='er'>{formik.errors.state}</span> : null} */}
      {/* <br></br> */}
      {/* <input type="submit" value="Submit" className='but' ></input> */}




    <input type="hidden" name="access_key" value="ca221567786535c299c981e376f07ba6"></input>
    <input type="hidden" name="profile_id" value="762341B9-404C-4D82-B64F-AF7CB28BB104"></input>
    


<br></br>

    
      <Button className='cancelbutton' type="button" onClick={handleCancel}>Clear</Button>
      <button  className='but'>Submit</button>
</div>
    </form>






   


   </div>
  );
}


export default MyForm;