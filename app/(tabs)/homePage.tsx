import React from "react";
import { DivWrapper } from "./DivWrapper";
import { ElementAvatars } from "./ElementAvatars";
import { ElementAvatarsWrapper } from "./ElementAvatarsWrapper";
import { ElementDAvatars } from "./ElementDAvatars";
import { ElementDAvatarsWrapper } from "./ElementDAvatarsWrapper";
import { GmailGroups } from "./GmailGroups";
import { Home } from "./Home";
import { Person } from "./Person"; 
import { Plus } from "./Plus";
import image2 from "./image-2.svg";
import profitIcon1 from "./profit-icon-1.png";
import "./style.css";

export const WelcomePage = () => {
  return (
    <div className="welcome-container" style={{ backgroundColor: "#F7F7F9" }}>
      {/* Header */}
      <header className="welcome-header">
        <div className="logo-container">
          <img src={image2} alt="Divvy Logo" className="logo" />
        </div>
        <h1 className="welcome-title" style={{ color: "#E86A92" }}>Welcome, User!</h1>
      </header>

      {/* Balance Summary Card */}
      <div className="balance-card">
        <h2 className="section-title">Balance Summary</h2>
        <div className="balance-info">
          <div className="balance-item">
            <span className="balance-label">You Owe:</span>
            <span className="balance-amount negative" style={{ color: "#E86A92" }}>$21.30</span>
          </div>
          <div className="balance-item">
            <span className="balance-label">Owed To You:</span>
            <span className="balance-amount positive" style={{ color: "#41E2BA" }}>$12.15</span>
          </div>
          <button className="settle-button" style={{ backgroundColor: "#F7E733", color: "#333" }}>
            Settle Up
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-card">
        <h2 className="section-title">Recent Transactions</h2>
        <div className="transaction-item">
          <Person className="avatar-icon" />
          <div className="transaction-details">
            <span className="transaction-text">You Paid Josh:</span>
            <span className="transaction-amount" style={{ color: "#41E2BA" }}>$14.50</span>
          </div>
        </div>
        <button className="add-transaction-button" style={{ backgroundColor: "#41E2BA" }}>
          <Plus className="plus-icon" /> Add Expense
        </button>
      </div>

      {/* Groups */}
      <div className="groups-card">
        <h2 className="section-title">Groups</h2>
        <div className="group-item">
          <ElementAvatarsWrapper className="group-avatars">
            <ElementAvatars />
          </ElementAvatarsWrapper>
          <div className="group-details">
            <span className="group-name">Dallas Trip</span>
            <span className="group-type">Group</span>
          </div>
        </div>
        <button className="create-group-button" style={{ backgroundColor: "#E86A92" }}>
          <Plus className="plus-icon" /> Create Group
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-item active">
          <Home className="nav-icon" />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <GmailGroups className="nav-icon" />
          <span>Groups</span>
        </div>
        <div className="nav-item">
          <Person className="nav-icon" />
          <span>Profile</span>
        </div>
      </nav>

      {/* Status Bar */}
      <div className="status-bar">
        <span className="time">9:41</span>
      </div>
    </div>
  );
};