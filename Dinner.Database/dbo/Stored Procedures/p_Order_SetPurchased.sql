


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_Order_SetPurchased] 
	@OrderID int,
	@Time time(7),
	@IsPurchased bit
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE [Order]
		SET [IsPurchased] = @IsPurchased,
			[Time] = @Time
		WHERE [Order].ID = @OrderID
END