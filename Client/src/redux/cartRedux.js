import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let find = state.products.findIndex(
        (item) =>
          //combine if same id,size,color else create new cart product
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (find >= 0) {
        state.products[find].quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeCartItem: (state, action) => {
      const deleteIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (deleteIndex >= 0) {
        if (state.products.length === 1) {
          //last product remove and reset products
          state.products = [];
        } else {
          //remove selected product
          state.products.splice(deleteIndex, 1);
        }
      }
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    reduceCartQuantity: (state, action) => {
      const reduceIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (reduceIndex >= 0) {
          state.products[reduceIndex].quantity-=1;
      }
      state.total -= action.payload.price;
    },
    addCartQuantity: (state, action) => {
      const addIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item._id === action.payload._id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (addIndex >= 0) {
          state.products[addIndex].quantity+=1;
      }
      state.total += action.payload.price;
    },
    clearCart: (state) => {
        state.products = [];
        state.quantity = 0;
        state.total = 0;
    }
  },
});

export const { addProduct, removeCartItem, reduceCartQuantity, addCartQuantity , clearCart} = cartSlice.actions;
export default cartSlice.reducer;
