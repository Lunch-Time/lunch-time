CREATE TABLE [dbo].[IdentityCard] (
    [CustomerCompanyID] INT           NOT NULL,
    [IdentityNumber]    NVARCHAR (20) NOT NULL,
    [CustomerUserID]    INT           NULL,
    [PublicNumber]      NVARCHAR (20) NULL,
    [Email]             NVARCHAR (50) NULL,
    [Name]              NVARCHAR (50) NULL,
    CONSTRAINT [PK_IdentityCard] PRIMARY KEY CLUSTERED ([CustomerCompanyID] ASC, [IdentityNumber] ASC),
    CONSTRAINT [FK_IdentityCard_CustomerCompany] FOREIGN KEY ([CustomerCompanyID]) REFERENCES [dbo].[Company] ([ID]),
    CONSTRAINT [FK_IdentityCard_CustomerUser] FOREIGN KEY ([CustomerUserID]) REFERENCES [dbo].[User] ([ID])
);





