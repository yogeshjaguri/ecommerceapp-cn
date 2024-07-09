import React from "react";
import { useDispatch } from "react-redux";
import { CartItems } from "../actions";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { updateCart, DeleteCart } from "../actions";

export default function Cart({ item }) {
  const dispatchPlus = useDispatch();
  const dispatchMinus = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchDelete = useDispatch();

  // increase quantity of product
  function handlePlus(item) {
    item.qty += 1;
    dispatchPlus(updateCart(item));
    dispatchTotal(CartItems());
  }

  // decrease quantity of product
  function handleMinus(item) {
    if (item.qty > 1) {
      item.qty -= 1;
      dispatchMinus(updateCart(item));
      dispatchTotal(CartItems());
    }
  }

  // delete product from cart
  function handleCancel(item) {
    dispatchDelete(DeleteCart(item));
    dispatchTotal(CartItems());
  }

  return (
    <>
      {/* items added to Cart  */}
      <div className="d-flex container-sm p-1 bg-white gap-5 shadow-sm border rounded">
        {/* left part  */}
        <img
          src={item.thumbnail}
          alt="error"
          id="card-image"
          style={{ width: "50%", height: "17rem", objectFit: "cover" }}
        />
        {/* right-part  */}
        <div
          className="d-flex flex-column gap-2 justify-content-center"
          style={{ width: "50%" }}
        >
          <span>{item.title}</span>
          <span className="text-success">
            <span className="text-danger"></span> &#8377; {item.price}
          </span>

          <div className="d-flex gap-3 mt-4">
          <CiCirclePlus size={"2rem"}
              onClick={() => handlePlus(item)} />
            
            <span className="border border-1 border-dark px-4">{item.qty}</span>
            <CiCircleMinus  size={"2rem"}
                onClick={() => handleMinus(item)} />
            
          </div>
          <div className="align-self-end m-3 mt-2 ">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCancel(item)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
