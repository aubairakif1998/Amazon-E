import React from "react";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  let val = 0;

  const calculate = () => {
    val = basket.reduce(
      (accumulator, element) => accumulator + element.price,
      0
    );
  };

  // Call the calculate function to calculate the total price
  calculate();

  return (
    <div className="subtotal">
      <>
        {" "}
        <p>
          Subtotal ({basket?.length} items):
          <strong> $ {val} </strong>
        </p>
        <small className="subtotal__gift">
          <input type="checkbox" /> This order contains a gift
        </small>{" "}
      </>
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
