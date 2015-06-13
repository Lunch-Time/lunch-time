





-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_UserOrder_GetByID] 
	@OrderID int,
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT [Order].ID as OrderID, Menu.ID as MenuID, Menu.CourseID as CourseID, Course.CompanyID as CompanyID, Course.CourseCategoryID,
			[Order].[UserID] as UserID, [Order].[Date] as OrderDate, [Order].[Time] as OrderTime, 
			[OrderItem].ID as OrderItemID, [OrderItem].Quantity, [OrderItem].Boxindex,
			CourseCategory.Name as CourseCategoryName, Course.[Name], Course.[Description], Course.[Price], Course.[Weight],
			Menu.Date as [Date], [Order].IsPurchased
		FROM [Order]
			INNER JOIN OrderItem on [Order].ID = OrderItem.OrderID
			INNER JOIN Menu on Menu.ID = OrderItem.MenuID
			INNER JOIN Course on Course.ID = Menu.CourseID
			INNER JOIN CourseCategory on CourseCategory.ID = Course.CourseCategoryID
		WHERE 
			[Order].[ID] = @OrderID
			AND [Order].[Date] = @Date			
			
END