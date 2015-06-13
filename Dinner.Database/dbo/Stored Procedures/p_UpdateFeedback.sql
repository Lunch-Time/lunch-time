
CREATE PROCEDURE [dbo].[p_UpdateFeedback]
	@ID int,
	@FeedbackTypeID smallint,
    @OwnerUserID int,
    @Message nvarchar(2000),
    @CourseID int = NULL,
    @IsPublic bit = 0
AS
BEGIN
	UPDATE [dbo].[Feedback]
		SET [FeedbackTypeID] = @FeedbackTypeID
           ,[Message] = @Message
           ,[CourseID] = @CourseID
           ,[IsPublic] = @IsPublic
		   ,[Date] = GETUTCDATE()
        WHERE ID = @ID AND [OwnerUserID] = @OwnerUserID    
END