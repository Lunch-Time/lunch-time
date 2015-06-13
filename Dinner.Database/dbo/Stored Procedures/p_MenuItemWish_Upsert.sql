
CREATE PROCEDURE [dbo].[p_MenuItemWish_Upsert]
	@CustomerUserID int,
	@MenuItemID int,	
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @CourseCategoryID int
	
	SELECT @CourseCategoryID = [dbo].[Course].[CourseCategoryID]
		FROM [dbo].[Menu]
			INNER JOIN [dbo].[Course] ON [dbo].[Course].[ID] = [dbo].[Menu].[CourseID]
		WHERE [dbo].[Menu].[ID] = @MenuItemID

	IF NOT EXISTS (SELECT [ID] FROM [dbo].[MenuItemWish] 
						WHERE [CustomerUserID] = @CustomerUserID 
							AND [Date] = @Date 
							AND CourseCategoryID = @CourseCategoryID)
	BEGIN
    INSERT INTO [dbo].[MenuItemWish]
           ([CustomerUserID]
           ,[MenuItemID]
           ,[Date]
		   ,[CourseCategoryID])
     VALUES
           (@CustomerUserID
           ,@MenuItemID
           ,@Date
		   ,@CourseCategoryID)
	END
	ELSE
	BEGIN
		UPDATE [dbo].[MenuItemWish]
		SET [MenuItemID] = @MenuItemID
		WHERE [CustomerUserID] = @CustomerUserID AND [Date] = @Date AND CourseCategoryID = @CourseCategoryID
	END
END