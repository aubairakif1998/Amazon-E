import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import currencyFormatter from "currency-formatter";
import axios from "./axios";
import { db } from "./firebase";
function Payment() {
  const [clientSecret, setClientSecret] = useState(true);
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${
          basket.reduce(
            (accumulator, element) => accumulator + element.price,
            0
          ) * 100
        }`,
      }).catch((error) => {
        alert("Server issue: " + error.message);
      });
      if (response !== undefined) {
        setClientSecret(response.data.clientSecret);
      }
    };
    getClientSecret();
  }, [basket]);

  console.log("THE CLIENT SECRET IS >>>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log(payload);
    if (payload.error) {
      setError(payload.error.message);
      setProcessing(false);
    } else {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(payload.paymentIntent.id)
        .set({
          basket: basket,
          amount: payload.paymentIntent.amount,
          created: payload.paymentIntent.created,
        })
        .then(() => {
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          dispatch({
            type: "EMPTY_BASKET",
          });
          navigate("/orders", { replace: true });
        });
    }
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  // firebase emulators:start
  return (
    <div className="payment">
      {clientSecret === true ? (
        <button
          style={{
            display: "flex",
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            color: "black",
            fontSize: "20px",
          }}
          className="btn btn-primary"
          type="button"
          disabled
        >
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Loading...</span>
        </button>
      ) : (
        <div className="payment__container">
          <h1>
            Checkout (<Link to="/checkout">{basket?.length} items</Link>)
          </h1>
          <div className="payment__section">
            <div className="payment__title">
              <h3>DeliveryAddress</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>123 React ALane</p>
              <p> Bahria, Lahore</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <h3>
                    Order Total:{" "}
                    {currencyFormatter.format(
                      basket?.reduce(
                        (accumulator, element) => accumulator + element.price,
                        0
                      ),
                      { locale: "en-US" }
                    )}
                  </h3>
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy No"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
