
CREATE PROCEDURE [dbo].[p_AddFeedback]
	@FeedbackTypeID smallint,
    @CompanyID int,
    @OwnerUserID int,
    @Message nvarchar(2000),
    @CourseID int = NULL,
    @ReplyToFeedbackID int = NULL,
    @IsPublic bit = 0
AS
BEGIN
	INSERT INTO [dbo].[Feedback]
           ([FeedbackTypeID]
           ,[CompanyID]
           ,[OwnerUserID]
           ,[Message]
           ,[CourseID]
           ,[ReplyToFeedbackID]
           ,[IsPublic]
		   ,[Date])
	 OUTPUT INSERTED.ID
     VALUES
           (@FeedbackTypeID
           ,@CompanyID
           ,@OwnerUserID
           ,@Message
           ,@CourseID
           ,@ReplyToFeedbackID
           ,@IsPublic
		   ,GETUTCDATE())
END