-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_GetUserOrderTime]
	@UserID int,
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT o.[Time] as [OrderTime], u.[Time] as [UserTime]
		FROM [dbo].[Order] o
			INNER JOIN [dbo].[User] u ON u.ID = o.UserID
		WHERE o.[UserID] = @UserID
				AND o.[Date] = @Date
END