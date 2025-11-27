INSERT INTO Employees (name, email, role) VALUES
('Alice Johnson','alice@example.com','admin'),
('Bob Singh','bob@example.com','user'),
('Clara Chen','clara@example.com','user');

INSERT INTO Tasks (title, description, status, dueDate, employeeId) VALUES
('Prepare Q4 report','Compile sales and expenses','in-progress', '2025-12-01', 1),
('Fix bug #412','Null pointer in API','todo', '2025-11-30', 2),
('Design landing page','Create hero & CTA','todo', NULL, 3),
('Deploy v1.1','Hotfix release','done', '2025-11-15', 1);
