
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_Order_Delete]
	@OrderID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET XACT_ABORT ON;

	DECLARE @MenuIDOutput table ( MenuID int )

	BEGIN TRAN;

	DELETE [dbo].[OrderItem]
		OUTPUT [DELETED].MenuID into @MenuIDOutput
		WHERE [OrderID] = @OrderID

	DELETE 
		FROM [dbo].[Order]
		WHERE [ID] = @OrderID

	COMMIT TRAN;

	SELECT Limit, coalesce(SUM(Quantity),0) as RestQuantity, 0 as CourseBoxQuantity
		FROM [dbo].[OrderItem]
			INNER JOIN [dbo].[Menu] ON [dbo].[OrderItem].[MenuID] = [dbo].[Menu].[ID]
		WHERE [MenuID] in (select MenuID FROM @MenuIDOutput)
		GROUP BY [dbo].[Menu].[Limit]
	
END