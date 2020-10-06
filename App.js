import React from "react";
import Navigation from './src/navigation/navigation';
import Loader from './src/component/loading/loading';
import { StoreProvider } from "./src/redux/store/store";

const App = () => (
    <StoreProvider>
        <Navigation/>
        <Loader/>
    </StoreProvider>
)

export default App;