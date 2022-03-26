import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/header';
//import Spinner from '../../components/spinner/spinner';

import { CITIES } from '../../const';

import { AuthData } from '../../types/auth-data';

import { useAppDispatch } from '../../hooks';

import { loginAction } from '../../store/api-actions';


import styles from './login.module.css';

type FieldProps = {
  value: string;
  error: boolean;
  errorText: string;
  regex: RegExp;
}

type FormStateProps = {
  [key: string]: FieldProps;
}

const authFormFields = {
  email: 'E-mail',
  password: 'Password',
};

const randomCityIndex = Math.floor(Math.random() * CITIES.length);
const randomCity = CITIES[randomCityIndex];

function Login():JSX.Element {
  const EMAIL_VALID_SYMBOLS = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
  const PASSWORD_VALID_SYMBOLS = /\w/;

  const dispatch = useAppDispatch();

  const isValidField = (value: string, symbols: RegExp) => value !== '' && (value.match(symbols));

  const [formState, setFormState] = useState<FormStateProps>({
    email: {
      value: '',
      error: false,
      errorText: 'Not valid email',
      regex: EMAIL_VALID_SYMBOLS,
    },
    password: {
      value: '',
      error: false,
      errorText: 'Not valid password',
      regex: PASSWORD_VALID_SYMBOLS,
    },
  });

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      login: formState.email.value,
      password: formState.password.value,
    });
  };

  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    const rule = formState[name].regex;
    const isValid = isValidField(value, rule);

    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        error: !isValid,
        value,
      },
    });
  };

  const isError = formState.email.error || formState.password.error;
  const isValue = formState.email.value === '' || formState.password.value === '';

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              {Object.entries(authFormFields).map(([name, label]) => {
                const isInputError = formState[name].error && styles['form__input--error'];
                const inputClass = `login__input form__input ${isInputError}`;

                return (
                  <div
                    key={name}
                    className='login__input-wrapper form__input-wrapper'
                  >
                    <label className="visually-hidden">
                      {label}
                    </label>
                    <input
                      className={inputClass}
                      type={name}
                      name={name}
                      placeholder={label}
                      required
                      value={formState[name].value}
                      onChange={handleChange}
                    />
                    {
                      formState[name].error &&
                        (
                          <p className={styles['field-error-message']}>
                            {formState[name].errorText}
                          </p>
                        )
                    }
                  </div>
                );
              })}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isError || isValue}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to="/"
                className="locations__item-link"
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
