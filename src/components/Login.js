import React, { useContext, useState } from 'react';
import Alert from './Alert';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../hooks/useAuth';

const Login =  () => {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const  handleSubmit = (event) => {
        event.preventDefault();
        auth.login(username, password);
    }
    
    if (auth.isAuthenticated()) {
        return <Redirect to="/" />
    }

    return (
        <div className="text-center">                
            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src="/images/pngwing.com.png" alt="" width="72" height="72"></img>
                <h1 className="h3 mb-3 font-weight-normal">Faça login</h1>
                {auth.error && <Alert message={auth.error} />}
                <div className="form-group">
                    <label className="sr-only" htmlFor="username">Usuário: </label>
                    <input 
                        type="text"
                        className="form-control"
                        onChange={(event) => setUsername(event.target.value)} 
                        value={username}
                        placeholder="Nome de usuário"/>
                </div>

                <div className="form-group">
                    <label className="sr-only" htmlFor="password">Senha: </label>
                    <input 
                        type="password" 
                        className="form-control"
                        onChange={(event) => setPassword(event.target.value)} 
                        value={password}
                        placeholder="Senha de usuário"/>
                </div>
                <button 
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    disabled={auth.processing}>Login</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2020 - João Paulo da Mata Mendes</p>
            </form>
            
        </div>
    );
    
}

export default Login;