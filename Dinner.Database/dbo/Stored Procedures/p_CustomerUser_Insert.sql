CREATE PROCEDURE p_CustomerUser_Insert
	 @CustomerCompanyID int,
     @Name nvarchar(50),
     @Login nvarchar(50),
     @PasswordMD5 nvarchar(50),
     @RoleID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET XACT_ABORT ON;

	IF EXISTS (SELECT 1 FROM [dbo].[User] WHERE [Login] = @Login)
	BEGIN
		RAISERROR('User already exists', 16, 1);
		RETURN;
	END

    INSERT INTO [dbo].[User]
           ([Name]
           ,[RoleID]
           ,[CompanyID]
           ,[Login]
           ,[Password]
           ,[Time]
           ,[NewPassword]
           ,[IsVerified])
     VALUES
           (@Name
           ,@RoleID
           ,@CustomerCompanyID
           ,@Login
           ,@PasswordMD5
           ,NULL
           ,NULL
           ,0)

	exec ip_IdentityCard_UpdateRelationship @CustomerCompanyID;
END