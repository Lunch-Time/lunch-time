

CREATE PROCEDURE [dbo].[p_DeleteFeedback]
	@ID int,
    @OwnerUserID int
AS
BEGIN
	DELETE FROM [dbo].[Feedback]
        WHERE ID = @ID AND OwnerUserID = @OwnerUserID 
END