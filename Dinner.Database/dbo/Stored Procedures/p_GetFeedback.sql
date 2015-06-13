
CREATE PROCEDURE [dbo].[p_GetFeedback]
    @CompanyID int,
    @OwnerUserID int = NULL,
	@Offset int,
	@Count int
AS
BEGIN
	DECLARE @TableIDs TABLE ([ID] int)
	DECLARE @FirstTable TABLE (
		[ID] int NOT NULL,
		[FeedbackTypeID] smallint NOT NULL, 
		[Name] nvarchar(50) NOT NULL,
		[CompanyID] int NOT NULL, 
		[OwnerUserID] int NOT NULL,
		[Message] nvarchar(2000) NOT NULL,
		[CourseID] int NULL,
		[ReplyToFeedbackID] int NULL,
		[IsPublic] bit NOT NULL,
		[Date] datetime NOT NULL)
		
	INSERT INTO @FirstTable
		SELECT f.[ID]
		  ,f.[FeedbackTypeID]
		  ,ft.Name
		  ,f.[CompanyID]
		  ,f.[OwnerUserID]
		  ,f.[Message]
		  ,f.[CourseID]
		  ,f.[ReplyToFeedbackID]
		  ,f.[IsPublic]
		  ,f.[Date]
		FROM [dbo].[Feedback] f
			INNER JOIN [dbo].[FeedbackType] ft ON f.[FeedbackTypeID] = ft.[ID]
			LEFT JOIN [dbo].[Feedback] f2 ON f2.[ID] = f.[ReplyToFeedbackID]
		WHERE f.[CompanyID] = @CompanyID AND 
			(	(f.[IsPublic] = 1 AND f.[ReplyToFeedbackID] is null)
				OR (@OwnerUserID is null AND f.[ReplyToFeedbackID] is null) 
				OR f.[OwnerUserID] = @OwnerUserID
				--OR (f2.[OwnerUserID] is not null AND f2.[OwnerUserID] = @OwnerUserID)
				)
		ORDER BY [Date]
		OFFSET @Offset ROWS
		FETCH NEXT @Count ROWS ONLY		
				
	INSERT INTO @TableIDs
		SELECT [ID] FROM @FirstTable
		
	INSERT INTO @FirstTable
		SELECT f.[ID]
		  ,f.[FeedbackTypeID]
		  ,ft.Name
		  ,f.[CompanyID]
		  ,f.[OwnerUserID]
		  ,f.[Message]
		  ,f.[CourseID]
		  ,f.[ReplyToFeedbackID]
		  ,f.[IsPublic]
		  ,f.[Date]
		FROM [dbo].[Feedback] f
			INNER JOIN [dbo].[FeedbackType] ft ON f.[FeedbackTypeID] = ft.[ID]
			INNER JOIN @TableIDs temp ON temp.[ID] = f.[ReplyToFeedbackID]

	SELECT * FROM @FirstTable
END