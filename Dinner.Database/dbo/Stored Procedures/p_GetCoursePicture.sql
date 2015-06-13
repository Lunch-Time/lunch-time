CREATE PROCEDURE [dbo].[p_GetCoursePicture]
	@CompanyID int,
	@CourseID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT Course.ID, Course.CompanyID, Course.Picture
		FROM Course
		WHERE 
			Course.CompanyID = @CompanyID
			AND Course.ID = @CourseID
END