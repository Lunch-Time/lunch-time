CREATE PROCEDURE [dbo].[p_DeleteOrderItem]
	@UserID int,
	@Date date,
	@OrderItemID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @MenuIDOutput table ( MenuID int )

	DELETE [dbo].[OrderItem]
		OUTPUT [DELETED].MenuID into @MenuIDOutput
		WHERE [ID] = @OrderItemID 
			AND [OrderID] in (
				SELECT [ID]
					FROM [dbo].[Order]
					WHERE [UserID] = @UserID AND [Date] = @Date)

	SELECT Limit, coalesce(SUM(Quantity),0) as RestQuantity, 0 as CourseBoxQuantity
		FROM [dbo].[OrderItem]
			INNER JOIN [dbo].[Menu] ON [dbo].[OrderItem].[MenuID] = [dbo].[Menu].[ID]
		WHERE [MenuID] in (select MenuID FROM @MenuIDOutput)
		GROUP BY [dbo].[Menu].[Limit]
END