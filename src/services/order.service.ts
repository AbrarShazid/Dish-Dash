import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const orderService = {
  createOrder: async function (payload: any) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const orderCreate = await res.json();

      if (orderCreate.success === true) {
        return { data: orderCreate.data, error: null };
      }

      return {
        data: null,
        error: { message: orderCreate.message || "Failed to create order" },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

//get all order for admin 

getAllOrder:async function (){

  try {

    const cookieStore=await cookies()
    const res=await fetch(`${BACKEND_URL}/order/all-order`,{
      headers:{
        Cookie:cookieStore.toString()
      }
      ,
      cache:"no-store"
    })

    const allOrder=await res.json()

    if(allOrder.success===true){
      return {data:allOrder.data,error:null}
    }
     return {
        data: null,
        error: {
          message: allOrder.message || "Failed to fetch order details!",
        },
      };

    
  } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
},


  getMyOrder: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/order/my-orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const allOrder = await res.json();

      if (allOrder.success === true) {
        return { data: allOrder.data, error: null };
      }
      return {
        data: null,
        error: {
          message: allOrder.message || "Failed to fetch order details!",
        },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  getOrderDetails: async function (orderId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/order/details/${orderId}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const orderDetails = await res.json();

      if (orderDetails.success === true) {
        return { data: orderDetails.data, error: null };
      }

      return {
        data: null,
        error: {
          message: orderDetails.message || "Failed to fetch order details!",
        },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },

  updateOrderStatus: async function (orderId: string, status: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${BACKEND_URL}/order/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      });

      const result = await res.json();

      if (result.success === true) {
        return { data: result.data, error: null };
      }

      return {
        data: null,
        error: {
          message: result.message || "Failed to update order status!",
        },
      };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong!" } };
    }
  },
};
