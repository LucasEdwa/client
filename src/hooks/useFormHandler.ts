// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { FormErrors, ValidationSchema } from "../types/donation";

// const validateSchema = <T extends Record<string, any>>(data: T, schema: ValidationSchema): FormErrors => {
//   const errors: FormErrors = {};
  
//   Object.entries(schema).forEach(([field, rules]) => {
//     const value = data[field];
    
//     if (rules.required && !value) {
//       errors[field] = rules.message;
//       return;
//     }
    
//     if (rules.pattern && value && !rules.pattern.test(value)) {
//       errors[field] = rules.message;
//     }
//   });
  
//   return errors;
// };

// export const useFormHandler = <T extends Record<string, any>>(initialFormData: T, validationSchema: ValidationSchema) => {
//   const [formData, setFormData] = useState<T>(initialFormData);
//   const [formErrors, setFormErrors] = useState<FormErrors>({});
//   const navigate = useNavigate();

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type, checked } = event.target as HTMLInputElement;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>, navigateTo: string, additionalData: any) => {
//     event.preventDefault();
//     const errors = validateSchema(formData, validationSchema);
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//     } else {
//       navigate(navigateTo, {
//         state: {
//           ...formData,
//           ...additionalData,
//         },
//       });
//     }
//   };

//   return {
//     formData,
//     formErrors,
//     handleInputChange,
//     handleFormSubmit,
//   };
// };
