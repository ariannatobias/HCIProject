-- 1. Members and Payments They Receive

SELECT
    m."FirstName" || ' ' || m."LastName" AS "Member Name",
    pr."Payment_Name" AS "Payment Received",
    pr."Payment_type" AS "Payment Method"
FROM
    public."Member" m
JOIN
    public."Member_Payment_Recieve" mpr ON m."MemberID" = mpr."MemberID"
JOIN
    public."Payment_Recieve" pr ON mpr."Payment_Recieve_ID" = pr."Payment_Recieve_ID";

-- 2. Members and Payments They Send

SELECT
    m."FirstName" || ' ' || m."LastName" AS "Member Name",
    ps."Payment_Name" AS "Payment Sent",
    ps."Payment_Type" AS "Payment Method"
FROM
    public."Member" m
JOIN
    public."Member_Payment_Send" mps ON m."MemberID" = mps."MemberID"
JOIN
    public."Payment_Send" ps ON mps."Payment_Send_ID" = ps."Payment_Send_ID";


-- 3. Members and Their Groups

SELECT
    m."FirstName" || ' ' || m."LastName" AS "Member Name",
    g."GroupName" AS "Group Name"
FROM
    public."Member" m
JOIN
    public."Group" g ON m."GroupID" = g."GroupID";

-- 4. Full Member Payments (Sent and Received)

SELECT
    m."FirstName" || ' ' || m."LastName" AS "Member Name",
    pr."Payment_Name" AS "Payment Received",
    pr."Payment_type" AS "Payment Method Received",
    ps."Payment_Name" AS "Payment Sent",
    ps."Payment_Type" AS "Payment Method Sent"
FROM
    public."Member" m
LEFT JOIN
    public."Member_Payment_Recieve" mpr ON m."MemberID" = mpr."MemberID"
LEFT JOIN
    public."Payment_Recieve" pr ON mpr."Payment_Recieve_ID" = pr."Payment_Recieve_ID"
LEFT JOIN
    public."Member_Payment_Send" mps ON m."MemberID" = mps."MemberID"
LEFT JOIN
    public."Payment_Send" ps ON mps."Payment_Send_ID" = ps."Payment_Send_ID";

-- 5. Detailed Report of Members, Payments Sent, and Payments Received

SELECT
    m."FirstName" || ' ' || m."LastName" AS "Member Name",
    g."GroupName" AS "Group",
    pr."Payment_Name" AS "Payment Received",
    pr."Payment_type" AS "Payment Method Received",
    ps."Payment_Name" AS "Payment Sent",
    ps."Payment_Type" AS "Payment Method Sent"
FROM
    public."Member" m
JOIN
    public."Group" g ON m."GroupID" = g."GroupID"
LEFT JOIN
    public."Member_Payment_Recieve" mpr ON m."MemberID" = mpr."MemberID"
LEFT JOIN
    public."Payment_Recieve" pr ON mpr."Payment_Recieve_ID" = pr."Payment_Recieve_ID"
LEFT JOIN
    public."Member_Payment_Send" mps ON m."MemberID" = mps."MemberID"
LEFT JOIN
    public."Payment_Send" ps ON mps."Payment_Send_ID" = ps."Payment_Send_ID";

select *
from "Member"



