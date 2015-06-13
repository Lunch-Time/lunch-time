


CREATE PROCEDURE [dbo].[p_GetDayMenu]
	@CompanyID int,
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT Menu.ID as MenuID, Menu.CourseID as CourseID, Course.CompanyID as CompanyID, Course.CourseCategoryID,
			CourseCategory.Name as CourseCategoryName, 
			Course.Name, Course.[Description], Course.Price, Course.[Weight] as [Weight],
			Menu.[Date] as [Date], Menu.Limit as [Limit],
			(SELECT coalesce(SUM(Quantity),0) FROM [dbo].[OrderItem] WHERE MenuID = Menu.ID) as OrderedQuantity
		FROM Menu
			INNER JOIN Course on Course.ID = Menu.CourseID
			INNER JOIN CourseCategory on CourseCategory.ID = Course.CourseCategoryID
		WHERE 
			Course.CompanyID = @CompanyID
			AND Menu.Date = @Date
END
