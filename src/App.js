
import React, { useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';

const reducer =(state, action) => {
  let newState = [];

  switch(action.type){
    case 'INIT':{
      return action.data
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it)=>it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => 
        it.id === action.data.id ? {...action.data}: it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData =[
  {
    id: 1,
    date: 1644294231395,
    content: "오늘의 일기 1번",
    emotion: 1,
  },
  {
    id: 2,
    date: 1644294231396,
    content: "오늘의 일기 2번",
    emotion: 2,
  },
  {
    id: 3,
    date: 1644294231397,
    content: "오늘의 일기 3번",
    emotion: 3,
  },
  {
    id: 4,
    date: 1644294231398,
    content: "오늘의 일기 4번",
    emotion: 4,
  },
  {
    id: 5,
    date: 1644294231399,
    content: "오늘의 일기 5번",
    emotion: 5,
  },
  
]

function App() {

  const [data, dispatch] = useReducer(reducer, dummyData);
  

  const dataId = useRef(0);

  const onCreate = (date, content, emotion)=> {
    dispatch({
      type: "CREATE", 
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
    }
  })
    dataId.current += 1;
  };
  
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  };

  const onEdit = (targetId,date, content, emotion) => {
    dispatch({type: "EDIT", data:{
      id: targetId,
      date: new Date(date).getTime(),
      content,
      emotion,
    }})
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider 
      value={{
        onCreate, 
        onEdit, 
        onRemove,
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/new' element={<New></New>}></Route>
              <Route path='/edit/:id' element={<Edit></Edit>}></Route>
              <Route path='/diary/:id' element={<Diary></Diary>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
