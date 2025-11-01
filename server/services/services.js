// global services.js file

let paymentServiceEnabled = false;

// payment service toggle
export const togglePaymentService = async (bool) => {
  paymentServiceEnabled = bool;
};
export const isPaymentServiceEnabled = () => paymentServiceEnabled;
