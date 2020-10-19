import React, { Component } from 'react';
import AuthService from '../api/AuthService';
import Alert from './Alert';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            alert: null,
            processing: false,
            loggedIn: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);     
    }

    handleSubmit(event) {
        event.preventDefault();
        AuthService.login(this.state.username, this.state.password,
            success => {
                if (success) {
                    this.setState({ loggedIn: true, processing: false});
                    this.props.onLoginSuccess();
                } else {
                    this.setState({ alert: "Login inválido", processing: false });
                }
        });
    }

    handleInputChanged(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState({[field]: value});
    }

    render() {
        if (AuthService.isAuthenticated() || this.state.loggedIn) {
            return <Redirect to="/" />
        }

        return (
            <div className="text-center">                
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <img className="mb-4" src="/images/pngwing.com.png" alt="" width="72" height="72"></img>
                    <h1 className="h3 mb-3 font-weight-normal">Faça login</h1>
                    {this.state.alert !== null ? <Alert message={this.state.alert} /> : "" }
                    <div className="form-group">
                        <label className="sr-only" htmlFor="username">Usuário: </label>
                        <input 
                            type="text"
                            className="form-control"
                            onChange={this.handleInputChanged} 
                            value={this.state.username}
                            name="username"
                            placeholder="Nome de usuário"/>
                    </div>

                    <div className="form-group">
                        <label className="sr-only" htmlFor="password">Senha: </label>
                        <input 
                            type="password" 
                            className="form-control"
                            onChange={this.handleInputChanged} 
                            value={this.state.password}
                            name="password"
                            placeholder="Senha de usuário"/>
                    </div>
                    <button 
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        disabled={this.state.processing}>Login</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2020 - João Paulo da Mata Mendes</p>
                </form>
                
            </div>
        );
    }
}

export default Login;