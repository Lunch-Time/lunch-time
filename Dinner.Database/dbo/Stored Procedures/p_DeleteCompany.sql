CREATE PROCEDURE p_DeleteCompany
	@CompanyID int
AS 
BEGIN
	-- TODO: DELETE ALL TYPES OF COMPANY
	DELETE CompanySettings
		WHERE CompanyID = @CompanyID

	DELETE Company
		WHERE ID = @CompanyID
END