CREATE TABLE Contacts (
    Id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    Name TEXT NOT NULL, 
    Email TEXT NOT NULL, 
    Phone VARCHAR(10) NOT NULL,
    Message TEXT
);

INSERT INTO Contacts (Name, Email, Phone, Message) 
VALUES ('Test Entry', 'tentry4567@gmail.com', '2343434567', 'Hello, this is a test message!');