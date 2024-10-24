import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        displayName: undefined,
        pictureUrl: undefined,
        statusMessage: undefined,
        userId: null,
        cart: [],
        shopDetail: [],
        latitued:null,
        longitued:null,
    }
}

// const updateNestedState = (state, field, payload) => {
//     let current = state;
//     for (let i = 0; i < field.length - 1; i++) {
//         current = current[field[i]];
//         current[field[field.length - 1]] = payload;
//     }
// }

const updateNestedState = (state, field, payload) => {
    let current = state;

    // ลูปผ่าน field ทั้งหมด แต่ยกเว้นตัวสุดท้าย (เพราะตัวสุดท้ายจะเป็น key ที่ต้องอัปเดต)
    for (let i = 0; i < field.length - 1; i++) {
        const key = field[i];
        current = current[key]; // เข้าถึง object/array ที่อยู่ใน field ปัจจุบัน
    }

    // อัปเดตค่าของ field สุดท้ายด้วย payload
    const lastField = field[field.length - 1];
    current[lastField] = payload;
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

