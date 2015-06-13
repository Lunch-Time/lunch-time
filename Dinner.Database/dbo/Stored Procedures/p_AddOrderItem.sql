


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_AddOrderItem]
	@UserID int,
	@CourseID int,
	@Date date,
	@Quantity decimal(5,1)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET XACT_ABORT ON;

	DECLARE @ExistingQuantity decimal(5,1)
	DECLARE @MenuID int
	DECLARE @OrderID int
	DECLARE @Limit int
	DECLARE @IdentityOutput table ( ID int )
	DECLARE @OrderItemOutput table ( ID int, Quantity decimal(5,1) )
	DECLARE @RestQuantity decimal(5,1)

	-- Get Course from menu on this day
	SELECT @MenuID = [ID], @Limit = [Limit]
		FROM [dbo].[Menu]
		WHERE [CourseID] = @CourseID
				AND [Date] = @Date
				
	IF @MenuID IS NULL
	BEGIN
		THROW 50000, 'Menu not found', 1;	
	END

	-- Get your order on this day
	SELECT @OrderID = [ID]
		FROM [dbo].[Order]
		WHERE [UserID] = @UserID
				AND [Date] = @Date

	IF @OrderID is null
	BEGIN
		INSERT INTO [dbo].[Order]
			OUTPUT inserted.ID into @IdentityOutput
			VALUES (@UserID, @Date, null, 0)

		SELECT @OrderID = ID FROM @IdentityOutput
	END

	SELECT @RestQuantity = coalesce(SUM(Quantity),0)
		FROM [dbo].[OrderItem]
		WHERE MenuID = @MenuID

	IF @RestQuantity + @Quantity > @Limit
	BEGIN 
		THROW 50001, 'Course limit error', 1;	
	END 	

	SELECT @ExistingQuantity = [OrderItem].[Quantity] 
		FROM [dbo].[OrderItem]
		WHERE MenuID = @MenuID AND OrderID = @OrderID AND Boxindex=0
			
	IF @ExistingQuantity IS NULL
	BEGIN
		INSERT INTO [dbo].[OrderItem]
				([MenuID]
				,[OrderID]
				,[Quantity])
			OUTPUT inserted.ID, inserted.Quantity INTO @OrderItemOutput
			VALUES
				(@MenuID
				,@OrderID
				,@Quantity)				   
	END
	ELSE
	BEGIN
		UPDATE [dbo].[OrderItem]			
			SET [Quantity] = [Quantity] + @Quantity
			OUTPUT inserted.ID, inserted.Quantity INTO @OrderItemOutput
			WHERE MenuID = @MenuID AND OrderID = @OrderID AND Boxindex=0
	END

	SELECT q.ID, @Limit as Limit, (@RestQuantity + @Quantity) as RestQuantity, q.Quantity as CourseBoxQuantity
		FROM @OrderItemOutput as q

END