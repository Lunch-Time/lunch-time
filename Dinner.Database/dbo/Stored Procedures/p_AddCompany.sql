CREATE PROCEDURE p_AddCompany
	@Name NVARCHAR(100)
AS
BEGIN
	DECLARE @IdentityOutput table ( ID int )

	INSERT INTO Company (Name)
		OUTPUT inserted.ID into @IdentityOutput
		VALUES(@Name)

	INSERT INTO CompanySettings (CompanyID)
		SELECT ID FROM @IdentityOutput
		
	SELECT ID FROM @IdentityOutput
END