import React, { Suspense } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/header";
import { store } from "./store";
import RouterConfig from "./router";

import "@/assets/styles/index.css";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <HashRouter>
        <Suspense fallback={<div>加载中</div>}>
          <RouterConfig />
        </Suspense>
      </HashRouter>
    </Provider>
  );
};

export default App;
