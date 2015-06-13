CREATE TABLE [dbo].[UserSettings] (
    [UserID]                       INT      NOT NULL,
    [Time]                         TIME (0) NULL,
    [SendAdminNotification]        BIT      DEFAULT ((0)) NOT NULL,
    [SendChangedOrderNotification] BIT      DEFAULT ((0)) NOT NULL,
    [SendWeeklyNotification]       BIT      DEFAULT ((0)) NOT NULL,
    [SendDailyNotification]        BIT      DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserID] ASC),
    CONSTRAINT [FK_UserSettings_User] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([ID]) ON DELETE CASCADE
);



