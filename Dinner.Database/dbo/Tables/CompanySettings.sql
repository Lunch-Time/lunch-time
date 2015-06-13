CREATE TABLE [dbo].[CompanySettings] (
    [CompanyID]               INT NOT NULL,
    [ShowMenuWithImages]      BIT DEFAULT ((0)) NOT NULL,
    [ShowMenuWithDescription] BIT DEFAULT ((0)) NOT NULL,
    [ShowMenuWithWeight]      BIT DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([CompanyID] ASC),
    CONSTRAINT [FK_Company_CompanySettings] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([ID])
);

