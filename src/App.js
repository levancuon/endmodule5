import './App.css';
import React, {useState} from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import StudentListFunc from "./components/ProductListFunct"
import {ToastContainer} from "react-toastify";
import ProductCreate from "./components/ProductCreate";
function App() {
  const [total, setTotal] = useState("-");
  return (

      <div className="App container shadow p-2 mt-5 ">
        <BrowserRouter className=" container">
          <div className="container d-flex justify-content-between mb-3 mt-5">
            <h2>Quản lý sản phẩm</h2>
            <div className="d-flex text-end align-items-center">
              <NavLink to="/" className="btn btn-primary ">Danh sách</NavLink>
              <NavLink to="/create" className="btn btn-primary ms-1">Thêm mới</NavLink>
            </div>
          </div>
          <div>
            <Routes>
              <Route path="/" element={<StudentListFunc setTotal={setTotal}/>}></Route>
              <Route path="/create" element={<ProductCreate/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
        <ToastContainer></ToastContainer>
      </div>

  );
}

export default App;
