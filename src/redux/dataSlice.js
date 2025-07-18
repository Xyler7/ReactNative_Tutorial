import { createSlice, createAsyncThunk, isAllOf } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';


// Firebase function to get all data
export const getAllData = createAsyncThunk('data/getData', async () => {
    const allData = []

    try {
        const querySnapshot = await getDocs(collection(db, "todolist"));
        querySnapshot.forEach((doc) => {
        allData.push({...doc.data(), id :doc.id})
      });
        return allData;

    } catch (error) {
        console.log(error)
        throw error;
    }
})


// Save data to Firebase
export const saveData = createAsyncThunk('data/saveData', async (value) => {
    try {
        const docRef = await addDoc(collection(db, "todolist"), {
            content: value
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
        throw error;
    }
});

const initialState = {
    data: [],
    userInput: null,
    isLoading: false,
    isSaved: false,
    error: null,
}

export const dataSlice = createSlice({

    name: 'data',
    initialState,
    reducers: {
        setUserInput: (state, action) => {
            state.userInput = action.payload;
        },
        clearUserInput: (state) => {
            state.userInput = null;
        },
        resetData: (state) => {
            state.data = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(saveData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSaved = !state.isSaved; // Toggle saved state
                state.userInput = null; // Clear user input after saving
            })
            .addCase(saveData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }

})

export const { setUserInput, clearUserInput, resetData } = dataSlice.actions;
export default dataSlice.reducer
