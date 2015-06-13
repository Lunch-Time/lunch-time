

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_UpsertCourseToMenu]
	@CourseID int, 
	@Date date,
	@Limit decimal(5,1)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    DECLARE @MenuID int

	-- Get Course from menu on this day
	SELECT @MenuID = [ID]
		FROM [dbo].[Menu]
		WHERE [CourseID] = @CourseID
				AND [Date] = @Date

	IF @MenuID IS NULL
	BEGIN
		INSERT INTO [dbo].[Menu]
           ([CourseID],[Date],[Limit])
		OUTPUT inserted.ID AS ID
		VALUES
           (@CourseID,@Date,@Limit)
	END
	ELSE
	BEGIN
		UPDATE [dbo].[Menu]			
			SET [Limit] = @Limit
			OUTPUT inserted.ID AS ID
			WHERE [ID] = @MenuID
	END
END

