import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import React from 'react'

const success = () => {
    const router = useRouter();
    const [cookies] = useCookies()
    const { payment_intent } = router.query;

  // useEffect(() => {
  //   const changeOrderStatus = async () => {
  //     try {
  //       await axios.put(
  //         ORDER_SUCCESS_ROUTE,
  //         { paymentIntent: payment_intent },
  //         { withCredentials: true }
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   if (payment_intent) {
  //     changeOrderStatus();
  //     setTimeout(() => router.push("/buyer/orders"), 5000);
  //   } else {
  //     router.push("/");
  //   }
  // }, [payment_intent, router]);


  return (
    <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
      <h1 className="text-4xl text-center">
        Payment successful. You are being redirected to the orders page.
      </h1>
      <h1 className="text-4xl text-center">Please do not close the page.</h1>
    </div>
  )
}

export default success