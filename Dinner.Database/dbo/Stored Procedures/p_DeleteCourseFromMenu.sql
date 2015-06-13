CREATE PROCEDURE [dbo].[p_DeleteCourseFromMenu]
	@CourseID int,
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @MenuID int;

    SELECT @MenuID = [ID]
		FROM [dbo].[Menu]
		WHERE [CourseID] = @CourseID AND [Date] = @Date;

	BEGIN TRANSACTION;	

	DELETE [dbo].[OrderItem]
		WHERE [MenuID] = @MenuID;

	DELETE [dbo].[Menu]
		WHERE [ID] = @MenuID;

	COMMIT TRANSACTION;
END

