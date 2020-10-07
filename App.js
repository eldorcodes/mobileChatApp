import React from "react";
import Navigation from './src/navigation/navigation';
import Loader from './src/component/loading/loading';
import { StoreProvider } from "./src/redux/store/store";
import {Container} from 'native-base';

const App = () => (
    <StoreProvider>
        <Container>
        <Navigation/>
        <Loader/>
        </Container>
    </StoreProvider>
)

export default App;