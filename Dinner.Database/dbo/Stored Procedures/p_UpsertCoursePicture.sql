CREATE PROCEDURE [dbo].[p_UpsertCoursePicture]
	@CompanyID int,
	@CourseID int, 
	@Picture image
AS
BEGIN
	UPDATE Course
		SET Picture = @Picture
		WHERE [ID] = @CourseID 
			AND [CompanyID] = @CompanyID	
END