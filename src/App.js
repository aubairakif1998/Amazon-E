import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51NBlAwHgnzHIdfZgYMHrHZ2sEWFDveihUWREsF4rUro5gqCWlGJilRLiJXT6PtcLvyYo2GyEePlYvoEWawqDxM9J00118WrMVQ"
);
function App() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE AUTH USER >>> ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="">
        <Routes>
          <Route
            exact
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          ></Route>
          <Route
            exact
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          ></Route>
          <Route
            exact
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          ></Route>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
