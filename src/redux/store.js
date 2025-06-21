import { configureStore } from "@reduxjs/toolkit";  //eğer import edilen isimler süslü parantez
import userReducer from "./userSlice"               //içindeyse isim değişmez, diğeri değişebilir.
/*userReducer ismi sektör standartı gereği böyle. Yoksa farklı isim koyulabilir*/
import { thunk } from "redux-thunk";

export const store = configureStore({
    reducer:{
        user: userReducer           //buradaki user ismi de yine sektör standartı gereği
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware({serializableCheck:false})

})