import * as yup from "yup";


export const verifyRegister = yup.object().shape({
    name: yup.string().required("O campo nome é obrigatório!"),
    email: yup.string().required("O campo e-mail é obrigatório!").email("E-mail inválido!"),
    password: yup.string().required("O campo senha é obrigatório!").min(8, "A senha deve conter no minimo 8 digitos"),
    confirmPassword: yup.string().required("O campo confirmar é obrigatório!")
}).required();



export const verifyLogin = yup.object().shape({
    email: yup.string().required("O campo e-mail é obrigatório!").email("E-mail inválido!"),
    password: yup.string().required("O campo senha é obrigatório!").min(8, "A senha deve conter no minimo 8 digitos"),
}).required();


export const verifyPost = yup.object().shape({
    title: yup.string().required("O campo título é obrigatório!").max(30, "O título deve ter no máximo 30 caracteres."),
    description: yup.string().required("O campo descrição é obrigatório!"),
}).required();
