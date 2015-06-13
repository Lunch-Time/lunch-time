


CREATE PROCEDURE [dbo].[p_GetAllOrdersByDate] 
	@CompanyID int,
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [Order].UserID, [Order].[Date], [Order].[Time], [User].Name as UserName, 
		    [OrderItem].ID as OrderItemID, [OrderItem].Quantity, [OrderItem].Boxindex,
			[Course].ID as CourseID, [Course].Name as CourseName,
			[Course].[Description] as CourseDescription, [Course].Price as CoursePrice, Course.[Weight],
			[Course].IsDeleted, [Course].CourseCategoryID, [CourseCategory].[Name] as CourseCategoryName,
			[Order].IsPurchased, [Order].ID as OrderID,
			[IdentityCard].IdentityNumber AS UserIdentityNumber
		FROM [Order]
			INNER JOIN [User] on [Order].UserID = [User].ID
			INNER JOIN [OrderItem] ON [OrderItem].OrderID = [Order].ID
			INNER JOIN [Menu] ON [Menu].ID = [OrderItem].MenuID
			INNER JOIN [Course] ON [Course].ID = [Menu].CourseID
			INNER JOIN [CourseCategory] ON [CourseCategory].ID = [Course].CourseCategoryID
			LEFT JOIN [IdentityCard] ON [IdentityCard].CustomerUserID = [User].ID
 		WHERE 
			[Order].[Date] = @Date AND [Course].CompanyID = @CompanyID
END
