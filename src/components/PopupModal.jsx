"use client";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
export default function PopUpModal(data) {
  const { couponCode, finalAmt } = data;
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  console.log(props);
  const handlePayment = () => {
    axios
      .post(
        "http://localhost:3000/coupon/confirm",
        { couponCode, finalAmt, userId: "64e5fd10325d2bf83ed25b2a" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("sent successfully");
      });
  };
  return (
    <>
      <Button
        onClick={() => props.setOpenModal("pop-up")}
        className="btn btn-active btn-primary mt-10"
      >
        Proceed to Payment
      </Button>
      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  handlePayment();
                  props.setOpenModal(undefined);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
