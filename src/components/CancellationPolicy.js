import React from 'react';
import "../styles/TermsAndConditions.css";
import { shades } from '../helper/shades';
import { Grid } from '@mui/material';
import Navbar from './Navbar';

export default function CancellationPolicy() {
  const { dustyOrange } = shades;
  
  return (
    <Grid
    sx={{
      minHeight: { xs: "fit-content", md: "50vh" },
      width: "100%",
      background: dustyOrange,
      padding: { xs: "36px 24px", md: "50px 32px 32px 32px" },
    }}
  >
   
    <div className='body'>
      <div className="text-black ms-20 me-20 mb-40 mt-10 mx-auto">
        <h1 className="text-3xl font-bold mb-4">Cancellation Policy</h1>

        <p>Last Updated: 21-02-2024</p>
        <p className="mb-8">We understand that sometimes plans change. Our cancellation policy is designed to be fair to both clients and freelancers using our platform. Please read the following terms carefully:</p>

        <h2 className="text-xl font-bold mb-4">Cancellation by Clients</h2>
        <p className="mb-8">Clients may request cancellation of a project or milestone after acceptance. However, the request for cancellation must be made to the admin. Once a project is accepted, clients cannot directly cancel it.</p>
        
        <h2 className="text-xl font-bold mb-4">Refund Eligibility</h2>
        <p className="mb-8">- Refunds, if applicable, will be processed after the admin reviews and approves the cancellation request. Refund eligibility depends on the circumstances and our platform's policies.</p>
        <p className="mb-8">- If the cancellation request is approved, the refund may be full or partial, depending on the admin's decision.</p>

        <h2 className="text-xl font-bold mb-4">Cancellation by Freelancers</h2>
        <p className="mb-8">Freelancers cannot cancel a project once it is accepted. Any concerns or requests for cancellation should be communicated to the admin for review and action.</p>

        <h2 className="text-xl font-bold mb-4">Refund Processing Time</h2>
        <p className="mb-8">- Refunds, if applicable, will be processed within [X] business days upon approval of the cancellation request by the admin.</p>
        <p className="mb-8">- Please note that the refund may take additional time to reflect in the client's account depending on the payment method and banking institution.</p>

        <h2 className="text-xl font-bold mb-4">Money Transfer</h2>
        <p className="mb-8">Upon completion of the project and acceptance by the client, the funds from the client's wallet will be transferred to the freelancer's account.</p>

        <h2 className="text-xl font-bold mb-4">Exceptions</h2>
        <p className="mb-8">- In exceptional circumstances such as disputes or unforeseen events, the admin may consider exceptions to our cancellation policy. Please contact us directly to discuss your situation.</p>

        <h2 className="text-xl font-bold mb-4">No-shows</h2>
        <p className="mb-8">- Failure to proceed with the project as agreed upon may result in penalties or negative consequences on our platform for the freelancers involved.</p>

        <h2 className="text-xl font-bold mb-4">Reservation Guarantee</h2>
        <p className="mb-8">- Commitment to a project or milestone is only guaranteed upon acceptance by both the client and the freelancer, as well as completion of payment or a valid booking deposit.</p>

        <p className="mt-8">By using our platform, you agree to abide by our cancellation policy outlined above.</p>
      </div>
    </div>
    </Grid>
  );
}
