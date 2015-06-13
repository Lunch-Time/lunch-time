

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_StatisticByCourse]
	@CompanyID int,
	@FromDate date,
	@ToDate date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 0 as ID, 
		[CourseCategory].ID as CategoryID, 
		[CourseCategory].Name as CategoryName, 
		[Course].Name as CourseName, 
		COUNT(distinct [Menu].ID) as DayCount,
		COUNT ([Order].ID) as CourseCount, 
		SUM([Course].Price * [OrderItem].Quantity) as TotalPrice
		FROM [Order]
			INNER JOIN [OrderItem] on [Order].ID = [OrderItem].OrderID
			INNER JOIN [Menu] on [Menu].ID = [OrderItem].MenuID
			INNER JOIN [Course] on [Course].ID = [Menu].CourseID
			INNER JOIN [CourseCategory] on [CourseCategory].ID = [Course].CourseCategoryID
			INNER JOIN [User] on [User].ID = [Order].[UserID]
		WHERE 
			[Course].CompanyID = @CompanyID
			AND [Order].[Date] >= @FromDate AND [Order].[Date] < @ToDate
		GROUP BY [Course].Name, [CourseCategory].ID, [CourseCategory].Name
		ORDER BY CategoryID ASC, CourseCount DESC
END