import s from './CabinetView.module.css';
import logo from '../../img/logo.svg';
import userpic from '../../img/userpic.png';
import logoPri from '../../img/logo_pri.png';
import logout from '../../img/logout.png';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';

export default function CabinetView() {
  const dispatch = useDispatch();
  const userData = useSelector(authSelectors.getUserData);
  console.log(userData);

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
          <h1 className={s.mainTitle}>Personal account</h1>

          <div className={s.accountArea}>
            <div className={`${s.accountCard} ${s.twoRows}`}>
              <div className={s.accountCardHeader}>
                <h2>
                  <span className={s.accountHeaderPic}>%</span>Amount to be paid
                </h2>
              </div>
              <hr />
              <table>
                <thead>
                  <tr>
                    <th>Summa na viplatu</th>
                    <th>{userData.paymentValue}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Planovaya data</td>
                    <td>{userData.paymentDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={s.accountCard}>
              <div className={s.accountCardHeader}>
                <h2>
                  <span className={s.accountHeaderPic}>&#9818;</span>Portfel
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
            <div className={s.accountCard}>
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
                    <a href="#">Change data</a>
                  </li>
                  <li className="list">
                    <a href="#">Change password</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={s.accountCard}>
              <div className={s.accountCardHeader}>
                <h2>
                  <span className={s.accountHeaderPic}>%</span>Uchastie v
                  sdelkah
                </h2>
              </div>
              <hr />
              <table className={s.dealTable}>
                <thead className={s.dealTableHeads}>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody className={s.dealTableBody}>
                  {userData.deals.map(el => {
                    return (
                      <tr>
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
                Legenda Tsvetnogo Business Center
                <br />
                2 Tsvetnoy Blvd.,
                <br />
                Moscow 127051, Russia
                <br />
                <a
                  href="tel:+74956623030"
                  className={`link ${s.mFooter}  ${s.noborder}`}
                >
                  Tel: +7 495 662 3030
                </a>
                <br />
                <a
                  href="fax:+79688620775"
                  className={`link ${s.mFooter} ${s.noborder}`}
                >
                  Fax: +7 968 862 0775
                </a>
                <br />
                <a
                  href="mailto:ufgam@ufgam.com"
                  className={`link ${s.mFooter}`}
                >
                  ufgam@ufgam.com
                </a>
                <br />
                <br />
                Media contacts
                <br />
                <a href="mailto:pr@ufgam.com" className={`link ${s.mFooter}`}>
                  pr@ufgam.com
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
    </>
  );
}
