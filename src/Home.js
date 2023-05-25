import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="home__Container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id={12121313212}
            title="The lean start"
            price={23.33}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5}
          />
          <Product
            id={44343434}
            title="Samsung curved LED"
            price={122.33}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SY466_.jpg"
            rating={5}
          />

          {/* <Product />
          <Product /> */}
        </div>
        <div className="home__row">
          <Product
            id={99999}
            title="The lean start"
            price={23.33}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5}
          />
          <Product
            id={12324368876869869}
            title="Samsung curved LED"
            price={122.33}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SY466_.jpg"
            rating={5}
          />
          <Product
            id={9844343476}
            title="Ipad / Iphone INC"
            price={223.33}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
            rating={5}
          />
        </div>
        <div className="home__row">
          {" "}
          <Product
            id={43236532652636215361}
            title="Samsung LC 49, Curved LED Gaming Monitor"
            price={23.33}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
