import './styles.css';

export default function LayoutForm(props) {
    return (
        <div className="container">
            <div className="content">
                <div className="content_form">
                    {props.children}
                </div>
            </div>
        </div>
    );
}