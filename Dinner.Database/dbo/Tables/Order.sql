CREATE TABLE [dbo].[Order] (
    [ID]          INT      IDENTITY (1, 1) NOT NULL,
    [UserID]      INT      NOT NULL,
    [Date]        DATE     NOT NULL,
    [Time]        TIME (7) NULL,
    [IsPurchased] BIT      DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_Order_User] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([ID])
);



