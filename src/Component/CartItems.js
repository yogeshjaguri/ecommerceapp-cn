import React from "react";
import Cart from "./Cart";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Styled component for PriceDetail
const PriceDetail = styled.div`
  width: 45%;
  height: fit-content;
  position: sticky;
  top: 20px; /* Adjust this value based on your layout */
  @media only screen and (max-width: 992px) {
    width: 100%;
    top: initial;
    position: relative; /* Reset position on smaller screens */
  }
`;

export default function CartPage() {
  // Redux selectors
  let CartItem = useSelector((state) => state.cart);
  let totalItem = useSelector((state) => state.totalCart);
  
  // Calculate total price and discount
  let totalPrice = CartItem.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);
  
  let totalDiscount = CartItem.reduce((total, item) => {
    return total + (item.price * item.qty * item.discountPercentage) / 100;
  }, 0);

  // Render if cart is empty
  if (CartItem.length === 0)
    return <h1 className="text-center mt-5">Your cart is empty</h1>;

  return (
    <div className="container-sm d-flex flex-column flex-lg-row mt-4 gap-3">
      {/* Cart items */}
      <div className="d-flex flex-column gap-3">
        {CartItem.map((item) => (
          <Cart item={item} key={item.id} />
        ))}
      </div>

      {/* Price detail section */}
      <PriceDetail className="bg-white p-5 d-flex flex-column gap-2">
        <span className="fs-5 pb-2 fw-bold">Price Details</span>

        <div className="d-flex justify-content-between">
          <span>Price ({totalItem} items)</span>
          <span>Rs {Math.floor(totalPrice)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span>Rs {Math.floor(totalDiscount)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Delivery Charges</span>
          <span className="text-success">Free</span>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <h5>Total Amount</h5>
          <span>Rs { Math.floor(totalPrice-totalDiscount)}</span>
        </div>
      </PriceDetail>
    </div>
  );
}
