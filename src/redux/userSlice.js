import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { use } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const login = createAsyncThunk('user/login', async ({ email, password }) => {

  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;


    console.log(user)
    
    const userData = {
        token,
        user: user,
    }

    await AsyncStorage.setItem("userToken", token )

    return userData
  } catch (error) {

        console.log("UserSlice 21 line: ", error)
        throw error
    }
})

// Auto Sign In

export const autoLogin = createAsyncThunk('user/autoLogin', async() =>{
    try {
        const token = await AsyncStorage.getItem("userToken")

        if(token){
            return token;
        }else {
            throw new Error("User not found!")
        }

    } catch (error) {
        throw error
    }
} )

// Fetch User Profile
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // profil bilgileri döner
    } else {
      throw new Error('Profil bulunamadı.');
    }
  } catch (error) {
    throw error;
  }
});


//Logout

export const logout = createAsyncThunk('user/logout', async()=>{
    try {
        const auth = getAuth()
        await signOut(auth)

        await AsyncStorage.removeItem("userToken")
        return null;

    } catch (error) {
        throw error
    }
})


//Sign UP

export const register = createAsyncThunk(
  'user/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
    } catch (error) {
      console.error('🚫 Register error:', error);
      return rejectWithValue(error.message);
    }
  }
);



const initialState ={
    isLoading:false,
    isAuth:false,
    token: null,
    profile: null,
    user: null,
    error: null
}

export const userSlice= createSlice({

    name: 'user',
    initialState: {
        isLoading: false,
        isAuth: false,
        user: null,
        error: null,
    },
    reducers:{
        setEmail: (state, action)=>{
            const lowerCaseEmail= action.payload.toLowerCase()
            state.email= lowerCaseEmail
        },
        setPassword:(state, action) =>{
            state.password= action.payload
        },
        setIsLoading:(state, action)=>{
            state.isLoading= action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = !!action.payload;
        },
        
    },
    extraReducers:(builder)=> {
        builder
        .addCase(login.pending, (state)=>{
            state.isLoading = true;
            state.isAuth = false
        })
        .addCase(login.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.error.message;
        })

        .addCase(autoLogin.pending, (state)=>{
            state.isLoading = true;
            state.isAuth = false;
        })
        .addCase(autoLogin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isAuth = true;
            state.token = action.payload;            
        })
        .addCase(autoLogin.rejected, (state, action)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.token = null; 
        })

        .addCase(logout.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(logout.fulfilled, (state)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.token = null;
            state.error = null;            
        })
        .addCase(logout.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload; 
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.error = action.error.message;
        })

        .addCase(register.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuth = true;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Kayıt sırasında bir hata oluştu.';
        });
    }
})


export const {setEmail, setPassword, setIsLoading, setUser} =userSlice.actions
export default userSlice.reducer
