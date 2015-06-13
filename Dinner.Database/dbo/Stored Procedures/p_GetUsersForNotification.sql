CREATE PROCEDURE [dbo].[p_GetUsersForNotification]
	@FromDate date,
	@ToDate date
AS
BEGIN
	SET NOCOUNT ON;
	
	DECLARE @UsersForNotification TABLE (
		ID int NOT NULL, 
		Name nvarchar(100) NOT NULL,
		Email nvarchar(50) NOT NULL,
		SendWeeklyNotification bit NOT NULL,
		SendDailyNotification bit NOT NULL)
		
	DECLARE @Calendar TABLE ([Date] DATE NOT NULL)
	DECLARE @date DATE, @max_date DATE
	SET @date = @FromDate 
	SET @max_date = @ToDate

	-- create calendar with all days without weekends
	WHILE (@date < @max_date)
	BEGIN
		IF ((DATEPART(dw, @date) + @@DATEFIRST) % 7) NOT IN (0, 1)
		BEGIN
			INSERT INTO @Calendar VALUES (@date)
		END
		SET @date = DATEADD(dy, 1, @date) 
	END
	
	-- select all users with notification
	INSERT INTO @UsersForNotification
		SELECT [User].ID, [User].Name, [User].[Login], [UserSettings].SendWeeklyNotification, [UserSettings].SendDailyNotification
			FROM [User] 
				INNER JOIN [UserSettings] ON [User].ID = [UserSettings].UserID
			WHERE [UserSettings].SendWeeklyNotification = 1 OR [UserSettings].SendDailyNotification = 1
		
	-- select all users-day EXCEPT users-day with lunch		
	SELECT c.[Date], u.ID, u.Name, u.Email, u.SendWeeklyNotification, u.SendDailyNotification
		FROM @Calendar as c
			CROSS JOIN @UsersForNotification u
			LEFT JOIN  [Order] ON u.ID = [Order].[UserID] and [Order].[Date] = c.[Date]
	WHERE [Order].ID IS NULL
	ORDER BY c.[Date]	


END