SELECT G.Group_Name, M.First_name, M.Last_Name, M.Bank_Account_Number
FROM Groups G
JOIN Member M ON G.GroupID = M.GroupID
ORDER BY Group_Name;

SELECT M.First_name, M.Last_Name, G.Group_Name
FROM Member M
JOIN Groups G ON M.GroupID = G.GroupID
ORDER BY Group_Name;

SELECT M.First_name, M.Last_Name, P.Payment_Name, P.Payment_Type
FROM Member M
JOIN Member_payment_send MPS ON M.MemberID = MPS.MemberID
JOIN Payment_send P ON MPS.Payment_send_ID = P.Payment_send_ID;

SELECT M.First_name, M.Last_Name, PR.Payment_Name, PR.Payment_Type
FROM Member M
JOIN Member_payment_recieve MPR ON M.MemberID = MPR.MemberID
JOIN Payment_recieve PR ON MPR.Payment_recieve_ID = PR.Payment_recieve_ID;


