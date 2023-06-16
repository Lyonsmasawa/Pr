import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import React, { useEffect } from "react";
import { ORDER_SUCCESS_ROUTE } from "@/utils/constants";
import axios from 'axios'

const success = () => {
  const router = useRouter();
  const [cookies] = useCookies();
  const { payment_intent } = router.query;

  useEffect(() => {
    const changeOrderStatus = async () => {
      try {
        await axios.put(
          ORDER_SUCCESS_ROUTE,
          { paymentIntent: payment_intent },
          { 
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
      575;
    };
    if (payment_intent) {
      changeOrderStatus();
      // console.log(payment_intent)
      setTimeout(() => router.push("/buyer/orders"), 5000);
    } else {
      router.push("/");
    }
  }, [payment_intent, router]);

  return (
    <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
      <h1 className="text-4xl text-center">
        Payment successful. You are being redirected to the orders page.
      </h1>
      <h1 className="text-4xl text-center">Please do not close the page.</h1>
    </div>
  );
};

export default success;
