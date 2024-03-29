import s from './Withdraw.module.css';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { renderToString } from 'react-dom/server';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { alert, defaults, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});
defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 1000;

export default function Withdraw({ locale, messages }) {
  const dispatch = useDispatch();
  const userData = useSelector(authSelectors.getUserData);
  const { withdraws } = userData;
  const [withdrawWay, setWithdrawWay] = useState('null');
  const [recipientName, setRecipientName] = useState(withdraws.recipientName);
  const [transferCountry, setTransferCountry] = useState(
    withdraws.transferCountry,
  );
  const [document, setDocument] = useState(withdraws.document);
  const [accountNumber, setAccountNumber] = useState(withdraws.accountNumber);
  const [swift, setSWIFT] = useState(withdraws.swift);
  const [BankName, setBankName] = useState(withdraws.BankName);
  const [cardNumber, setCardNumber] = useState(withdraws.cardNumber);
  const [cardholder, setCardholder] = useState(withdraws.cardholder);
  const [BTC, setBTC] = useState(withdraws.BTC);
  const [USDT, setUSDT] = useState(withdraws.USDT);
  const [USDC, setUSDC] = useState(withdraws.USDC);

  const showWithdrawWays = e => {
    const withdrawWay = e.target.value;
    setWithdrawWay(withdrawWay);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'recipientName':
        return setRecipientName(value);
      case 'transferCountry':
        return setTransferCountry(value);
      case 'document':
        return setDocument(value);
      case 'accountNumber':
        return setAccountNumber(value);
      case 'swift':
        return setSWIFT(value);
      case 'BankName':
        return setBankName(value);
      case 'cardNumber':
        return setCardNumber(value);
      case 'cardholder':
        return setCardholder(value);
      case 'BTC':
        return setBTC(value);
      case 'USDT':
        return setUSDT(value);
      case 'USDC':
        return setUSDC(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      authOperations.updateWithdrawWay({
        recipientName,
        transferCountry,
        document,
        accountNumber,
        swift,
        BankName,
        cardNumber,
        cardholder,
        BTC,
        USDT,
        USDC,
      }),
    );

    try {
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

  const withdrawalWay = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.withdrawalWay"
        defaultMessage="Withdrawal way"
      />
    </IntlProvider>,
  );
  const withdrawalTransfer = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.withdrawalTransfer"
        defaultMessage="Instant Money Transfer"
      />
    </IntlProvider>,
  );
  const withdrawalBankAccountNumber = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.withdrawalBankAccountNumber"
        defaultMessage="Bank Account Number"
      />
    </IntlProvider>,
  );
  const withdrawalCard = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.withdrawalCard"
        defaultMessage="Card Number"
      />
    </IntlProvider>,
  );
  const withdrawalBTC = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.withdrawalBTC"
        defaultMessage="BTC wallet ERC20"
      />
    </IntlProvider>,
  );
  const withdrawalUSDT = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.withdrawalUSDT"
        defaultMessage="USDT wallet ERC20"
      />
    </IntlProvider>,
  );
  const withdrawalUSDC = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.withdrawalUSDC"
        defaultMessage="USDC wallet ERC20"
      />
    </IntlProvider>,
  );

  const intlRecipientName = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.recipient"
        defaultMessage="Recipient`s First and Last Name"
      />
    </IntlProvider>,
  );
  const intlRecipientCountry = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.recipientCountry"
        defaultMessage="Country"
      />
    </IntlProvider>,
  );
  const intlRecipientDocument = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.recipientDocument"
        defaultMessage="Identity Card Number"
      />
    </IntlProvider>,
  );
  const iban = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.iban"
        defaultMessage="Beneficiary's IBAN"
      />
    </IntlProvider>,
  );
  const bank = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage
        intl
        id="app.beneficiaryBank"
        defaultMessage="Beneficiary`s Bank"
      />
    </IntlProvider>,
  );
  const intlCardholer = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage intl id="app.cardholer" defaultMessage="CARD HOLDER" />
    </IntlProvider>,
  );
  const wallet = renderToString(
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <FormattedMessage intl id="app.wallet" defaultMessage="Wallet" />
    </IntlProvider>,
  );

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <br />
      <div className={s.accountCardHeader}>
        <h2>
          <span className={s.accountHeaderPic}>&#8634;</span>
          <FormattedMessage
            id="app.withdrawal"
            defaultMessage="Funds withdrawal information"
          />
        </h2>
      </div>
      <hr />
      <div className={s.optionWrapper}>
        <select onChange={showWithdrawWays} className={s.option}>
          <option value="null" default hidden>
            {withdrawalWay}
          </option>
          <option value="Transfer">{withdrawalTransfer}</option>
          <option value="Bank">{withdrawalBankAccountNumber}</option>
          <option value="Card">{withdrawalCard}</option>
          <option value="BTC">{withdrawalBTC}</option>
          <option value="USDT">{withdrawalUSDT}</option>
          <option value="USDC">{withdrawalUSDC}</option>
        </select>
      </div>
      {(() => {
        switch (withdrawWay) {
          case 'null':
            break;
          case 'Transfer':
            return (
              <form onSubmit={handleSubmit} className={s.form}>
                <input
                  placeholder={intlRecipientName}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="recipientName"
                  value={recipientName}
                ></input>
                <input
                  placeholder={intlRecipientCountry}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="transferCountry"
                  value={transferCountry}
                ></input>
                <input
                  placeholder={intlRecipientDocument}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="document"
                  value={document}
                ></input>
                <button type="submit" onSubmit={handleSubmit}>
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </button>
              </form>
            );
          // break;
          case 'Bank':
            return (
              <form onSubmit={handleSubmit} className={s.form}>
                <input
                  placeholder={iban}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="accountNumber"
                  value={accountNumber}
                ></input>
                <input
                  placeholder="SWIFT"
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="swift"
                  value={swift}
                ></input>
                <input
                  placeholder={bank}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="BankName"
                  value={BankName}
                ></input>
                <button type="submit">
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </button>
              </form>
            );
          // break;
          case 'Card':
            return (
              <form onSubmit={handleSubmit} className={s.form}>
                <input
                  placeholder={withdrawalCard}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="cardNumber"
                  value={cardNumber}
                ></input>
                <input
                  placeholder={intlCardholer}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="cardholder"
                  value={cardholder}
                ></input>
                <button type="submit">
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </button>
              </form>
            );
          // break;
          case 'BTC':
            return (
              <form onSubmit={handleSubmit} className={s.form}>
                <input
                  placeholder={wallet}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="BTC"
                  value={BTC}
                ></input>
                <button type="submit">
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </button>
              </form>
            );
          // break;
          case 'USDT':
            return (
              <form onSubmit={handleSubmit} className={s.form}>
                <input
                  placeholder={wallet}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="USDT"
                  value={USDT}
                ></input>
                <button type="submit">
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </button>
              </form>
            );
          // break;
          case 'USDC':
            return (
              <form onSubmit={handleSubmit} className={s.form}>
                <input
                  placeholder={wallet}
                  autoComplete="off"
                  type="text"
                  onChange={handleInputChange}
                  name="USDC"
                  value={USDC}
                ></input>
                <button type="submit">
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </button>
              </form>
            );
          // break;

          default:
            break;
        }
      })()}
    </IntlProvider>
  );
}
