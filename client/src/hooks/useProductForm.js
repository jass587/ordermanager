import { useFormik } from "formik";
import * as Yup from "yup";

export const useProductForm = (initialValues, onSubmit) => {
  return useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      price: Yup.number().required("Price is required"),
      categoryId: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit,
  });
};