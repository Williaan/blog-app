import '../styles/register.css';
import { toast } from 'react-toastify';
import LayoutForm from "../components/Layout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyRegister } from '../utils/yup';
import { api } from '../services/api';


export default function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(verifyRegister)
    });

    async function addUser(data) {
        try {
            if (data.password !== data.confirmPassword) {
                return toast.error("As senhas não conferem, digite novamente!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message'
                });
            }

            await api.post("/register", data);

            navigate("/");


        } catch (error) {

            if (data.email === data.email) {
                return toast.warn("Já existe um e-mail cadastrado com esse nome !", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message'
                });

            }
        }
    }


    return (
        <LayoutForm>
            <h1 className="title">Cadastre-se</h1>

            <form className="form" onSubmit={handleSubmit(addUser)}>

                <div className="inputs">
                    <input type="text" name="name" placeholder="Nome" {...register("name")} />
                    <p className='errors'>{errors.name?.message}</p>
                </div>

                <div className="inputs">
                    <input type="email" name="email" placeholder="E-mail" {...register("email")} />
                    <p className='errors'>{errors.email?.message}</p>
                </div>

                <div className="inputs">
                    <input type="password" name="password" placeholder="Senha" {...register("password")} />
                    <p className='errors'>{errors.password?.message}</p>
                </div>

                <div className="inputs">
                    <input type="password" name="confirmPassword" placeholder="Confirme a senha" {...register("confirmPassword")} />
                    <p className='errors'>{errors.confirmPassword?.message}</p>
                </div>

                <div className="container_login_form_btn">
                    <button type="submit" className="login_form_btn">Cadastrar</button>
                </div>

                <div className="text_center">
                    <span className="text1">Já possui conta?</span>

                    <Link to="/" className="text2">Clique aqui</Link>
                </div>
            </form>
        </LayoutForm>
    );
}
