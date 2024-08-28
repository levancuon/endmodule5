import React, {useEffect, useState} from "react";
import * as studentService from "../service/ProductService"
import {Link, NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import {Modal, Button} from 'react-bootstrap';
import * as categoryService from "../service/CategoryService";
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductListFunct({setTotal}) {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    // const [productDelete, setProductDelete] = useState(null);
    // const [modal, setModal] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        getAllProducts();
    }, [name, categoryId]);

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllProducts = async () => {
        let res = await studentService.getAllProducts(name, categoryId);
        setProducts(res.data);
        setTotal(res.total);
    }

    const getAllCategories = async () => {
        try {
            const res = await categoryService.getAllCategories();
            setCategories(res);
        } catch (error) {
            toast.error("Không thể tải danh sách lớp học.");
        }
    };



    const handleChangeCategory = (e) => {
        setCategoryId(e.target.value)
    }

    return (
        <div className="container">
            <div>
                <select className="classroomId form-select mb-2 w-auto " id="classroomId" value={categoryId}
                        onChange={handleChangeCategory}>
                    <option value="">Chọn thể loại</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <input className="form-select mb-2" placeholder="Nhập tên tìm kiếm" type="text" value={name}
                       onChange={(e) => setName(e.target.value)}/>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Stt</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Ngày nhập</th>
                        <th>Loại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((items, index) => {
                            return (
                                <tr key={items.id}>
                                    <td>{index + 1}</td>
                                    <td>{items.code}</td>
                                    <td>{items.name}</td>
                                    <td>{items.description}</td>
                                    <td>{items.price}</td>
                                    <td>{items.quantity}</td>

                                    <td>{items.date}</td>
                                    <td>{items.category?.name || "không có loại"}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default ProductListFunct;