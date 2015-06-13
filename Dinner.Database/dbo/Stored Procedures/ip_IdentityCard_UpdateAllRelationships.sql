CREATE PROCEDURE [dbo].[ip_IdentityCard_UpdateAllRelationships]
AS
BEGIN
	UPDATE it			
		SET it.CustomerUserID = cu.[ID]
		FROM [IdentityCard] it 
			INNER JOIN [User] cu ON cu.[Login] = it.[Email]
		WHERE it.CustomerUserID IS NULL
END