import React from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonCustom from '../../components/user/ButtonCustom/ButtonCustom';
import { Icon } from '@iconify/react/dist/iconify.js';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404 - Page Not Found</h1>
            <p className="text-xl mt-4 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
            <ButtonCustom type='button' className='uppercase transition duration-300 flex gap-2 px-4' onClick={handleReturn}>
                <p>Go back</p>
                <Icon icon="carbon:return" width="24" height="24" />
            </ButtonCustom>
        </div>
    )
}

export default NotFound