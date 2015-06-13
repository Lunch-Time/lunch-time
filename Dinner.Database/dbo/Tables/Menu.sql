CREATE TABLE [dbo].[Menu] (
    [ID]       INT  IDENTITY (1, 1) NOT NULL,
    [CourseID] INT  NOT NULL,
    [Date]     DATE NOT NULL,
    [Limit]    INT  DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_Menu_Course] FOREIGN KEY ([CourseID]) REFERENCES [dbo].[Course] ([ID])
);

