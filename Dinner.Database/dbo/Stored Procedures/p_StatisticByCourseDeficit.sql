


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_StatisticByCourseDeficit]
	@CompanyID int,
	@FromDate date,
	@ToDate date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
		[CourseCategory].ID as CategoryID, 
		[CourseCategory].Name as CategoryName, 
		[Course].ID,
		[Course].Name as CourseName, 
		[Order].[Date],
		COUNT([OrderItem].ID) as [Count],
		[Menu].Limit,
		1.00 - ([Menu].Limit*1.00 - COUNT([OrderItem].ID))/[Menu].Limit as [Percent],
		[Course].Price
	FROM [Order]
			INNER JOIN [OrderItem] on [Order].ID = [OrderItem].OrderID
			INNER JOIN [Menu] on [Menu].ID = [OrderItem].MenuID
			INNER JOIN [Course] on [Course].ID = [Menu].CourseID
			INNER JOIN [CourseCategory] on [CourseCategory].ID = [Course].CourseCategoryID
		WHERE 
			[Course].CompanyID = @CompanyID
			AND [Order].[Date] >= @FromDate AND [Order].[Date] < @ToDate
	GROUP BY [Order].[Date], 
			[Menu].Limit, 
			[Course].ID, 
			[Course].Name, 
			[Course].Price,
			[CourseCategory].ID, 
			[CourseCategory].Name
	HAVING [Menu].Limit - COUNT([OrderItem].ID) <= 1 
		AND 1.00 - ([Menu].Limit*1.00 - COUNT([OrderItem].ID))/[Menu].Limit >= 0.75
	ORDER BY [Percent] DESC
END