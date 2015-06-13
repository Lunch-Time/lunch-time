CREATE TABLE [dbo].[EventLog]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Date] DATETIME NOT NULL, 
    [EventType] VARCHAR(32) NOT NULL, 
    [Message] NVARCHAR(MAX) NOT NULL, 
    [Details] NVARCHAR(MAX) NULL, 
    [Principal] NVARCHAR(50) NULL
)

GO

CREATE NONCLUSTERED INDEX [IX_EventLog_Date_EventType] ON [dbo].[EventLog] ([Date], [EventType])

GO

CREATE NONCLUSTERED INDEX [IX_EventLog_Principal] ON [dbo].[EventLog] ([Principal])
