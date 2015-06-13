-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_MarkCourseAsDeleted]
	@CompanyID int,
	@CourseID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    UPDATE [dbo].[Course]
		SET [IsDeleted] = 1
		WHERE [ID] = @CourseID AND [CompanyID] = @CompanyID
END
