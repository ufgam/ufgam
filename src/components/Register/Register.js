import Styles from './Register.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { validate } from 'indicative/validator';
import { alert, defaults, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import logo from '../../img/logo.svg';
defaultModules.set(PNotifyMobile, {});

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 1000;

export default function Register() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');

  const schema = {
    name: 'string|min:1|max:26',
    email: 'required|email',
    password: 'required|min:6|max:22|confirmed',
    password_confirmation: 'required|min:6|max:22',
  };

  const messages = {
    required: 'Make sure to enter email and password',
    email: 'Enter valid email address',
    min: 'The value of name or password is too small',
    max: 'The value of name or password is too large',
    confirmed: 'Entered passwords do not mutch',
  };

  function activeClassTrigger() {
    const passLength = password.length;

    if (passLength >= 1 && passLength < 7) {
      return Styles.badSafe;
    }
    if (passLength >= 7 && passLength < 10) {
      return Styles.middleSafe;
    }
    if (passLength >= 10) {
      return Styles.strongSafe;
    }
    return Styles.base;
  }

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'password_confirmation':
        return setConfirmPassword(value);

      default:
        return;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await validate(
        { name, email, password, password_confirmation },
        schema,
        messages,
      );

      dispatch(authOperations.register({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (er) {
      console.log(er);
      alert({
        text: er[0].message,
        hide: true,
        delay: 2000,
        sticker: false,
        closer: true,
        dir1: 'down',
      });
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.desktopContainer}>
        <div className={Styles.authForm}>
          <div className={Styles.logo}>
            <img
              src={logo}
              alt="UFG Asset Management"
              className={Styles.logoIcon}
            />
          </div>

          <form className={Styles.form} onSubmit={handleSubmit}>
            <label className={Styles.authLabel}>
              <input
                className={Styles.input}
                placeholder="E-mail"
                onChange={handleChange}
                name="email"
                value={email}
              ></input>
              <svg width="21" height="16" className={Styles.inputIcon}>
                <path
                  d="M18 0H2C.9 0 .00999999.9.00999999 2L0 14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V2l8 5 8-5v2Z"
                  fill="#E0E0E0"
                />
              </svg>
            </label>

            <label className={Styles.authLabel}>
              <input
                id="inputcheck"
                className={Styles.input}
                placeholder="Password"
                onChange={handleChange}
                name="password"
                type="password"
                value={password}
              ></input>
              <svg width="16" height="21" className={Styles.inputIcon}>
                <path
                  d="M14 7h-1V5c0-2.76-2.24-5-5-5S3 2.24 3 5v2H2C.9 7 0 7.9 0 9v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2Zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm3.1-9H4.9V5c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2Z"
                  fill="#E0E0E0"
                />
              </svg>
            </label>

            <label className={Styles.authLabel}>
              <input
                className={Styles.input}
                placeholder="Confirm the password"
                onChange={handleChange}
                type="password"
                name="password_confirmation"
                value={password_confirmation}
              ></input>
              <svg width="16" height="21" className={Styles.inputIcon}>
                <path
                  d="M14 7h-1V5c0-2.76-2.24-5-5-5S3 2.24 3 5v2H2C.9 7 0 7.9 0 9v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2Zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm3.1-9H4.9V5c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2Z"
                  fill="#E0E0E0"
                />
              </svg>
            </label>

            <div id="check" className={activeClassTrigger()}></div>

            <label className={Styles.authLabel}>
              <input
                className={Styles.input}
                placeholder="Your name"
                onChange={handleChange}
                name="name"
                value={name}
              ></input>
              <svg width="18" height="18" className={Styles.inputIcon}>
                <path
                  d="M0 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2C.89 0 0 .9 0 2Zm12 4c0 1.66-1.34 3-3 3S6 7.66 6 6s1.34-3 3-3 3 1.34 3 3Zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H3v-1Z"
                  fill="#E0E0E0"
                />
              </svg>
            </label>

            <button type="submit" className={Styles.regBtn}>
              register
            </button>
            <Link to="/login" className={Styles.authLink}>
              <button className={Styles.logBtn} type="submit">
                login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
