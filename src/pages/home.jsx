import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header/';
import '../styles/home.css';
import { api } from '../services/api';

export default function Home() {
    const [loadHome, setLoadHome] = useState([]);


    async function homeLoad() {
        try {
            const response = await api.get('/posts');

            setLoadHome([...response.data]);


        } catch (error) {
            return console.log(error.response.data);
        }
    }

    useEffect(() => {
        homeLoad();

    }, []);


    async function deletePost(id) {

        try {
            await api.delete(`/post/${id}`);
            setLoadHome(loadHome.filter(post => post.id !== id));


            return toast.success("Excluído com sucesso!", {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message'
            });

        } catch (error) {

        }
    }

    return (
        <div className='container_home'>
            <Header />

            <main className='container_main'>

                {loadHome.map((home) => (
                    <div className='content_main' key={home.id}>
                        <div>
                            <div className="content_title_home">
                                <h1 className="title_home">{home.title}</h1>
                            </div>
                            <div className='content_description'>
                                <p>{home.description}</p>
                            </div>
                        </div>
                        <div className="content_author">
                            <p className='author'><span>Autor:</span>{home.User.name}</p>
                        </div>

                        <div className="container_btns">
                            <Link to={`/edit/${home.id}`}>
                                <button type="button" className='btn_edit'>Editar</button>
                            </Link>

                            <Link to="#">
                                <button type="button" onClick={() => deletePost(home.id)} className='btn_del'>Delete</button>
                            </Link>
                        </div>
                    </div>

                ))
                }

            </main >

        </div >
    );
}
