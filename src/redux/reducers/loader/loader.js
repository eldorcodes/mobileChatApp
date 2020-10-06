import { STARTER, FINISH } from "../../actions/types";

const initialState = {
    loading: false
}

const loader = (state = initialState,action) => {
    const { type, payload } = action;
    switch (type) {
        case STARTER:
            return {
                loading: true
            }
        case FINISH: 
        return {
            loading: false
        }
    
        default:
        return state;
    }
}

export default loader;