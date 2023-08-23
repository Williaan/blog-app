import '../styles/register.css';
import { toast } from 'react-toastify';
import LayoutForm from "../components/Layout/";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyLogin } from '../utils/yup';
import { api } from '../services/api';
import { setItem, getItem } from '../utils/storage';



export default function Login() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(verifyLogin)
    });


    useEffect(() => {

        const token = getItem('@token');

        if (token) {
            navigate('/home');
        }

    }, [navigate]);


    async function addLogin(data) {
        try {

            const response = await api.post("/login", data);
            const { user, token } = response.data;


            setItem("@token", token);
            setItem("userId", user.id);


            navigate('/home');

        } catch (error) {
            if (!data.email || !data.senha) {
                return toast.error("E-mail ou senha incorretos!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message'
                });
            }
        }

    }



    return (
        <LayoutForm>
            <h1 className="title">Bem-vindo</h1>

            <form className="form" onSubmit={handleSubmit(addLogin)}>

                <div className="inputs">
                    <input type="email" name="email" placeholder="E-mail" {...register("email")} />
                    <p className='errors'>{errors.email?.message}</p>
                </div>

                <div className="inputs">
                    <input type="password" name="password" placeholder="Senha" {...register("password")} />
                    <p className='errors'>{errors.password?.message}</p>
                </div>

                <div className="container_login_form_btn">
                    <button type="submit" className="login_form_btn">Entrar</button>
                </div>

                <div className="text_center">
                    <span className="text1">Não possui conta?</span>

                    <Link to="/register" className="text2">Clique aqui</Link>
                </div>
            </form>
        </LayoutForm>
    );
}
