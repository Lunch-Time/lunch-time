CREATE PROCEDURE [dbo].[p_GetDayTiming]
	@CompanyID int,
	@Date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT [Time], Count(1) AS [Count]
		FROM (
			SELECT (CASE WHEN o.[Time] IS NOT NULL THEN o.[Time] ELSE u.[Time] END) as [Time]
    		FROM [dbo].[Order] o
				INNER JOIN [dbo].[User] u ON u.ID = o.UserID
			WHERE u.CompanyID = @CompanyID AND o.[Date] = @Date
		) as r
		GROUP BY [Time]
END
