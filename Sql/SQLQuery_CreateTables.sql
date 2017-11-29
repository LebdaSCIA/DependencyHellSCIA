use SCIADependencyHell
GO

IF EXISTS (select * from sysobjects where name='DllDependency' and xtype='U') DROP TABLE dbo.DllDependency
GO

IF EXISTS (select * from sysobjects where name='SCIADLL' and xtype='U') DROP TABLE dbo.SCIADLL
GO

IF EXISTS (select * from sysobjects where name='Status' and xtype='U') DROP TABLE dbo.Status
GO

IF EXISTS (select * from sysobjects where name='Category' and xtype='U') DROP TABLE dbo.Category
GO

CREATE TABLE dbo.Status
(
	ID int NOT NULL PRIMARY KEY,
	Name varchar(50),
);
GO

CREATE TABLE dbo.Category
(
	ID int NOT NULL PRIMARY KEY,
	Name varchar(50)
);
GO

CREATE TABLE dbo.SCIADLL
(
    ID int NOT NULL,
    Name varchar(50) NOT NULL,
    Path varchar(1024) NOT NULL,
	Category int NOT NULL,
	Status int NOT NULL,
    Comment varchar(1024),
	LoC int NOT NULL,
	CONSTRAINT PK_SCIADLL PRIMARY KEY NONCLUSTERED (ID),
	CONSTRAINT FK_Category FOREIGN KEY (Category)
	    REFERENCES dbo.Category (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT FK_Status FOREIGN KEY (Status)
		REFERENCES dbo.Status (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
GO

CREATE TABLE dbo.DllDependency
(
	ID int NOT NULL,
	dllSourceID int NOT NULL,
	dllTargetID int NOT NULL,
	isTransient bit NOT NULL,
	CONSTRAINT PK_DllDependency PRIMARY KEY NONCLUSTERED (ID),
	CONSTRAINT FK_dllSourceID FOREIGN KEY (dllSourceID)
	    REFERENCES dbo.SCIADLL (ID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT FK_dllTargetID FOREIGN KEY (dllTargetID)
		REFERENCES dbo.SCIADLL (ID)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

INSERT dbo.Status (ID, Name)  
    VALUES
	(1, 'OK'),
    (2, 'refactoring'),
    (3, 'obsolete')
GO

INSERT dbo.Category (ID, Name)  
    VALUES
	(1, 'unknown'),
	(2, 'Kernel'),
    (3, 'Data model'),
    (4, 'Checks'),
    (5, 'GUI'),
    (6, 'UT'),
    (7, 'Commands'),
	(8, 'Nexis'),
	(9, 'Algorithms'),
	(10, 'Storage')
GO
