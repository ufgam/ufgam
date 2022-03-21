import Styles from './Login.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { alert, defaults, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import logo from '../../img/logo.svg';
defaultModules.set(PNotifyMobile, {});

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 1000;

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    try {
      e.preventDefault();
      dispatch(authOperations.login({ email, password }));
      setEmail('');
      setPassword('');
    } catch (error) {
      alert({
        text: error[0].message,
        hide: true,
        delay: 2000,
        sticker: false,
        closer: true,
        dir1: 'down',
      });
    }
  };

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

            <button className={Styles.logBtn} type="submit">
              login
            </button>

            <Link to="/register" className={Styles.authLink}>
              <button type="submit" className={Styles.regBtn}>
                registration
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
