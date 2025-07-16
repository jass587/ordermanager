import { useFormik } from "formik";
import * as Yup from "yup";

export const useCategoryForm = (initialValues, onSubmit) => {
  return useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit,
  });
};
