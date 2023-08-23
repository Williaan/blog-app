import { Link } from 'react-router-dom';
import './styles.css';
import { getItem, clearItem } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const idUser = getItem('userId')
    const navigate = useNavigate();


    function hendleLogout() {
        clearItem();
        navigate('/');
    }


    return (
        <header className="container_header">
            <nav className="content_nav">
                <div className="content_logo">
                    <h2 className="logo" onClick={() => hendleLogout()}>Full Blog</h2>
                </div>

                <div className="content_btn">
                    <Link to={`/post/user/${idUser}`}>
                        <button type="button" className='btn'>+ Add Post</button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
