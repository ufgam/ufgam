import axios from 'axios';
import Styles from './Form.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { validate, validations } from 'indicative/validator';
import { alert, defaults, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import logo from '../../img/logo.svg';
// import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { renderToString } from 'react-dom/server';
import English from '../../languages/en-US.json';
import Russian from '../../languages/ru.json';

// import { log } from 'react-modal/lib/helpers/ariaAppHider';
defaultModules.set(PNotifyMobile, {});
defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 1000;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [investorId, setInvestorId] = useState('');
  // const [appends, setAppends] = useState([]);
  const [locale, setLocale] = useState('en');
  const [localMessages, setLocalMessagess] = useState(English);

  function selectLang(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
  }

  useEffect(() => {
    if (locale === 'ru') {
      setLocalMessagess(Russian);
    } else {
      setLocalMessagess(English);
    }
  }, [locale]);

  const schema = {
    name: 'string|min:1|max:26',
    email: 'required|email',
    phone: [
      validations.required(),
      validations.min([10]),
      validations.regex([
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
      ]),
    ],
    investorId: 'min:11|max:11',
  };

  const messages = {
    required: 'Make sure you enter email and phone',
    email: 'Enter valid email address',
    min: 'The value of name or phone number is too small.',
    max: 'The value of name or phone number is too large',
    regex: 'Please, type your phone in +XX XXX XXX XX XX format',
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        value = value.toLowerCase(); // !!!
        return setEmail(value);
      case 'phone':
        return setPhone(value);
      case 'investorId':
        return setInvestorId(value);
      default:
        return;
    }
  };

  // function validateFileType(fileName) {
  //   let idxDot = fileName.lastIndexOf('.') + 1;
  //   let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  //   if (
  //     extFile === 'jpg' ||
  //     extFile === 'jpeg' ||
  //     extFile === 'png' ||
  //     extFile === 'pdf'
  //   ) {
  //     return true;
  //   } else {
  //     alert('Only pdf, jpg/jpeg and png files are allowed!');
  //     return false;
  //   }
  // }

  // async function addFiles(e) {
  //   let target = e.target || e.srcElement;
  //   let files = target.files;
  //   for (let file of files) {
  //     if (validateFileType(file.name)) {
  //       setAppends(appends => [...appends, file]);
  //     }
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await validate({ name, email, phone }, schema, messages);

      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('phone', phone);
      data.append('investorId', investorId);
      // if (appends?.[0]) {
      //   for (let i = 0; i < appends.length; i++) {
      //     data.append(`images`, appends[i], appends[i].name);
      //   }
      // }
      const resp = await axios.post('/auth/register', data);
      alert(resp.data.message);

      setName('');
      setEmail('');
      setPhone('');
      setInvestorId('');
      // setAppends([]);
    } catch (er) {
      console.log(er.message);
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

  // function onDeleteFile(e) {
  //   const deletingFileName = e.target.parentNode.innerText.slice(0, -4);
  //   setAppends(appends.filter(el => el.name !== deletingFileName));
  // }

  // function FileNames() {
  //   let names = appends.map(file => {
  //     let key = uuidv4();

  //     return (
  //       <li key={key} className={Styles.fileName}>
  //         {file.name}
  //         <span
  //           className={Styles.delBtn}
  //           key={`${key}X`}
  //           onClick={onDeleteFile}
  //         >
  //           &nbsp;&nbsp;X
  //         </span>
  //       </li>
  //     );
  //   });
  //   return <ul className="list">{names}</ul>;
  // }

  const placeholderFormName = renderToString(
    <IntlProvider locale={locale} messages={localMessages}>
      <FormattedMessage intl id="app.formName" defaultMessage="Your name" />
    </IntlProvider>,
  );
  const placeholderEmail = renderToString(
    <IntlProvider locale={locale} messages={localMessages}>
      <FormattedMessage intl id="app.formEmail" defaultMessage="E-mail" />
    </IntlProvider>,
  );
  const placeholderPhone = renderToString(
    <IntlProvider locale={locale} messages={localMessages}>
      <FormattedMessage intl id="app.phone" defaultMessage="Phone" />
    </IntlProvider>,
  );
  const placeholderInvestorId = renderToString(
    <IntlProvider locale={locale} messages={localMessages}>
      <FormattedMessage intl id="app.investorId" defaultMessage="Investor ID" />
    </IntlProvider>,
  );

  return (
    <IntlProvider locale={locale} messages={localMessages} defaultLocale="en">
      <div className={Styles.container}>
        <div className={Styles.headerButtons}>
          <select onChange={selectLang} defaultValue={locale}>
            <option value="en">En</option>
            <option value="ru">Rus</option>
          </select>
        </div>
        <div className={Styles.desktopContainer}>
          <div className={Styles.authForm}>
            <div className={Styles.logo}>
              <img
                src={logo}
                alt="UFG Asset Management"
                className={Styles.logoIcon}
              />
            </div>

            <form
              className={Styles.form}
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <label className={`${Styles.authLabel} ${Styles.required}`}>
                <input
                  className={Styles.input}
                  placeholder={placeholderFormName}
                  onChange={handleChange}
                  name="name"
                  value={name}
                  // required
                ></input>
                <svg width="18" height="18" className={Styles.inputIcon}>
                  <path
                    d="M0 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2C.89 0 0 .9 0 2Zm12 4c0 1.66-1.34 3-3 3S6 7.66 6 6s1.34-3 3-3 3 1.34 3 3Zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H3v-1Z"
                    fill="#E0E0E0"
                  />
                </svg>
              </label>
              <label className={`${Styles.authLabel} ${Styles.required}`}>
                <input
                  className={Styles.input}
                  placeholder={placeholderEmail}
                  onChange={handleChange}
                  name="email"
                  value={email}
                  // required
                ></input>
                <svg width="21" height="16" className={Styles.inputIcon}>
                  <path
                    d="M18 0H2C.9 0 .00999999.9.00999999 2L0 14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V2l8 5 8-5v2Z"
                    fill="#E0E0E0"
                  />
                </svg>
              </label>
              <label className={`${Styles.authLabel} ${Styles.required}`}>
                <input
                  id="inputcheck"
                  className={Styles.input}
                  placeholder={placeholderPhone}
                  autoComplete="off"
                  type="text"
                  onChange={handleChange}
                  name="phone"
                  value={phone}
                  // required
                ></input>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className={Styles.inputIcon}
                >
                  <path
                    d="M19 2c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-20zm-8.5 0h3c.276 0 .5.224.5.5s-.224.5-.5.5h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5zm1.5 20c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-14.024h10v14.024z"
                    fill="#E0E0E0"
                  />
                </svg>
              </label>
              <label className={Styles.authLabel}>
                <input
                  className={Styles.input}
                  placeholder={placeholderInvestorId}
                  type="text"
                  onChange={handleChange}
                  name="investorId"
                  value={investorId}
                  // required
                ></input>
                <svg
                  className={Styles.inputIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#E0E0E0"
                >
                  <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"></path>
                </svg>
              </label>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="file" className={Styles.inputFiles}>
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M4.317,16.411c-1.423-1.423-1.423-3.737,0-5.16l8.075-7.984c0.994-0.996,2.613-0.996,3.611,0.001C17,4.264,17,5.884,16.004,6.88l-8.075,7.984c-0.568,0.568-1.493,0.569-2.063-0.001c-0.569-0.569-0.569-1.495,0-2.064L9.93,8.828c0.145-0.141,0.376-0.139,0.517,0.005c0.141,0.144,0.139,0.375-0.006,0.516l-4.062,3.968c-0.282,0.282-0.282,0.745,0.003,1.03c0.285,0.284,0.747,0.284,1.032,0l8.074-7.985c0.711-0.71,0.711-1.868-0.002-2.579c-0.711-0.712-1.867-0.712-2.58,0l-8.074,7.984c-1.137,1.137-1.137,2.988,0.001,4.127c1.14,1.14,2.989,1.14,4.129,0l6.989-6.896c0.143-0.142,0.375-0.14,0.516,0.003c0.143,0.143,0.141,0.374-0.002,0.516l-6.988,6.895C8.054,17.836,5.743,17.836,4.317,16.411"></path>
                  </svg>
                  <FormattedMessage
                    id="app.attach"
                    defaultMessage="Attach files"
                  />
                  <input
                    id="file"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={addFiles}
                    multiple
                  />
                </label>{' '}
                <div>
                  <p className={Styles.maxSize}>
                    <FormattedMessage
                      id="app.fileCountRestrictions"
                      defaultMessage="Maximum 5 files: pdf jpg/jpeg/png."
                    />
                  </p>
                  <p className={Styles.maxSize}>
                    <FormattedMessage
                      id="app.fileSizeRestrictions"
                      defaultMessage="No more then 10Mb"
                    />
                  </p>
                </div>
              </div> */}
              {/* <FileNames /> */}
              <button type="submit" className={Styles.regBtn}>
                <FormattedMessage id="app.send" defaultMessage="send" />
              </button>
              <Link to="/login" className={Styles.authLink}>
                <button className={Styles.logBtn} type="submit">
                  <FormattedMessage id="app.login" defaultMessage="login" />
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}
