import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { UserContextProvider } from "./Context/User.context.jsx";
import Admin from "./pages/Admin.jsx";
import Shop from "./pages/Shop.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import TermsAndConditions from "./components/ExternalPages/TermsAndConditions.jsx";
import RefundPolicy from "./components/ExternalPages/RefundPolicy.jsx";
import Contact from "./components/ExternalPages/Contact.jsx";
import PrivacyStatement from "./components/ExternalPages/PrivacyStatement.jsx";
import Auth from "./components/Auth.jsx";
import Create from "./pages/admin/Create.jsx";
import Update from "./pages/admin/Update.jsx";
import Product from "./pages/shop/Product.jsx";
import Checkout from "./pages/shop/Checkout.jsx";
import Logout from "./pages/Logout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PaymentSuccess from "./pages/shop/PaymentSuccess.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/shop"
          element={
            <UserContextProvider>
              <ScrollToTop />
              <Shop />
            </UserContextProvider>
          }
          children={
            <>
              <Route
                path=":productId"
                element={
                  <>
                    <ScrollToTop />
                    <Product />
                  </>
                }
                children={
                  <>
                    <Route
                      path="checkout"
                      element={
                        <UserContextProvider>
                          <ScrollToTop />
                          <Checkout />
                        </UserContextProvider>
                      }
                    />
                    <Route
                      path="success/:orderId"
                      element={
                        <UserContextProvider>
                          <ScrollToTop />
                          <PaymentSuccess />
                        </UserContextProvider>
                      }
                    />
                  </>
                }
              />
            </>
          }
        />

        <Route
          path="admin"
          element={
            <UserContextProvider>
              <Admin />
            </UserContextProvider>
          }
          children={
            <>
              <Route
                path="add-product"
                element={
                  <UserContextProvider>
                    <Create />
                  </UserContextProvider>
                }
              />
              <Route
                path="update-product/:id"
                element={
                  <UserContextProvider>
                    <Update />
                  </UserContextProvider>
                }
              />
            </>
          }
        />

        <Route
          path="/logout"
          element={
            <UserContextProvider>
              <Logout />
            </UserContextProvider>
          }
        />

        {/* --- External Links --- */}

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyStatement />} />

        <Route path="/auth" element={<Auth />} />

        {/* Catch-all route for any undefined paths (404 page) - This should be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
