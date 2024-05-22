import React from "react";
import PropTypes from "prop-types";
import "./style.css"; // Créez un fichier CSS pour ce composant si nécessaire

const AccountSection = ({ title, amount, description, accountId }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title} ({accountId})</h3>
        <p className="account-amount">${amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};

AccountSection.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
};

export default AccountSection;