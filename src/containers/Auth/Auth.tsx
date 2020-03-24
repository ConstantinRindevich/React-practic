import React from 'react';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { validateControl } from '../../Form/FormFramework';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

interface AuthProps {
    auth: (email: string, password: string, isLogin: boolean) => void
}

class Auth extends React.Component<AuthProps> {

    state={
        isFormValid: false,
        formControls: [
            {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        ]
    }

    loginHandler = () => {
        this.props.auth (
            this.state.formControls[0].value,
            this.state.formControls[1].value,
            true            
        )
    }

    registerHandler = async () => {
        this.props.auth (
            this.state.formControls[0].value,
            this.state.formControls[1].value,
            false            
        )
    }

    sumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlIndex: number) => {
        const formControls = [...this.state.formControls];
        const currentControl = formControls[controlIndex];
        if (currentControl.value.trim() === event.target.value.trim()) {
            return;
        }

        currentControl.value = event.target.value;
        currentControl.touched = true;
        currentControl.valid = validateControl(currentControl.value, currentControl.validation);

        let isFormValid = true;
        formControls.forEach((control) => {
            isFormValid = control.valid && isFormValid;
        });

        this.setState({
            formControls: formControls,
            isFormValid: isFormValid
        })
    }

    renderInputs() {
        return this.state.formControls.map((control, index) => {
            /*const keys = Object.keys(control) as ReadonlyArray<keyof formControls>;
            console.log(keys);
            console.log(control[keys[0]]);*/
            return (
                <Input
                    key={index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shoudValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, index)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.sumbitHandler} className={classes.AuthForm}>
                        { this.renderInputs() }
                        <Button 
                            type='success' 
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button 
                            type='primary' 
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегестрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch: any) {
    return ({
        auth: (email: string, password: string, isLogin: boolean) => dispatch(auth(email, password, isLogin))
    })
}

export default connect(null, mapDispatchToProps)(Auth);