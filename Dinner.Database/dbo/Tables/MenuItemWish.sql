CREATE TABLE [dbo].[MenuItemWish] (
    [ID]               INT  IDENTITY (1, 1) NOT NULL,
    [CustomerUserID]   INT  NOT NULL,
    [MenuItemID]       INT  NOT NULL,
    [Date]             DATE NOT NULL,
    [CourseCategoryID] INT  DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    CONSTRAINT [FK_MenuItemWish_CourseCategory] FOREIGN KEY ([CourseCategoryID]) REFERENCES [dbo].[CourseCategory] ([ID]),
    CONSTRAINT [FK_MenuItemWish_Menu] FOREIGN KEY ([MenuItemID]) REFERENCES [dbo].[Menu] ([ID]),
    CONSTRAINT [FK_MenuItemWish_User] FOREIGN KEY ([CustomerUserID]) REFERENCES [dbo].[User] ([ID])
);



