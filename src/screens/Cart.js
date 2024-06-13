import React, { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import PaymentSuccessModal from '../components/PaymentSuccessModal';
export default function Cart() {
  const data = useCart();
  const datacopy = data;
  let dispatch = useDispatchCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  const currency = "INR";
  const receiptId = "qwsaq1";

  const handleCheckOut = async (e) => {
    let userEmail = localStorage.getItem("userEmail");

    const response1 = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount: (totalPrice * 100),
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response1.json();
    console.log(order);

    var options = {
      key: "rzp_test_PUELDdEhSMqwwt",
      amount: (totalPrice * 100),
      currency,
      name: "Mr.Rollwala",
      description: "Food Order ",
      order_id: order.id,
      handler: async function (response1) {
        const body = {
          ...response1,
        };
        const validateResponse = await fetch("http://localhost:5000/order/validate", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonresponse = await validateResponse.json();
        if(jsonresponse.msg="success")
        {
          alert("Payment SuccessFull")
          window.location.href = "/"; // Redirect to main page
        }
        else
        {
          alert("Payment Unsuccessful!");
          window.location.href = "/"; // Redirect to main page
        }
        console.log(jsonresponse);
      },
      prefill: {
        name: userEmail,
        email: userEmail,
        contact: "9000000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // payment Part Done Above
    // Access USername
    const response3 = await fetch('http://localhost:5000/api/auth/getusername', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail })
  });
  const data1 = await response3.json();
  const username=data1;
  

      
    const response2 = await fetch("http://localhost:5000/api/auth/invoice", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name:username,
        email: userEmail,
        order_data: data,
        total_price: totalPrice,
        order_date: new Date().toDateString()
      })
    });

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.success", async function (response) {
      setShowSuccessModal(true);
      window.location.href = "/"; // Redirect to main page
    });
    rzp1.on("payment.failed", function (response) {
      alert("Payment failed. Please try again.");
      window.location.href = "/"; // Redirect to main page
    });
    rzp1.open();
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: datacopy,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });


    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  return (
    <div>
       <PaymentSuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><Delete /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}> Order Now </button>
        </div>
      </div>
     
    </div>
  )
}
