import React, { Component } from "react";
import emptyCart from '../static/images/empty-cart.png' 

const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <img
        src={emptyCart}
        alt="empty-cart"
      />
      <h2>You cart is empty!</h2>
    </div>
  );
};

export default EmptyCart;
