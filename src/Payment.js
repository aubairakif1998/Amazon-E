import React, { useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import currencyFormatter from "currency-formatter";
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const Elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = (e) => {};
  return (
    <div className="payment">
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
