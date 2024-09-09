import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/404";
// import Order from "./pages/Order";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";

// react router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleProductPage from "./pages/SingleProductPage";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<SingleProductPage />} />
            {/* <Route path="/order" element={<Order />} /> */}

            {/* 404 route for any unmatched paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
