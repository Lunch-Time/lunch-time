-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE ip_ClearDeletedCourses
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRAN;

    DELETE FROM [dbo].[OrderItem] 
		WHERE [MenuID] IN (
			SELECT ID FROM [dbo].[Menu] 
				WHERE [CourseID] IN (
					SELECT [ID] FROM [dbo].[Course] WHERE [IsDeleted] = 1
				)
		)

	DELETE FROM [dbo].[Menu] 
		WHERE [CourseID] IN (
			SELECT [ID] FROM [dbo].[Course] WHERE [IsDeleted] = 1
		)

	DELETE FROM [dbo].[Course] WHERE [IsDeleted] = 1

	COMMIT TRAN;
END
