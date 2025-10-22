// global services.js file

// payment service toggle
let paymentServiceEnabled = false;
export const togglePaymentService = async (bool) => {
  paymentServiceEnabled = bool;
};
export const isPaymentServiceEnabled = () => paymentServiceEnabled;
