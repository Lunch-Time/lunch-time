
CREATE PROCEDURE [dbo].[p_StatisticByUsers]
	@CompanyID int,
	@FromDate date,
	@ToDate date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT [User].ID, 
			[User].Name, 
			COUNT ([OrderItem].ID) as CourseCount, 
			COUNT (distinct [Order].[Date]) as DaysCount, 
			SUM(Course.Price * OrderItem.Quantity) as TotalPrice
		FROM [User]
			LEFT JOIN [Order] on [User].ID = [Order].[UserID]
			LEFT JOIN OrderItem on [Order].ID = OrderItem.OrderID
			LEFT JOIN Menu on Menu.ID = OrderItem.MenuID
			LEFT JOIN Course on Course.ID = Menu.CourseID			
		WHERE 
			[Course].CompanyID = @CompanyID
			AND ([Order].[Date] is NULL OR 
				([Order].[Date] >= @FromDate AND [Order].[Date] < @ToDate))
		GROUP BY [User].ID, [User].Name
END