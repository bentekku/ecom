// SingleProductPage.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SingleProductPage from "../pages/SingleProductPage";
import cartReducer, {
  fetchProductDetails,
  addToCart,
} from "../src/slices/cartSlice";

// Set up the mock adapter for Axios
const mock = new MockAdapter(axios);

// Mock Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Test case for purchasing a product
test("should add product to the cart", async () => {
  // Mock product details response
  const mockProduct = {
    _id: "1",
    name: "Test Product",
    price: 100,
    imgURL: "http://example.com/image.jpg",
    description: "This is a test product.",
    color: ["Red", "Blue"],
  };

  // Mock the API responses
  mock.onGet(`/api/products/1`).reply(200, mockProduct);
  mock.onPost("/api/orders/add").reply(200);

  render(
    <Provider store={store}>
      <SingleProductPage />
    </Provider>
  );

  // Wait for product details to load and display
  expect(await screen.findByText("Test Product")).toBeInTheDocument();

  // Simulate selecting a color and quantity change
  fireEvent.change(screen.getByLabelText("Color:"), {
    target: { value: "Red" },
  });
  fireEvent.click(screen.getByText("+"));

  // Simulate adding the product to the cart
  fireEvent.click(screen.getByText("Add to cart"));

  // Check if the add to cart request was made
  await waitFor(() => {
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe("/api/orders/add");
    expect(mock.history.post[0].data).toContain("quantity=2");
    expect(mock.history.post[0].data).toContain("color=Red");
  });

  // Optionally, you could also check if Redux state is updated correctly
  // const state = store.getState();
  // expect(state.cart.itemsInCart).toHaveLength(1);
  // expect(state.cart.itemsInCart[0].name).toBe("Test Product");
});
