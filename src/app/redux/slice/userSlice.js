import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        displayName: undefined,
        pictureUrl: undefined,
        statusMessage: undefined,
        userId: null,
        cart: []
    }
}

const updateNestedState = (state, field, payload) => {
    let current = state;
    console.log('current', current)
    for (let i = 0; i < field.length - 1; i++) {
        current = current[field[i]];
        current[field[field.length - 1]] = payload;
    }
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateField(state, action) {
            const { field, payload } = action.payload;
            updateNestedState(state, field, payload);
        }
    }
})

export const { updateField } = UserSlice.actions;

export default UserSlice.reducer;

