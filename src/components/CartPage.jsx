import { useContext, useRef, useState } from "react";
import { MyContext } from "../contexts/MyContext";
import PopUpModal from "./PopupModal";
import axios from "axios";
import ScrollToTopButton from "./ScrollUp";
import { useEffect } from "react";
const CartPage = () => {
  const { myState, setMyState } = useContext(MyContext);
  const [couponCode, setCouponCode] = useState(null);
  const [popUp, setPopUp] = useState(null);
  const [finalAmt, setFinalAmt] = useState(null);
  const [done, setDone] = useState(false);
  const couponCurrValue = useRef();
  const calculateAmount = () => {
    let sum = 0;
    myState.forEach((item) => (sum = sum + item.price));
    return sum;
  };
  let sum = 0;
  const mySet = new Set(myState);
  const newArr = [...mySet];

  let handleVerify = () => {
    const details = {
      userId: "64e5fd10325d2bf83ed25b2a",
      couponCode: couponCode,
      quantity: myState.length,
      totalAmount: calculateAmount(),
      productIdList: myState.map((item) => {
        return item.id;
      }),
    };

    axios
      .post("http://localhost:3000/coupon/verify", details, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setPopUp("success");
          console.log(response.data.finalAmount);
          setFinalAmt(response.data.finalAmount);
        } else {
          setPopUp("failure");
          setTimeout(() => {
            setPopUp("nothing");
          }, 10);
        }
      })
      .catch((error) => {
        setPopUp("failure");
        setTimeout(() => {
          setPopUp("nothing");
        }, 10);
        console.error(error);
      });
  };

  let handleRedeem = () => {
    console.log(couponCode);
    const details = {
      userId: "64e5fd10325d2bf83ed25b2a",
      couponCode: couponCode,
      totalAmount: calculateAmount(),
      productIdList: myState.map((item) => {
        return item.id;
      }),
    };
    axios
      .post("http://localhost:3000/coupon/confirm", details, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          console.log("Money has been deducted :)");
        }
        console.log(response.data);
        setDone(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mt-16 text-left mb-5">Your cart</h1>
      <ScrollToTopButton />
      <div className="flex">
        {console.log(couponCode)}
        <div className="w-3/4">
          {newArr.map((items, index) => {
            return (
              <div className="flex mb-8">
                <img src={items.img} className="w-1/4 rounded-lg" />
                <div className="w-full text-left ml-16">
                  <p className="text-xl font-bold mb-5">{items.name}</p>

                  <p className="text-md font-bold">
                    Total Price:{" "}
                    <span className="font-light">{items.price}</span>
                  </p>
                  <p className="text-md font-bold">
                    Quantity:{" "}
                    <span className="font-light">
                      {myState.filter((x) => x == items).length}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}

          <div className="text-left mt-10">
            <p className="text-lg font-bold ">Have a coupon code ?</p>
            <input
              type="text"
              ref={couponCurrValue}
              placeholder="Type here"
              className="input mr-5 input-bordered input-error w-full max-w-xs"
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className="btn btn-warning"
              onClick={() => {
                handleVerify();
              }}
            >
              Redeem coupon
            </button>
            {popUp === "success" ? (
              <div className="bg-accent p-5 rounded-xl mt-10 text-white mr-10 w-80">
                Coupon Verified !!!
              </div>
            ) : (
              <> </>
            )}
            {popUp === "failure" ? (
              <div className="bg-error p-5 rounded-xl mt-10 text-white mr-10 w-80">
                Coupon code is invalid !!!
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="w-1/4">
          <div className="bg-base-200 rounded-lg p-3">
            <p className="text-2xl font-semibold">Grand Total</p>
            <p className="text-md mt-8 font-bold">
              Total ({myState.length} items):{" "}
              {myState
                .map((x) => parseInt(x.price))
                .forEach((element) => {
                  sum = sum + element;
                })}{" "}
              {sum}
            </p>
            {popUp == "success" ? (
              <p className="text-md mt-3 font-bo mr-10">
                Price after Discount: <strong>{finalAmt}</strong>
              </p>
            ) : null}
            {/*  Modal Button  */}
            <button
            // className="btn btn-active btn-primary mt-10"
            >
              <PopUpModal
                couponCode={couponCode}
                finalAmount={finalAmt}
                handleRedeem={handleRedeem}
              />
            </button>
          </div>

          {done ? (
            <div className="bg-warning p-5 rounded-xl mt-10 text-black w-full mr-10">
              Payment successful !!!
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
