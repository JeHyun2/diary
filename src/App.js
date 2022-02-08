import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';


import MyButton from './components/MyButton';
import Myheader from './components/Myheader';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Myheader headText={"APP"} leftChild={<MyButton text={"좌"} onClick={()=>alert("좌클릭")}/>}
        rightChild = {<MyButton text={"우"} onClick={()=> alert("우클릭")}/>}/>
        <h2>App.js</h2>
        <MyButton text={"버튼"} onClick={()=> alert("버튼클릭")} type= {"positive"}/>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/new' element={<New></New>}></Route>
          <Route path='/edit' element={<Edit></Edit>}></Route>
          <Route path='/diary/:id' element={<Diary></Diary>}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
