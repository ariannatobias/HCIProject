-- Start a transaction (if supported by the online compiler)
--BEGIN;

CREATE TABLE Groups(
GroupID SERIAL,
Group_Name TEXT NOT NULL,
PRIMARY KEY(GroupID)
);

-- ----------------------------------------


CREATE TABLE Member (
MemberID SERIAL,
GroupID SERIAL,
First_name TEXT NOT NULL,
Last_Name TEXT NOT NULL,
Bank_Account_Number INTEGER NOT NULL,

PRIMARY KEY (MemberID),
FOREIGN KEY(GroupID) references Groups(GroupID)
);

-- ----------------------------------------

CREATE TABLE Payment_send (
	Payment_send_ID SERIAL,
	Payment_Name TEXT NOT NULL,
	Payment_Type TEXT NOT NULL,

	PRIMARY KEY(Payment_send_ID)
);

-- ----------------------------------------

CREATE TABLE Payment_recieve (
	Payment_recieve_ID SERIAL,
	Payment_Name TEXT NOT NULL,
	Payment_Type TEXT NOT NULL,

	PRIMARY KEY(Payment_recieve_ID)
);

-- ----------------------------------------

CREATE TABLE Member_payment_send (
	Member_payment_send_ID SERIAL,
	MemberID SERIAL,
	Payment_send_ID SERIAL,

	PRIMARY KEY(Member_payment_send_ID),
	FOREIGN KEY(MemberID) REFERENCES Member(MemberID),
	FOREIGN KEY(Payment_send_ID) REFERENCES Payment(Payment_send_ID)
);

-- ----------------------------------------

CREATE TABLE Member_payment_recieve (
	Member_payment_recieve_ID SERIAL,
	MemberID SERIAL,
	Payment_recieve_ID SERIAL,

	PRIMARY KEY(Member_payment_recieve_ID),
	FOREIGN KEY(MemberID) REFERENCES Member(MemberID),
	FOREIGN KEY(Payment_recieve_ID) REFERENCES Payment(Payment_recieve_ID)
);

-- ----------------------------------------




-- Commit the transaction (if a transaction was started)
--COMMIT;