import React, {useEffect} from 'react'
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { getAllData } from './src/redux/dataSlice';
import {useDispatch, useSelector} from 'react-redux';
import { Loading } from './src/components';
import { ThemeProvider } from './src/context/ThemeContext';


const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </Provider>
  )
}

const App = () => {
  const dispatch = useDispatch();

  const { isLoading, isSaved } = useSelector((state) => state.data)

  useEffect(() => {
    dispatch(getAllData());
  }, [isSaved])
  
  if(isLoading) {
    return <Loading />
  }
  
  return (
    <RootNavigation/>
)

}

export default AppWrapper;