import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/header";
import { store } from "./store";
import RouterConfig from "./router";

import "@/assets/styles/index.css";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <BrowserRouter>
        <Suspense fallback={<div>加载中</div>}>
          <RouterConfig />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
