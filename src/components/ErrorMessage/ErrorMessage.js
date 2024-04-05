import gif from './error.gif';
import './ErrorMessage.scss';

export default function ErrorMessage() {
    return (
        <img src={gif} alt="Error" className='error-message-img' />
    )
};
