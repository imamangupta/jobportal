const {createSlice } = require("@reduxjs/toolkit");

const initialState= {
    userName:"",
    userId:"",
    role:"",
    email:""
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            console.log(action.payload);
            
          state.userName = action.payload.userName;
          state.userId = action.payload.id;
          state.role = action.payload.roleName;
          state.email = action.payload.email;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer