import '../styles/posts.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Back from '../components/Back';
import { verifyPost } from '../utils/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { api } from '../services/api';


export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(verifyPost)
    });

    useEffect(() => {//ler os dados o input
        api.get(`/post/${id}`)
            .then((response) => {
                reset(response.data);
            })
    }, []);


    async function updatePost(data) {
        await api.put(`/post/${id}`, data)


        navigate('/home');
    }


    return (
        <>
            <Back />
            <div className="container_form">
                <h2 className='title_form' >Edite sua Postagem</h2>

                <form className='form_content' onSubmit={handleSubmit(updatePost)}>

                    <div className='container_inputs'>

                        <div className="input_form">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" {...register("title")} />
                            <p className='errors'>{errors.title?.message}</p>
                        </div>

                        <div className="input_form">
                            <label htmlFor="description">Descrição</label>
                            <textarea name="description" rows="5" cols="33" {...register("description")}></textarea>
                            <p className='errors'>{errors.description?.message}</p>
                        </div>

                        <div className='container_btn'>
                            <button type="submit" className='btn_form'>Editar</button>
                        </div>

                    </div>

                </form>
            </div>
        </>
    );
}
