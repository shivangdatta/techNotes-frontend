import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import usePersist from './../../hooks/usePersist';
import Spinner from './../../components/Spinner';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername('');
            setPassword('');
            navigate('/dash');
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist(prev => !prev);

    const errClass = errMsg ? "errmsg text-red-500 mb-4" : "offscreen";

    if (isLoading) return <Spinner/>;

    return (
        <section className="login bg-black text-white min-h-screen flex flex-col items-center justify-center py-10">
            <header className="mb-6">
                <h1 className="text-4xl font-bold">Employee Login</h1>
            </header>
            <main className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium">Username:</label>
                        <input
                            className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            type="text"
                            id="username"
                            ref={userRef}
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">Password:</label>
                        <input
                            className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePwdInput}
                            required
                        />
                    </div>
                    <button className="w-full py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition">
                        Sign In
                    </button>
                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                            className="mr-2"
                        />
                        <label htmlFor="persist" className="text-sm">Trust this device</label>
                    </div>
                </form>
            </main>
            <footer className="mt-6">
                <Link to="/" className="text-teal-500 hover:text-teal-400">Back to Home</Link>
            </footer>
        </section>
    );
};

export default Login;
