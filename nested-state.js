import { legacy_createStore as createStore, bindActionCreators } from "redux";
import { produce } from "immer";

const initialState = {
  name: "Santhosh",
  address: {
    street: "Maheshware Nagar",
    city: "Nellore",
    state: "Andhra Pradesh",
  },
};

const UPDATE_STREET = "UPDATE_STREET";

const updateStreet = (street) => {
  return {
    type: UPDATE_STREET,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STREET:
      // without Immer
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };

      //   With Immer

      return produce(state, (draftCopyOfTheState) => {
        draftCopyOfTheState.address.street = action.payload;
      });

    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Updated State", store.getState());
});

store.dispatch(updateStreet("Maheshwari Nagar"));

unsubscribe();
