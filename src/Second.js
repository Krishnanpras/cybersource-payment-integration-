import React, { useContext } from 'react'
import userContext from './context'
import { useNavigate } from 'react-router-dom';
function Second() {
  const navigate = useNavigate();
  var data = useContext(userContext)

  var access_key = "8d56a4f1766d3d34b733ab223c4534ad"
  var profile_id = "816342CC-59F4-4996-9810-1C1A34387E9D"
  return (
    <div >

      <div className='Heading'>
        <h1>cybersource</h1>
        <div class="vl"></div>
        <h5>Payment gateway</h5>
        <h2>Confirmation Page</h2>
      </div>
      <div className='box3'>
        <div className='insidetext'>
          <table >
            <thead>
              <tr>
                <th className='First'>FIELDS</th>
                <th className='Second'>DETAILS</th>
              </tr>

            </thead>
            <tbody>
              <tr>
                <td>FirstName </td>
                <td className='in'>{data.name}</td>
              </tr>
              <tr>
                <td>Number</td>
                <td className='in'>{data.number}</td>
              </tr>
              <tr>
                <td>LastName</td>
                <td className='in'>{data.last}</td>
                <td></td>
              </tr>
              <tr>
                <td>Address1</td>
                <td className='in'>{data.st1}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td className='in'>{data.st2}</td>
              </tr>
              <tr>
                <td>City</td>
                <td className='in'>{data.city}</td>
              </tr>
              <tr>
                <td>State</td>
                <td className='in'>{data.state}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td className='in'>{data.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <form id="payment_confirmation" action="https://testsecureacceptance.cybersource.com/pay" method="post">
          <input type="hidden" id="access_key" name="access_key" value={access_key}></input>
          <input type="hidden" id="profile_id" name="profile_id" value={profile_id}></input>
          <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={data.transaction_uuid}></input>
          <input type="hidden" id="signed_field_names" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code"></input>
          <input type="hidden" id="unsigned_field_names" name="unsigned_field_names" value=""></input>
          <input type="hidden" id="signed_date_time" name="signed_date_time" value={data.signed_date_time}></input>
          <input type="hidden" id="locale" name="locale" value="en"></input>
          <input type="hidden" id="transaction_type" name="transaction_type" value="authorization"></input>
          <input type="hidden" id="reference_number" name="reference_number" value={data.reference_number}></input>
          <input type="hidden" id="amount" name="amount" value={data.amount}></input>
          <input type="hidden" id="currency" name="currency" value="USD"></input>
          <input type="hidden" id="payment_method" name="payment_method" value="card"></input>
          <input type="hidden" id="bill_to_forename" name="bill_to_forename" value={data.name}></input>
          <input type="hidden" id="bill_to_surname" name="bill_to_surname" value={data.last}></input>
          <input type="hidden" id="bill_to_email" name="bill_to_email" value={data.st2}></input>
          <input type="hidden" id="bill_to_phone" name="bill_to_phone" value={data.number}></input>
          <input type="hidden" id="bill_to_address_line1" name="bill_to_address_line1" value={data.st1}></input>
          <input type="hidden" id="bill_to_address_city" name="bill_to_address_city" value={data.city}></input>
          <input type="hidden" id="bill_to_address_state" name="bill_to_address_state" value={data.state}></input>
          <input type="hidden" id="bill_to_address_country" name="bill_to_address_country" value="US"></input>
          <input type="hidden" id="bill_to_address_postal_code" name="bill_to_address_postal_code" value={data.zip}></input>
          <input type="hidden" id="signature" name="signature" value={data.encodedHmac}></input>
          <div className='button'>
            < button className='Navigatebutton' onClick={() => { navigate("/") }}  >Go back</button>
            <button className='but3'       >Submit</button>

          </div>
        </form>
      </div>
    </div>
  );
}
export default Second;