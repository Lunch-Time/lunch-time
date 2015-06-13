CREATE PROCEDURE [dbo].[p_GetCoursePictures]
	@CompanyID int,
	@IncludeDeleted bit
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT Course.ID, Course.CompanyID, Course.Picture
		FROM Course
		WHERE 
			Course.CompanyID = @CompanyID
			AND ( @IncludeDeleted = 1 OR @IncludeDeleted = Course.IsDeleted)
END