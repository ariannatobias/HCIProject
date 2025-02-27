-- Start a transaction (if supported by the online compiler)
--BEGIN;

CREATE TABLE Groups(
GroupID INTEGER NOT NULL,
Group_Name TEXT NOT NULL,
PRIMARY KEY(GroupID)
);

INSERT INTO Groups(GroupID, Group_Name)
VALUES
(1, 'Dallas Group'),
(2, 'Austin Group'),
(3, 'Nashville Group'),
(4, 'Spain Group');

CREATE TABLE Member (
MemberID INTEGER NOT NULL,
GroupID INTEGER NOT NULL,
First_name TEXT NOT NULL,
Last_Name TEXT NOT NULL,
Bank_Account_Number INTEGER NOT NULL,

PRIMARY KEY (MemberID),
FOREIGN KEY(GroupID) references Groups(GroupID)
);

INSERT INTO Member(MemberID, GroupID, First_name, Last_Name, Bank_Account_Number)
VALUES
(1,1,'Mitchell','Tawk', 123456789);


SELECT * FROM Groups;
SELECT * FROM Member;

SELECT First_name,Last_Name
FROM Groups G JOIN Member M ON G.GroupID = M.GroupID
WHERE MemberID = 1;

SELECT First_name,Last_Name,Bank_Account_Number
FROM Groups G JOIN Member M ON G.GroupID = M.GroupID
WHERE MemberID = 1


-- Commit the transaction (if a transaction was started)
--COMMIT;