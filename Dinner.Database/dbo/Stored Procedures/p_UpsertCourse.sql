
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[p_UpsertCourse]
	@CompanyID int,
	@CourseID int, 
	@CourseCategoryID int,
	@Name nvarchar(100),
	@Description nvarchar(100),
	@Price smallmoney,
	@Weight nvarchar(10) = NULL
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;

	DECLARE @OldName nvarchar(100)
	DECLARE @OldDescription nvarchar(100)
	DECLARE @OldPrice smallmoney
	DECLARE @OldCourseCategoryID int
	DECLARE @IsDeleted bit
	DECLARE @OldWeight nvarchar(10)

	IF @Description IS NULL 
	BEGIN 
		SET @Description = N''
	END

	declare @IdentityOutput table ( ID int )
	
	IF @CourseID > 0
	BEGIN 
		SELECT	@OldName = Course.[Name], 
				@OldDescription = Course.[Description],
				@OldPrice = Course.[Price],
				@OldCourseCategoryID = Course.[CourseCategoryID],
				@IsDeleted = Course.[IsDeleted],
				@OldWeight = Course.[Weight]
			FROM Course
			WHERE [ID] = @CourseID 
				AND [CompanyID] = @CompanyID	
	END

	IF @IsDeleted = 1
	BEGIN
		RAISERROR('Course was deleted', 16, 1);
		RETURN;
	END

	-- Insert new record
	IF @CourseID = 0 OR @OldCourseCategoryID is null
		BEGIN
			INSERT INTO [dbo].[Course]
			   ([CompanyID]
			   ,[Name]
			   ,[Description]
			   ,[Price]
			   ,[CourseCategoryID]
			   ,[IsDeleted]
			   ,[Weight]
			   ,[Picture])
			OUTPUT inserted.ID into @IdentityOutput
			VALUES
			   (@CompanyID
			   ,@Name
			   ,@Description
			   ,@Price
			   ,@CourseCategoryID
			   ,0
			   ,@Weight
			   ,null)
		END
	ELSE -- update record
		BEGIN

			-- simple update
			IF @Price = @OldPrice AND (@Name <> @OldName OR @Description <> @OldDescription OR @Weight <> @OldWeight)
			BEGIN
				UPDATE [dbo].[Course]
					SET [Name] = @Name,
						[Description] = @Description,
						[Weight] = @Weight
					WHERE [ID] = @CourseID AND [CompanyID] = @CompanyID

				INSERT INTO @IdentityOutput VALUES (@CourseID)
			END

			-- create new record and mark as deleted old record
			IF @Price <> @OldPrice
			BEGIN
				BEGIN TRAN

				INSERT INTO [dbo].[Course]
				   ([CompanyID]
				   ,[Name]
				   ,[Description]
				   ,[Price]
				   ,[CourseCategoryID]
				   ,[IsDeleted]
				   ,[Weight]
				   ,[Picture])
				OUTPUT inserted.ID into @IdentityOutput
				VALUES
				   (@CompanyID
				   ,@Name
				   ,@Description
				   ,@Price
				   ,@CourseCategoryID
				   ,0
				   ,@Weight
				   ,null)

				UPDATE [dbo].[Course]
					SET [IsDeleted] = 1
					WHERE [ID] = @CourseID AND [CompanyID] = @CompanyID

				COMMIT TRAN
			END
		END
    
	IF (not exists (select 1 from @IdentityOutput))
	BEGIN
		INSERT INTO @IdentityOutput VALUES (@CourseID)
	END

	SELECT ID from @IdentityOutput
END


