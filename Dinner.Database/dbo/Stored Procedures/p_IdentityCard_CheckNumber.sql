
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_IdentityCard_CheckNumber] 
	@IdentityCard nvarchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
		[User].[Name] as UserName
		,[User].[Login] as UserEmail
		,[IdentityCard].[CustomerCompanyID]
		,[IdentityCard].[IdentityNumber]
		,[IdentityCard].[CustomerUserID]
		,[IdentityCard].[PublicNumber]
		,[IdentityCard].[Email] as CardHolderEmail
		,[IdentityCard].[Name] as CardHolderName
	FROM [dbo].[IdentityCard] 
			LEFT JOIN [User] on [IdentityCard].CustomerUserID = [User].ID
	WHERE [IdentityCard].IdentityNumber = @IdentityCard

END