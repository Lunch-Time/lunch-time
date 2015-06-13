
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_ChangeOrderItemBoxindex]
	@OrderItemID int,
	@UserID int,
	@Date date,
	@Quantity decimal(5,1),
	@Boxindex smallint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	
	DECLARE @NewOrderItemID int
	DECLARE @ExistingQuantity decimal(5,1)
	DECLARE @OrderItemOutput table ( ID int, Quantity decimal(5,1))
	DECLARE @PrevOrderItemOutput table ( ID int, Quantity decimal(5,1))
	DECLARE @OrderID int
	DECLARE @MenuID int
	DECLARE @ExistingBoxindex int
	
	IF @Quantity < 0
	BEGIN
		THROW 50000, 'New quantity less 0', 1;		   
	END

	-- Get your order on this day
	SELECT @OrderID = [ID]
		FROM [dbo].[Order]
		WHERE [UserID] = @UserID
				AND [Date] = @Date

	IF @OrderID is null
	BEGIN
		THROW 50001, 'Order not found', 1;	
	END

	SELECT @ExistingQuantity = [Quantity],
			@MenuID = [MenuID],
			@ExistingBoxindex = [Boxindex]
		FROM [dbo].[OrderItem]
		WHERE ID = @OrderItemID AND OrderID = @OrderID
			
	IF @ExistingQuantity IS NULL
	BEGIN
		THROW 50002, 'OrderItem not found', 1;	   
	END
	
	IF @Quantity > @ExistingQuantity 
	BEGIN
		THROW 50003, 'New quantity more then order quantity', 1;			   
	END
	
	IF @Boxindex = @ExistingBoxindex
	BEGIN	
		THROW 50004, 'This boxindex already set', 1;	
	END
	
	SELECT @NewOrderItemID = [ID] 
		FROM [dbo].[OrderItem]
		WHERE [MenuID] = @MenuID AND OrderID = @OrderID AND [Boxindex] = @Boxindex
	
	BEGIN TRAN;
	
	IF @NewOrderItemID IS NULL
	BEGIN 
		INSERT INTO [dbo].[OrderItem]
           ([MenuID],[OrderID],[Quantity],[Boxindex])
		OUTPUT inserted.ID, inserted.Quantity INTO @OrderItemOutput
		VALUES
           (@MenuID,@OrderID,@Quantity,@Boxindex)
	END
	ELSE
	BEGIN	
		UPDATE [dbo].[OrderItem]			
			SET [Quantity] = [Quantity] + @Quantity		
			OUTPUT inserted.ID, inserted.Quantity INTO @OrderItemOutput	
			WHERE MenuID = @MenuID AND OrderID = @OrderID AND [Boxindex] = @Boxindex
	END
	
	IF @ExistingQuantity-@Quantity = 0
	BEGIN 
		DELETE FROM [dbo].[OrderItem]
			OUTPUT 0, 0 INTO @PrevOrderItemOutput			
			WHERE ID = @OrderItemID
	END
	ELSE
	BEGIN			 
		UPDATE [dbo].[OrderItem]			
			SET [Quantity] -= @Quantity
			OUTPUT inserted.ID, inserted.Quantity INTO @PrevOrderItemOutput
			WHERE ID = @OrderItemID
	END

	SELECT new.ID as [NewID], new.Quantity as [NewQuantity], old.ID as [OldID], old.Quantity as [OldQuantity]
		FROM @OrderItemOutput new, @PrevOrderItemOutput old
	
	COMMIT TRAN;
END