

CREATE PROCEDURE [dbo].[p_MenuItemWish_Delete]
	@CustomerUserID int,
	@MenuItemID int,	
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DELETE FROM [dbo].[MenuItemWish]
      WHERE [CustomerUserID] = @CustomerUserID AND [Date] = @Date AND MenuItemID = @MenuItemID
END