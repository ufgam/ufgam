import React, { useState } from 'react';
import s from './CabinetView.module.css';
import logo from '../../img/logo.svg';
import userpic from '../../img/userpic.png';
import logoPri from '../../img/logo_pri.png';
import logout from '../../img/logout.png';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { validate } from 'indicative/validator';
import Modal from 'react-modal';
import { alert, defaults, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import { v4 as uuidv4 } from 'uuid';
defaultModules.set(PNotifyMobile, {});

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 1000;

Modal.setAppElement('#root');
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(3, 47, 91, 0.95)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function CabinetView() {
  const dispatch = useDispatch();
  const userData = useSelector(authSelectors.getUserData);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword_confirmation, setnewPassword_confirmation] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'phone':
        return setPhone(value);
      case 'password':
        return setPassword(value);
      case 'currentPassword':
        return setCurrentPassword(value);
      case 'newPassword':
        return setNewPassword(value);
      case 'newPassword_confirmation':
        return setnewPassword_confirmation(value);
      default:
        return;
    }
  };

  const dataUpdate = e => {
    try {
      e.preventDefault();

      dispatch(authOperations.updateData({ name, email, phone, password }));
      setIsOpenModal1(false);
    } catch (error) {
      setIsOpenModal1(false);

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

  const schema = {
    currentPassword: 'required|min:6|max:22',
    newPassword: 'required|min:6|max:22|confirmed',
    newPassword_confirmation: 'required|min:6|max:22',
  };

  const messages = {
    required: 'All fields are required',
    min: 'The value of password is too small, 6 symbols min length',
    max: 'The value of password is too large, 22 symbols max length',
    confirmed: 'Entered passwords do not mutch',
  };

  async function passwordUpdate(e) {
    try {
      e.preventDefault();
      await validate(
        { currentPassword, newPassword, newPassword_confirmation },
        schema,
        messages,
      );

      dispatch(authOperations.updatePassword({ currentPassword, newPassword }));
      setIsOpenModal2(false);
    } catch (error) {
      setIsOpenModal2(false);

      alert({
        text: error[0].message,
        hide: true,
        delay: 2000,
        sticker: false,
        closer: true,
        dir1: 'down',
      });
    }
  }
  // modal start
  const [modal1IsOpen, setIsOpenModal1] = React.useState(false);
  const [modal2IsOpen, setIsOpenModal2] = React.useState(false);
  function openModal1() {
    setIsOpenModal1(true);
  }
  function openModal2() {
    setIsOpenModal2(true);
  }

  function closeModal1() {
    setIsOpenModal1(false);
    dispatch(authOperations.fetchCurrentUser());
  }
  function handleAfterCloseFunc1() {
    setName(userData.name);
    setEmail(userData.email);
    setPhone(userData.phone);
    setPassword('');
  }

  function closeModal2() {
    setIsOpenModal2(false);
    dispatch(authOperations.fetchCurrentUser());
  }
  function handleAfterCloseFunc2() {
    setCurrentPassword('');
    setNewPassword('');
    setnewPassword_confirmation('');
  }
  // modal end

  return (
    <>
      <div className={s.header}>
        <a href="/" className={s.logo} title="UFG Asset Management">
          <img src={logo} alt="UFG Asset Management" />
        </a>
        <button
          className={s.logout}
          onClick={() => dispatch(authOperations.logout())}
        >
          <img src={logout} alt="logout"></img>
        </button>
      </div>

      <div className={s.innerContent}>
        <div className={s.wrapper}>
          <h1 className={s.mainTitle}>Account</h1>

          <div className={s.accountArea}>
            <div className={`${s.accountCard} ${s.twoRows}`}>
              <div className={s.accountCardHeader}>
                <h2>
                  <span className={s.accountHeaderPic}>%</span>Available balance
                </h2>
              </div>
              <hr />
              <table>
                <thead>
                  <tr>
                    <th>Equity</th>
                    <th>{userData.paymentValue}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Withdrawal planned on:</td>
                    <td>{userData.paymentDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={s.accountCard}>
              <div className={s.accountCardHeader}>
                <h2>
                  <span className={s.accountHeaderPic}>&#9818;</span>Investments
                </h2>
              </div>
              <hr />
              <table>
                <thead>
                  <tr>
                    <th>Total</th>
                    <th>{userData.total}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dividends</td>
                    <td>{userData.dividends}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={s.accountCard}>
              <div className={s.accountCardHeader}>
                <h2>
                  <span className={s.accountHeaderPic}> &#9825;</span>Referal
                  bonus
                </h2>
              </div>
              <hr />
              <table>
                <tbody>
                  <tr>
                    <td>Bonus</td>
                    <td>{userData.bonus}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={`${s.accountCard} ${s.userDataCard}`}>
              <div className={s.accountCardHeader}>
                <div className={s.accountCardHeaderTitleWrapper}>
                  <img
                    className={s.accountHeaderPic}
                    src={userpic}
                    alt="userpic"
                  />
                  <h2 className={s.accountHeaderTitle}>Personal data</h2>
                </div>
                <span>
                  ID <span>{userData.ufgamId}</span>
                </span>
              </div>
              <hr />
              <div className={s.personalDataWrapper}>
                <p>{userData.name}</p>
                <p>{userData.email}</p>
                <p>{userData.phone}</p>
                <ul className={s.profileEditLinks}>
                  <li className="list">
                    <span className={s.changeLink} onClick={openModal1}>
                      Change data
                    </span>
                  </li>
                  <li className="list">
                    <span className={s.changeLink} onClick={openModal2}>
                      Change password
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={s.accountCard}>
              <div className={s.accountCardHeader}>
                <h2>
                  <span className={s.accountHeaderPic}>%</span>Closed market
                  orders
                </h2>
              </div>
              <hr />
              <table className={s.dealTable}>
                <thead className={s.dealTableHeads}>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Funds</th>
                  </tr>
                </thead>
                <tbody className={s.dealTableBody}>
                  {userData.deals.map(el => {
                    return (
                      <tr key={uuidv4()}>
                        <td>{el.deal}</td>
                        <td>{el.date}</td>
                        <td>{el.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className={s.footer}>
        <div className={s.wrapper}>
          <div className={s.footerMain}>
            <div className={s.footerLeft}>
              <div className={s.footerTitle}>
                <p name="contacts">Contacts</p>
              </div>
              <div className={s.footerContacts}>
                UFG Asset Management
                <br />
                West Tower, Federatsiya Business Center
                <br />
                12 Presnenskaya naberezhnaya,
                <br />
                Moscow 123112, Russia
                <br />
                <a
                  href="tel:+74951092013"
                  className={`link ${s.mFooter}  ${s.noborder}`}
                >
                  Tel: +7 495 109 2013
                </a>
                <br />
                <a
                  href="fax:+74951092038"
                  className={`link ${s.mFooter} ${s.noborder}`}
                >
                  Fax: +7 495 109 2038
                </a>
                <br />
                <a
                  href="mailto:info@ufgam.world"
                  className={`link ${s.mFooter}`}
                >
                  info@ufgam.world
                </a>
                <br />
                <br />
                Media contacts
                <br />
                <a
                  href="mailto:info@ufgam.world"
                  className={`link ${s.mFooter}`}
                >
                  info@ufgam.world
                </a>
              </div>
            </div>
          </div>

          <div className={s.footerLogoPri}>
            <img src={logoPri} alt="PRI Logo" />
          </div>

          <div className={s.footerCopy}>© UFG Asset Management</div>
        </div>
      </div>

      <Modal
        isOpen={modal1IsOpen}
        onRequestClose={closeModal1}
        onAfterClose={handleAfterCloseFunc1}
        style={customStyles}
        contentLabel="Change data"
      >
        <h2 className={s.modalHeader}>Change account data</h2>
        <span onClick={closeModal1} className={s.modalClose}>
          &times;
        </span>
        <form className={s.modalForm} onSubmit={dataUpdate}>
          <p>Name</p>
          <input
            autoComplete="off"
            onChange={handleChange}
            name="name"
            value={name}
          ></input>
          <p>Email</p>
          <input
            type="email"
            autoComplete="off"
            onChange={handleChange}
            name="email"
            value={email}
          ></input>
          <p>Phone</p>
          <input
            placeholder="+XX XXX XXX XX XX"
            autoComplete="off"
            type="text"
            onChange={handleChange}
            name="phone"
            value={phone}
          ></input>
          <p>Confirm your password</p>
          <input
            placeholder="password"
            type="password"
            autoComplete="new-password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          ></input>
          <button type="submit">Save</button>
        </form>
      </Modal>
      <Modal
        isOpen={modal2IsOpen}
        onRequestClose={closeModal2}
        onAfterClose={handleAfterCloseFunc2}
        style={customStyles}
        contentLabel="Update password"
      >
        <h2 className={s.modalHeader}>Change your password</h2>
        <span onClick={closeModal2} className={s.modalClose}>
          &times;
        </span>
        <form className={s.modalForm} onSubmit={passwordUpdate}>
          <input
            placeholder="Current password"
            type="password"
            autoComplete="new-password"
            onChange={handleChange}
            name="currentPassword"
            value={currentPassword}
          ></input>

          <input
            placeholder="New password"
            type="password"
            autoComplete="new-password"
            onChange={handleChange}
            name="newPassword"
            value={newPassword}
          ></input>

          <input
            placeholder="Confirm new password"
            type="password"
            autoComplete="new-password"
            onChange={handleChange}
            name="newPassword_confirmation"
            value={newPassword_confirmation}
          ></input>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </>
  );
}
