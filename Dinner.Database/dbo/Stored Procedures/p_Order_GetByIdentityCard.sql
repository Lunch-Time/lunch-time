




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_Order_GetByIdentityCard] 
	@SupplierCompanyID int,
	@Date date,
	@IdentityCard nvarchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT [Order].ID as OrderID, Menu.ID as MenuID, Menu.CourseID as CourseID, 
			Course.CompanyID as CompanyID, Course.CourseCategoryID, [Course].Name as CourseName,
			[Course].[Description] as CourseDescription, [Course].Price as CoursePrice, [Course].IsDeleted, 
			[Order].[UserID] as UserID, [Order].[Date] as OrderDate, [Order].[Time] as OrderTime, [User].Name as UserName,
			[OrderItem].ID as OrderItemID, [OrderItem].Quantity, [OrderItem].Boxindex,
			CourseCategory.Name as CourseCategoryName, Course.Name, Course.Description, Course.Price, 
			Menu.Date as [Date], [Order].IsPurchased
		FROM [IdentityCard]
			INNER JOIN [User] on [IdentityCard].CustomerUserID = [User].ID
			INNER JOIN [Order] on [User].ID = [Order].UserID
			INNER JOIN OrderItem on [Order].ID = OrderItem.OrderID
			INNER JOIN Menu on Menu.ID = OrderItem.MenuID
			INNER JOIN Course on Course.ID = Menu.CourseID
			INNER JOIN CourseCategory on CourseCategory.ID = Course.CourseCategoryID
		WHERE 
			[IdentityCard].IdentityNumber = @IdentityCard
			AND Course.CompanyID = @SupplierCompanyID
			AND [Order].[Date] = @Date
END