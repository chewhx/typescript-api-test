CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    isSuspended BOOLEAN DEFAULT FALSE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO students (id, email)
VALUES
    (1, 'studentmac@gmail.com'),
    (2, 'studentkendall@gmail.com'),
    (3, 'studentvidal@gmail.com'),
    (4, 'studentorie@gmail.com'),
    (5, 'studentalexandro@gmail.com'),
    (6, 'studentdestinee@gmail.com'),
    (7, 'studentdurward@gmail.com'),
    (8, 'studentjuana@gmail.com'),
    (9, 'studentnickolas@gmail.com'),
    (10, 'studentcarissa@gmail.com');

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO teachers (id, email)
VALUES
    (1, 'teacherken@gmail.com'),
    (2, 'teacherkaia@gmail.com'),
    (3, 'teacherturner@gmail.com'),
    (4, 'teachershanna@gmail.com'),
    (5, 'teacherora@gmail.com'),
    (6, 'teachergladyce@gmail.com'),
    (7, 'teacherrachael@gmail.com'),
    (8, 'teachertremaine@gmail.com'),
    (9, 'teacherfreeman@gmail.com'),
    (10, 'teacherfanny@gmail.com');

CREATE TABLE teacher_students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacherId INT NOT NULL,
    studentId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (teacherId, studentId),
    FOREIGN KEY (teacherId) REFERENCES teachers (id),
    FOREIGN KEY (studentId) REFERENCES students (id)
);