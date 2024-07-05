import React, { useState, useRef, useEffect } from 'react';
import usePersist from '../../hooks/usePersist';
import { selectCurrentToken } from './authSlice';
import { useRefreshMutation } from './authApiSlice';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false); // Correctly initialize useState
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    await refresh().unwrap(); // Unwrap the response to handle async
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token && persist) verifyRefreshToken();
        }

        return () => { effectRan.current = true; }; // Ensure cleanup is in braces
    }, [token, persist, refresh]); // Include dependencies

    let content;
    if (!persist) {
        content = <Outlet />;
    } else if (isLoading) {
        content = <Spinner/>
    } else if (isError) {
        content = (
            <p className='errmsg'>
                {error.data?.message}
                <Link to="/login"> Please login again</Link>.
            </p>
        );
    } else if (isSuccess && trueSuccess) {
        content = <Outlet />;
    } else if (token && isUninitialized) {
        content = <Outlet />;
    }

    return content;
};

export default PersistLogin;
