



-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_StatisticByCourseBuyout]
	@CompanyID int,
	@FromDate date,
	@ToDate date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
		SubResult.CategoryID, 
		SubResult.CategoryName,
		SubResult.CourseName, 		
		AVG(SubResult.Limit*1.00) as [AvgLimit],
		AVG(SubResult.[Percent]) as [AvgPercent]
	FROM (
		SELECT 
			[Course].Name as CourseName, 
			[CourseCategory].ID as CategoryID, 
			[CourseCategory].Name as CategoryName, 
			[Menu].Limit,
			1.00 - ([Menu].Limit*1.00 - COUNT([OrderItem].ID))/[Menu].Limit as [Percent]
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
					[Course].Name, 
					[CourseCategory].ID, 
					[CourseCategory].Name 
	) as SubResult
	GROUP BY SubResult.CourseName, SubResult.CategoryID, SubResult.CategoryName
	ORDER BY [AvgPercent] DESC
END