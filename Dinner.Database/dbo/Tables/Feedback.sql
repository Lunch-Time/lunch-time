CREATE TABLE [dbo].[Feedback] (
    [ID]                INT             IDENTITY (1, 1) NOT NULL,
    [FeedbackTypeID]    SMALLINT        NOT NULL,
    [CompanyID]         INT             NOT NULL,
    [OwnerUserID]       INT             NOT NULL,
    [Message]           NVARCHAR (2000) NOT NULL,
    [CourseID]          INT             DEFAULT (NULL) NULL,
    [ReplyToFeedbackID] INT             DEFAULT (NULL) NULL,
    [IsPublic]          BIT             DEFAULT ((0)) NOT NULL,
    [Date]              DATETIME        NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_Feedback_Company] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([ID]),
    CONSTRAINT [FK_Feedback_Course] FOREIGN KEY ([CourseID]) REFERENCES [dbo].[Course] ([ID]),
    CONSTRAINT [FK_Feedback_Feedback] FOREIGN KEY ([ReplyToFeedbackID]) REFERENCES [dbo].[Feedback] ([ID]),
    CONSTRAINT [FK_Feedback_FeedbackType] FOREIGN KEY ([FeedbackTypeID]) REFERENCES [dbo].[FeedbackType] ([ID]),
    CONSTRAINT [FK_Feedback_User] FOREIGN KEY ([OwnerUserID]) REFERENCES [dbo].[User] ([ID])
);

