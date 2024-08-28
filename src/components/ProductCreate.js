import React, {useEffect, useState} from "react";
import * as ProductService from "../service/ProductService"
import {toast} from "react-toastify";
import {Formik, ErrorMessage, Field, Form} from "formik";
import {Link, useNavigate} from "react-router-dom";
import * as yup from "yup"
import * as CategoryService from "../service/CategoryService"
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment/moment";

function ProductCreate() {
    const [form, setForm] = useState({
        code: "",
        name: "",
        description: "",
        price: 0,
        quantity: "",
        date: "",
        categoryId: "",
    });
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        try {
            const res = await CategoryService.getAllCategories();
            setCategories(res);
        } catch (error) {
            toast.error("Không thể tải danh sách lớp học.");
        }
    };

    const navigate = useNavigate();
    const objectValid = {
        code: yup.string().required("Mã không được để trống").matches(/^PROD-\d{4}$/),
        name: yup.string().required("Tên ko đc để trống"),
        description: yup.string().required("Mô tả không được để trống"),
        price: yup.number().required(" Giá không được để trống").min(0, "Giá phải lớn hơn 0 "),
        quantity: yup.number().required("Số lượng không được để trống").min(0, "Điểm ko đc âm "),
        date: yup.date().required("Ngày không được để trống").min(new Date(), "ngày phải lớn hơn ngày hiện tại"),
        categoryId: yup.number().required("Thể loại không được để trống")

    }
    const saveProduct = async (value) => {
        value.date = moment(value.date).format('DD-MM-YYYY')
        let isSuccess = await ProductService.create(value)
        if (isSuccess) {
            toast.success("Thêm mới thành công")
            navigate("/")
        } else {
            toast.error("Thêm mới thất bại")
        }

    }

    return (
        <div>
            <Formik initialValues={form} onSubmit={saveProduct} validationSchema={yup.object(objectValid)}>
                <Form>
                    <div className="container p-5 shadow w-50 text-start">
                        <div>
                            <div className="mb-2">
                                <label className="form-label">Mã sản phẩm:</label>
                                <Field placeholder="PROD-XXXX" className="form-control form-control-sm" name="code"/>
                                <ErrorMessage className="text-danger" name="code" component="b"></ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Tên sản phẩm:</label>
                                <Field className="form-control form-control-sm" name="name"/>
                                <ErrorMessage className="text-danger" name="name" component="b"></ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <label className="form-label"> Mô tả:</label>
                                <Field className="form-control form-control-sm" name="description"/>
                                <ErrorMessage className="text-danger" name="description" component="b"></ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Giá tiền:</label>
                                <Field className="form-control form-control-sm" name="price"/>
                                <ErrorMessage className="text-danger" name="price" component="b"></ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <label className="form-label"> Số lượng:</label>
                                <Field className="form-control form-control-sm" name="quantity"/>
                                <ErrorMessage className="text-danger" name="quantity" component="b"></ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Ngày :</label>
                                <Field className="form-control form-control-sm" name="date" type="date"/>
                                <ErrorMessage className="text-danger" name="date" component="b"></ErrorMessage>
                            </div>


                            <div>
                                <label className="form-label">Thể loại:</label>

                                <Field  as="select" name="categoryId" className="form-select form-select-sm">
                                    <option value="">Chọn thể loại</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage className="text-danger" name="point" component="b"></ErrorMessage>
                            </div>

                        </div>

                        <div className="mt-2">
                            <button className="btn btn-primary me-2" type="submit">Thêm mới</button>
                            <Link className="btn btn-primary " to={`/`}>Hủy</Link>
                        </div>

                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ProductCreate;