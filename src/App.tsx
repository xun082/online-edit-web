import React, { Suspense } from "react";
import RouterConfig from "./router";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import { Provider } from "react-redux";
import { store } from "./store";

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
