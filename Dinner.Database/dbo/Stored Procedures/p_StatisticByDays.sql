

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_StatisticByDays]
	@CompanyID int,
	@FromDate date,
	@ToDate date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT [Order].[Date], 
			COUNT (distinct [User].ID) as UserCount, 
			COUNT ([Order].ID) as CourseCount, 
			SUM([Course].Price * [OrderItem].Quantity) as TotalPrice
		FROM [Order]
			INNER JOIN [OrderItem] on [Order].ID = [OrderItem].OrderID
			INNER JOIN [Menu] on [Menu].ID = [OrderItem].MenuID
			INNER JOIN [Course] on [Course].ID = [Menu].CourseID
			INNER JOIN [User] on [User].ID = [Order].[UserID]
		WHERE 
			[Course].CompanyID = @CompanyID
			AND [Order].[Date] >= @FromDate AND [Order].[Date] < @ToDate
		GROUP BY [Order].[Date]

END