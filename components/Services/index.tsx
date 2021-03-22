import React from "react";
import { IconContext } from "react-icons";
import {
  MdAttachMoney,
  MdLocalShipping,
  MdCreditCard,
  MdThumbUp,
} from "react-icons/md";

const Services = () => {
  return (
    <IconContext.Provider value={{ color: "gray", size: "5em" }}>
      <div className="services">
        <div className="services__card">
          <MdAttachMoney />
          <h1>Pricing</h1>
          <p>Find the best prices</p>
        </div>
        <div className="services__card">
          <MdLocalShipping />
          <h1>Free Shipping</h1>
          <p>Forget about shipping payment</p>
        </div>
        <div className="services__card">
          <MdCreditCard />
          <h1>Credit card</h1>
          <p>Pay with credit card</p>
        </div>
        <div className="services__card">
          <MdThumbUp />
          <h1>Trusted</h1>
          <p>Over 50 years in the market</p>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Services;
