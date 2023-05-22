import {
  legacy_createStore,
  bindActionCreators as _bindActionCreators,
  combineReducers,
  applyMiddleware,
} from "redux";

import reduxLogger from "redux-logger";

const createStore = legacy_createStore;
// 4) Actions
const CAKE_ORDERED = "CAKE_ORDERED"; //type property
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

const bindActionCreators = _bindActionCreators;
// const { legacy_createStore } = require("redux");

const logger = reduxLogger.createLogger();

function orderCake() {
  //--->Action Creater function "orderCake()"
  //Action creator is a function that returns an object
  //
  return {
    type: CAKE_ORDERED, //-> Action
    payload: 1,
  };
  //
}

function restockCake(qnt = 1) {
  // This action creator is for restockig the cakes.
  return {
    type: CAKE_RESTOCKED,
    payload: qnt,
  };
}
// State  (acc to redux the application state should be a single object)

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

const initialState = { numberOfCakes: 10, numOfIcecreams: 20 };

// Reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    // If there are more than one property , we must use spread operator
    //otherwise only the updated value is present in updated state

    case CAKE_RESTOCKED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };
    //Ice creams logic
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      };

    default:
      return state;
  }
};

//Todo : For mulitiple reducers

const cakesInitialState = { numberOfCakes: 10 };
const iceCreamsInitialState = { numberOfIcecreams: 20 };

// Reducers

const cakeReducer = (state = cakesInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };

    default:
      return state;
  }
};

const icecreamReducer = (state = iceCreamsInitialState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams + action.payload,
      };

    default:
      return state;
  }
};

// combining multiple reducer into a single reducer.
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: icecreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger)); //We are creating a redux store here
console.log("Initial State", store.getState()); // intial State

const unsubscribe = store.subscribe(() => {});
// whenever the store updates this line gets executed

// store.dispatch(orderCake()); // noOfcakes : 9
// store.dispatch(orderCake()); // noOfcakes : 8
// store.dispatch(orderCake()); // noOfcakes : 7
// restocking cake
// store.dispatch(restockCake(3)); // noOfcakes : 10

const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(4);

actions.orderIcecream();
actions.orderIcecream();

actions.restockIcecream(2);
unsubscribe();
//we are simply unsubscribing here
