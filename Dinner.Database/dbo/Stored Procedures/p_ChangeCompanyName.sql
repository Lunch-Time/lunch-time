CREATE PROCEDURE p_ChangeCompanyName
	@CompanyID int,
	@Name NVARCHAR(100)
AS 
BEGIN
	UPDATE Company
		SET Name = @Name
		WHERE ID = @CompanyID
END