



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_GetCourses]
	@CompanyID int,
	@IncludeDeleted bit
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT Course.ID as CourseID, Course.CompanyID as CompanyID, Course.CourseCategoryID,
			CourseCategory.Name as CourseCategoryName, Course.Name, Course.[Description], Course.Price, Course.IsDeleted,
			Course.[Weight]
		FROM Course
			INNER JOIN CourseCategory on CourseCategory.ID = Course.CourseCategoryID
		WHERE 
			Course.CompanyID = @CompanyID
			AND ( @IncludeDeleted = 1 OR @IncludeDeleted = Course.IsDeleted)
END



