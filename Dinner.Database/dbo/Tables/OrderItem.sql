CREATE TABLE [dbo].[OrderItem] (
    [ID]       INT            IDENTITY (1, 1) NOT NULL,
    [MenuID]   INT            NOT NULL,
    [OrderID]  INT            NOT NULL,
    [Quantity] DECIMAL (5, 1) NOT NULL,
    [Boxindex] SMALLINT       DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_OrderItem_Menu] FOREIGN KEY ([MenuID]) REFERENCES [dbo].[Menu] ([ID]),
    CONSTRAINT [FK_OrderItem_Order] FOREIGN KEY ([OrderID]) REFERENCES [dbo].[Order] ([ID])
);



