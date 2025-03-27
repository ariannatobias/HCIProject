-- inserting sample data into Group table

INSERT INTO "Group" ("GroupName")
VALUES
('Paris Explorers'),
('Tokyo Adventurers'),
('Rome Sightseers'),
('New York Wanderers'),
('Sydney Backpackers'),
('Bali Beach Lovers'),
('Iceland Northern Lights'),
('African Safari Travelers'),
('Swiss Alps Hikers'),
('Caribbean Cruise Enthusiasts');

-- inserting data into Member table
INSERT INTO public."Member"("GroupID", "FirstName", "LastName", "how_much_a_member_needs_to_pay", "how_much_a_member_needs_to_recieve", "difference_between_owed_and_recieved")
VALUES
(1, 'Alice', 'Johnson', 200, 150, 50),
(2, 'Bob', 'Smith', 300, 250, 50),
(3, 'Charlie', 'Brown', 150, 200, -50),
(4, 'David', 'Williams', 400, 350, 50),
(5, 'Eva', 'Miller', 250, 300, -50),
(6, 'Frank', 'Davis', 100, 120, -20),
(7, 'Grace', 'Garcia', 350, 300, 50),
(8, 'Hank', 'Martinez', 500, 450, 50),
(9, 'Ivy', 'Hernandez', 150, 100, 50),
(10, 'Jack', 'Lopez', 300, 350, -50);

-- inserting data into payment recieve table
INSERT INTO public."Payment_Recieve"("Payment_Name", "Payment_type")
VALUES
('Dinner at The Bistro', 'Venmo'),
('Concert Tickets', 'CashApp'),
('Charity Event Entry', 'PayPal'),
('Birthday Party', 'Venmo'),
('Cooking Class Payment', 'PayPal');

--inserting data into payment send table
INSERT INTO public."Payment_Send"("Payment_Name", "Payment_Type")
VALUES
('Event Tickets', 'Venmo'),
('Dinner Payment', 'PayPal'),
('Subscription Fee', 'CashApp'),
('Concert Fund', 'Venmo'),
('Workshop Payment', 'PayPal');

-- Inserting data in member_payment_recieve table
INSERT INTO public."Member_Payment_Recieve"("MemberID", "Payment_Recieve_ID")
VALUES
(1, 1),  -- Member 1 receives payment 1
(2, 2),  -- Member 2 receives payment 2
(3, 3),  -- Member 3 receives payment 3
(4, 4),  -- Member 4 receives payment 4
(5, 5);  -- Member 5 receives payment 5

-- Inserting data in member_payment_send table
INSERT INTO public."Member_Payment_Send"("MemberID", "Payment_Send_ID")
VALUES
(1, 1),  -- Member 1 sends payment 1
(2, 2),  -- Member 2 sends payment 2
(3, 3),  -- Member 3 sends payment 3
(4, 4),  -- Member 4 sends payment 4
(5, 5);  -- Member 5 sends payment 5




