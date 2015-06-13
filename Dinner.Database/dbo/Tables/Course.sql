CREATE TABLE [dbo].[Course] (
    [ID]               INT            IDENTITY (1, 1) NOT NULL,
    [CompanyID]        INT            NOT NULL,
    [Name]             NVARCHAR (100) NOT NULL,
    [Description]      NVARCHAR (100) NOT NULL,
    [Price]            SMALLMONEY     NOT NULL,
    [CourseCategoryID] INT            NOT NULL,
    [IsDeleted]        BIT            DEFAULT ((0)) NOT NULL,
    [Weight]           NVARCHAR (10)  DEFAULT (NULL) NULL,
    [Picture]          IMAGE          DEFAULT (NULL) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_Company_Course] FOREIGN KEY ([CompanyID]) REFERENCES [dbo].[Company] ([ID]),
    CONSTRAINT [FK_CourseCategory_Course] FOREIGN KEY ([CourseCategoryID]) REFERENCES [dbo].[CourseCategory] ([ID])
);



