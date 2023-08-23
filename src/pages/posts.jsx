import '../styles/posts.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Back from '../components/Back';
import { verifyPost } from '../utils/yup';
import { api } from '../services/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Post() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(verifyPost)
    });


    async function addPost(data) {
        try {
            await api.post(`/post/user/${id}`, data);


            navigate('/home')

            return toast.success("Cadastrado com sucesso!", {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message'
            });


        } catch (errors) {
            console.log(errors.response.data);
        }
    }


    return (
        <>
            <Back />
            <div className="container_form">
                <h2 className='title_form' >Crie uma Postagem</h2>

                <form className='form_content' onSubmit={handleSubmit(addPost)}>

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
                            <button type="submit" className='btn_form'>Postar</button>
                        </div>

                    </div>

                </form>
            </div>
        </>
    );
}
