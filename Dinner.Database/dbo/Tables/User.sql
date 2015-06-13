CREATE TABLE [dbo].[User] (
    [ID]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (100) NOT NULL,
    [RoleID]      INT            NOT NULL,
    [CompanyID]   INT            NOT NULL,
    [Login]       NVARCHAR (50)  NULL,
    [Password]    NVARCHAR (50)  NULL,
    [Time]        TIME (0)       DEFAULT (NULL) NULL,
    [NewPassword] NVARCHAR (50)  DEFAULT (NULL) NULL,
    [IsVerified]  BIT            DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_Company] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([ID]),
    CONSTRAINT [FK_Role] FOREIGN KEY ([RoleID]) REFERENCES [dbo].[UserRole] ([ID])
);












GO
CREATE TRIGGER InsertUserSettings on [dbo].[User] AFTER INSERT
AS
BEGIN
  --Build an INSERT statement ignoring inserted.ID and 
  --inserted.ComputedCol.
  INSERT INTO [dbo].[UserSettings] ([UserID])
       SELECT ID
       FROM inserted
END;