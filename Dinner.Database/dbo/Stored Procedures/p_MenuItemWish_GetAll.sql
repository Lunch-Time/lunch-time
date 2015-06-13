

CREATE PROCEDURE [dbo].[p_MenuItemWish_GetAll]
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT [MenuItemWish].[ID] as [MenuItemWishID]
      ,[MenuItemWish].[CustomerUserID]
      ,[MenuItemWish].[MenuItemID]
      ,[MenuItemWish].[Date]
	  ,[MenuItemWish].[CourseCategoryID]
	  ,[Course].[ID] AS CourseID
	  ,[Course].[Name] AS CourseName
	  ,[CourseCategory].[Name] AS CourseCategoryName
	FROM [dbo].[MenuItemWish]
		INNER JOIN [dbo].[Menu] ON [dbo].[Menu].[ID] = [dbo].[MenuItemWish].[MenuItemID]
		INNER JOIN [dbo].[Course] ON [dbo].[Course].[ID] = [dbo].[Menu].[CourseID]
		INNER JOIN [dbo].[CourseCategory] ON [dbo].[Course].[CourseCategoryID] = [dbo].[CourseCategory].[ID]
		WHERE [MenuItemWish].[Date] = @Date
END