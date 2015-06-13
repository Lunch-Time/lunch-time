

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_SetOrderTime]
	@UserID int,
	@Date date,
	@Time time
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @OrderID int

	SELECT @OrderID = [ID]
		FROM [dbo].[Order]
		WHERE [UserID] = @UserID
				AND [Date] = @Date

	IF @OrderID is null
	BEGIN
		INSERT INTO [dbo].[Order]
			VALUES (@UserID, @Date, @Time, 0)
	END
	ELSE
	BEGIN
		UPDATE [dbo].[Order]
			SET [Time] = @Time
			WHERE [UserID] = @UserID
				AND [Date] = @Date 
	END
END
