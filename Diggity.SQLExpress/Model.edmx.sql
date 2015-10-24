
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 09/28/2015 09:37:31
-- Generated from EDMX file: C:\Users\eric.mashlan\Documents\GitHub\Diggity\Diggity.SQLExpress\Model.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [WodDiggity];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetRole]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRole];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_ExerciseTypeExercise]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Exercises] DROP CONSTRAINT [FK_ExerciseTypeExercise];
GO
IF OBJECT_ID(N'[dbo].[fk_ExerciseWendlerGroup]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Exercises] DROP CONSTRAINT [fk_ExerciseWendlerGroup];
GO
IF OBJECT_ID(N'[dbo].[FK_PersonalRecordHistoryAspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PersonalRecords] DROP CONSTRAINT [FK_PersonalRecordHistoryAspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_PersonalRecordHistoryExercise]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PersonalRecords] DROP CONSTRAINT [FK_PersonalRecordHistoryExercise];
GO
IF OBJECT_ID(N'[dbo].[FK_PersonalRecordHistoryUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PersonalRecords] DROP CONSTRAINT [FK_PersonalRecordHistoryUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_TemplateDaysDayOfWeek]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TemplateDays] DROP CONSTRAINT [FK_TemplateDaysDayOfWeek];
GO
IF OBJECT_ID(N'[dbo].[FK_TemplateDaysWorkoutSet]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkoutSets] DROP CONSTRAINT [FK_TemplateDaysWorkoutSet];
GO
IF OBJECT_ID(N'[dbo].[FK_UnitOfMeasureExerciseType_ExerciseType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UnitOfMeasureExerciseType] DROP CONSTRAINT [FK_UnitOfMeasureExerciseType_ExerciseType];
GO
IF OBJECT_ID(N'[dbo].[FK_UnitOfMeasureExerciseType_UnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UnitOfMeasureExerciseType] DROP CONSTRAINT [FK_UnitOfMeasureExerciseType_UnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_UserPreferenceAspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserPreferences] DROP CONSTRAINT [FK_UserPreferenceAspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_UserPreferenceExerciseType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserPreferences] DROP CONSTRAINT [FK_UserPreferenceExerciseType];
GO
IF OBJECT_ID(N'[dbo].[FK_UserPreferenceUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserPreferences] DROP CONSTRAINT [FK_UserPreferenceUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_WodExerciseExercise]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WodExercises] DROP CONSTRAINT [FK_WodExerciseExercise];
GO
IF OBJECT_ID(N'[dbo].[FK_WodExerciseUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WodExercises] DROP CONSTRAINT [FK_WodExerciseUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_WodExerciseWodRound]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WodExercises] DROP CONSTRAINT [FK_WodExerciseWodRound];
GO
IF OBJECT_ID(N'[dbo].[FK_WodRoundWod]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WodRounds] DROP CONSTRAINT [FK_WodRoundWod];
GO
IF OBJECT_ID(N'[dbo].[FK_WodUnitOfMeasureWodUnitType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WodUnitOfMeasures] DROP CONSTRAINT [FK_WodUnitOfMeasureWodUnitType];
GO
IF OBJECT_ID(N'[dbo].[FK_WodWodUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Wods] DROP CONSTRAINT [FK_WodWodUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutAspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Workouts] DROP CONSTRAINT [FK_WorkoutAspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutSetExercise]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkoutSets] DROP CONSTRAINT [FK_WorkoutSetExercise];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutSetUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkoutSets] DROP CONSTRAINT [FK_WorkoutSetUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutTemplateAspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkoutTemplates] DROP CONSTRAINT [FK_WorkoutTemplateAspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutTemplateTemplateDays]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TemplateDays] DROP CONSTRAINT [FK_WorkoutTemplateTemplateDays];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutWorkoutSet]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkoutSets] DROP CONSTRAINT [FK_WorkoutWorkoutSet];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutWorkoutTemplate]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Workouts] DROP CONSTRAINT [FK_WorkoutWorkoutTemplate];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[AspNetRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserClaims]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserClaims];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserLogins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserLogins];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUsers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[DayOfWeeks]', 'U') IS NOT NULL
    DROP TABLE [dbo].[DayOfWeeks];
GO
IF OBJECT_ID(N'[dbo].[Exercises]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Exercises];
GO
IF OBJECT_ID(N'[dbo].[ExerciseTypes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ExerciseTypes];
GO
IF OBJECT_ID(N'[dbo].[PersonalRecords]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PersonalRecords];
GO
IF OBJECT_ID(N'[dbo].[TemplateDays]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TemplateDays];
GO
IF OBJECT_ID(N'[dbo].[UnitOfMeasureExerciseType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UnitOfMeasureExerciseType];
GO
IF OBJECT_ID(N'[dbo].[UnitOfMeasures]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UnitOfMeasures];
GO
IF OBJECT_ID(N'[dbo].[UserPreferences]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserPreferences];
GO
IF OBJECT_ID(N'[dbo].[WendlerGroups]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WendlerGroups];
GO
IF OBJECT_ID(N'[dbo].[WodExercises]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WodExercises];
GO
IF OBJECT_ID(N'[dbo].[WodRounds]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WodRounds];
GO
IF OBJECT_ID(N'[dbo].[Wods]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Wods];
GO
IF OBJECT_ID(N'[dbo].[WodUnitOfMeasures]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WodUnitOfMeasures];
GO
IF OBJECT_ID(N'[dbo].[WodUnitTypes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WodUnitTypes];
GO
IF OBJECT_ID(N'[dbo].[Workouts]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Workouts];
GO
IF OBJECT_ID(N'[dbo].[WorkoutSets]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WorkoutSets];
GO
IF OBJECT_ID(N'[dbo].[WorkoutTemplates]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WorkoutTemplates];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Exercises'
CREATE TABLE [dbo].[Exercises] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Abbreviation] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [ExerciseTypeId] int  NOT NULL,
    [WendlerGroupId] int  NULL
);
GO

-- Creating table 'ExerciseTypes'
CREATE TABLE [dbo].[ExerciseTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'UnitOfMeasures'
CREATE TABLE [dbo].[UnitOfMeasures] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Workouts'
CREATE TABLE [dbo].[Workouts] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [WorkoutDate] datetime  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL,
    [WorkoutTemplateId] int  NULL
);
GO

-- Creating table 'WorkoutSets'
CREATE TABLE [dbo].[WorkoutSets] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [SortOrder] smallint  NOT NULL,
    [Repetitions] smallint  NOT NULL,
    [Weight] float  NOT NULL,
    [Note] nvarchar(max)  NULL,
    [ExerciseId] int  NOT NULL,
    [UnitOfMeasureId] int  NOT NULL,
    [WorkoutId] int  NULL,
    [TemplateDaysId] int  NULL
);
GO

-- Creating table 'UserPreferences'
CREATE TABLE [dbo].[UserPreferences] (
    [ExerciseTypeId] int  NOT NULL,
    [UnitOfMeasureId] int  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL,
    [Id] int  NOT NULL
);
GO

-- Creating table 'PersonalRecords'
CREATE TABLE [dbo].[PersonalRecords] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RecordDate] datetime  NOT NULL,
    [Value] float  NOT NULL,
    [UnitOfMeasureId] int  NOT NULL,
    [ExerciseId] int  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'WorkoutTemplates'
CREATE TABLE [dbo].[WorkoutTemplates] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [StartDate] datetime  NOT NULL,
    [EndDate] datetime  NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'TemplateDays'
CREATE TABLE [dbo].[TemplateDays] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IsRepeat] bit  NOT NULL,
    [WorkoutTemplateId] int  NOT NULL,
    [DayOfWeekId] int  NOT NULL
);
GO

-- Creating table 'DayOfWeeks'
CREATE TABLE [dbo].[DayOfWeeks] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'WodUnitTypes'
CREATE TABLE [dbo].[WodUnitTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Discription] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'WodUnitOfMeasures'
CREATE TABLE [dbo].[WodUnitOfMeasures] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [WodUnitTypeId] int  NOT NULL
);
GO

-- Creating table 'Wods'
CREATE TABLE [dbo].[Wods] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [Note] nvarchar(max)  NOT NULL,
    [WodUnitOfMeasureId] int  NOT NULL
);
GO

-- Creating table 'WodRounds'
CREATE TABLE [dbo].[WodRounds] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [SortOrder] smallint  NOT NULL,
    [WodId] int  NOT NULL
);
GO

-- Creating table 'WodExercises'
CREATE TABLE [dbo].[WodExercises] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [WodRoundId] int  NOT NULL,
    [ExerciseId] int  NOT NULL,
    [Value] float  NOT NULL,
    [UnitOfMeasureId] int  NOT NULL,
    [Reps] smallint  NULL,
    [Time] time  NULL
);
GO

-- Creating table 'WendlerGroups'
CREATE TABLE [dbo].[WendlerGroups] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'AspNetRoles'
CREATE TABLE [dbo].[AspNetRoles] (
    [Id] nvarchar(128)  NOT NULL,
    [Name] nvarchar(256)  NOT NULL
);
GO

-- Creating table 'AspNetUserClaims'
CREATE TABLE [dbo].[AspNetUserClaims] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] nvarchar(128)  NOT NULL,
    [ClaimType] nvarchar(max)  NULL,
    [ClaimValue] nvarchar(max)  NULL
);
GO

-- Creating table 'AspNetUserLogins'
CREATE TABLE [dbo].[AspNetUserLogins] (
    [LoginProvider] nvarchar(128)  NOT NULL,
    [ProviderKey] nvarchar(128)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'AspNetUsers'
CREATE TABLE [dbo].[AspNetUsers] (
    [Id] nvarchar(128)  NOT NULL,
    [Hometown] nvarchar(max)  NULL,
    [Email] nvarchar(256)  NULL,
    [EmailConfirmed] bit  NOT NULL,
    [PasswordHash] nvarchar(max)  NULL,
    [SecurityStamp] nvarchar(max)  NULL,
    [PhoneNumber] nvarchar(max)  NULL,
    [PhoneNumberConfirmed] bit  NOT NULL,
    [TwoFactorEnabled] bit  NOT NULL,
    [LockoutEndDateUtc] datetime  NULL,
    [LockoutEnabled] bit  NOT NULL,
    [AccessFailedCount] int  NOT NULL,
    [UserName] nvarchar(256)  NOT NULL
);
GO

-- Creating table 'UnitOfMeasureExerciseType'
CREATE TABLE [dbo].[UnitOfMeasureExerciseType] (
    [UnitOfMeasures_Id] int  NOT NULL,
    [ExerciseTypes_Id] int  NOT NULL
);
GO

-- Creating table 'AspNetUserRoles'
CREATE TABLE [dbo].[AspNetUserRoles] (
    [RoleId] nvarchar(128)  NOT NULL,
    [UserId] nvarchar(128)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Exercises'
ALTER TABLE [dbo].[Exercises]
ADD CONSTRAINT [PK_Exercises]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ExerciseTypes'
ALTER TABLE [dbo].[ExerciseTypes]
ADD CONSTRAINT [PK_ExerciseTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'UnitOfMeasures'
ALTER TABLE [dbo].[UnitOfMeasures]
ADD CONSTRAINT [PK_UnitOfMeasures]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Workouts'
ALTER TABLE [dbo].[Workouts]
ADD CONSTRAINT [PK_Workouts]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WorkoutSets'
ALTER TABLE [dbo].[WorkoutSets]
ADD CONSTRAINT [PK_WorkoutSets]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'UserPreferences'
ALTER TABLE [dbo].[UserPreferences]
ADD CONSTRAINT [PK_UserPreferences]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'PersonalRecords'
ALTER TABLE [dbo].[PersonalRecords]
ADD CONSTRAINT [PK_PersonalRecords]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WorkoutTemplates'
ALTER TABLE [dbo].[WorkoutTemplates]
ADD CONSTRAINT [PK_WorkoutTemplates]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TemplateDays'
ALTER TABLE [dbo].[TemplateDays]
ADD CONSTRAINT [PK_TemplateDays]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'DayOfWeeks'
ALTER TABLE [dbo].[DayOfWeeks]
ADD CONSTRAINT [PK_DayOfWeeks]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WodUnitTypes'
ALTER TABLE [dbo].[WodUnitTypes]
ADD CONSTRAINT [PK_WodUnitTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WodUnitOfMeasures'
ALTER TABLE [dbo].[WodUnitOfMeasures]
ADD CONSTRAINT [PK_WodUnitOfMeasures]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Wods'
ALTER TABLE [dbo].[Wods]
ADD CONSTRAINT [PK_Wods]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WodRounds'
ALTER TABLE [dbo].[WodRounds]
ADD CONSTRAINT [PK_WodRounds]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WodExercises'
ALTER TABLE [dbo].[WodExercises]
ADD CONSTRAINT [PK_WodExercises]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WendlerGroups'
ALTER TABLE [dbo].[WendlerGroups]
ADD CONSTRAINT [PK_WendlerGroups]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetRoles'
ALTER TABLE [dbo].[AspNetRoles]
ADD CONSTRAINT [PK_AspNetRoles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [PK_AspNetUserClaims]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [LoginProvider], [ProviderKey], [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [PK_AspNetUserLogins]
    PRIMARY KEY CLUSTERED ([LoginProvider], [ProviderKey], [UserId] ASC);
GO

-- Creating primary key on [Id] in table 'AspNetUsers'
ALTER TABLE [dbo].[AspNetUsers]
ADD CONSTRAINT [PK_AspNetUsers]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [UnitOfMeasures_Id], [ExerciseTypes_Id] in table 'UnitOfMeasureExerciseType'
ALTER TABLE [dbo].[UnitOfMeasureExerciseType]
ADD CONSTRAINT [PK_UnitOfMeasureExerciseType]
    PRIMARY KEY CLUSTERED ([UnitOfMeasures_Id], [ExerciseTypes_Id] ASC);
GO

-- Creating primary key on [RoleId], [UserId] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [PK_AspNetUserRoles]
    PRIMARY KEY CLUSTERED ([RoleId], [UserId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ExerciseTypeId] in table 'Exercises'
ALTER TABLE [dbo].[Exercises]
ADD CONSTRAINT [FK_ExerciseTypeExercise]
    FOREIGN KEY ([ExerciseTypeId])
    REFERENCES [dbo].[ExerciseTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ExerciseTypeExercise'
CREATE INDEX [IX_FK_ExerciseTypeExercise]
ON [dbo].[Exercises]
    ([ExerciseTypeId]);
GO

-- Creating foreign key on [ExerciseTypeId] in table 'UserPreferences'
ALTER TABLE [dbo].[UserPreferences]
ADD CONSTRAINT [FK_UserPreferenceExerciseType]
    FOREIGN KEY ([ExerciseTypeId])
    REFERENCES [dbo].[ExerciseTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserPreferenceExerciseType'
CREATE INDEX [IX_FK_UserPreferenceExerciseType]
ON [dbo].[UserPreferences]
    ([ExerciseTypeId]);
GO

-- Creating foreign key on [UnitOfMeasureId] in table 'UserPreferences'
ALTER TABLE [dbo].[UserPreferences]
ADD CONSTRAINT [FK_UserPreferenceUnitOfMeasure]
    FOREIGN KEY ([UnitOfMeasureId])
    REFERENCES [dbo].[UnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserPreferenceUnitOfMeasure'
CREATE INDEX [IX_FK_UserPreferenceUnitOfMeasure]
ON [dbo].[UserPreferences]
    ([UnitOfMeasureId]);
GO

-- Creating foreign key on [UnitOfMeasures_Id] in table 'UnitOfMeasureExerciseType'
ALTER TABLE [dbo].[UnitOfMeasureExerciseType]
ADD CONSTRAINT [FK_UnitOfMeasureExerciseType_UnitOfMeasure]
    FOREIGN KEY ([UnitOfMeasures_Id])
    REFERENCES [dbo].[UnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [ExerciseTypes_Id] in table 'UnitOfMeasureExerciseType'
ALTER TABLE [dbo].[UnitOfMeasureExerciseType]
ADD CONSTRAINT [FK_UnitOfMeasureExerciseType_ExerciseType]
    FOREIGN KEY ([ExerciseTypes_Id])
    REFERENCES [dbo].[ExerciseTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UnitOfMeasureExerciseType_ExerciseType'
CREATE INDEX [IX_FK_UnitOfMeasureExerciseType_ExerciseType]
ON [dbo].[UnitOfMeasureExerciseType]
    ([ExerciseTypes_Id]);
GO

-- Creating foreign key on [UnitOfMeasureId] in table 'PersonalRecords'
ALTER TABLE [dbo].[PersonalRecords]
ADD CONSTRAINT [FK_PersonalRecordHistoryUnitOfMeasure]
    FOREIGN KEY ([UnitOfMeasureId])
    REFERENCES [dbo].[UnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonalRecordHistoryUnitOfMeasure'
CREATE INDEX [IX_FK_PersonalRecordHistoryUnitOfMeasure]
ON [dbo].[PersonalRecords]
    ([UnitOfMeasureId]);
GO

-- Creating foreign key on [ExerciseId] in table 'PersonalRecords'
ALTER TABLE [dbo].[PersonalRecords]
ADD CONSTRAINT [FK_PersonalRecordHistoryExercise]
    FOREIGN KEY ([ExerciseId])
    REFERENCES [dbo].[Exercises]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonalRecordHistoryExercise'
CREATE INDEX [IX_FK_PersonalRecordHistoryExercise]
ON [dbo].[PersonalRecords]
    ([ExerciseId]);
GO

-- Creating foreign key on [ExerciseId] in table 'WorkoutSets'
ALTER TABLE [dbo].[WorkoutSets]
ADD CONSTRAINT [FK_WorkoutSetExercise]
    FOREIGN KEY ([ExerciseId])
    REFERENCES [dbo].[Exercises]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkoutSetExercise'
CREATE INDEX [IX_FK_WorkoutSetExercise]
ON [dbo].[WorkoutSets]
    ([ExerciseId]);
GO

-- Creating foreign key on [UnitOfMeasureId] in table 'WorkoutSets'
ALTER TABLE [dbo].[WorkoutSets]
ADD CONSTRAINT [FK_WorkoutSetUnitOfMeasure]
    FOREIGN KEY ([UnitOfMeasureId])
    REFERENCES [dbo].[UnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkoutSetUnitOfMeasure'
CREATE INDEX [IX_FK_WorkoutSetUnitOfMeasure]
ON [dbo].[WorkoutSets]
    ([UnitOfMeasureId]);
GO

-- Creating foreign key on [WorkoutId] in table 'WorkoutSets'
ALTER TABLE [dbo].[WorkoutSets]
ADD CONSTRAINT [FK_WorkoutWorkoutSet]
    FOREIGN KEY ([WorkoutId])
    REFERENCES [dbo].[Workouts]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkoutWorkoutSet'
CREATE INDEX [IX_FK_WorkoutWorkoutSet]
ON [dbo].[WorkoutSets]
    ([WorkoutId]);
GO

-- Creating foreign key on [TemplateDaysId] in table 'WorkoutSets'
ALTER TABLE [dbo].[WorkoutSets]
ADD CONSTRAINT [FK_TemplateDaysWorkoutSet]
    FOREIGN KEY ([TemplateDaysId])
    REFERENCES [dbo].[TemplateDays]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TemplateDaysWorkoutSet'
CREATE INDEX [IX_FK_TemplateDaysWorkoutSet]
ON [dbo].[WorkoutSets]
    ([TemplateDaysId]);
GO

-- Creating foreign key on [WorkoutTemplateId] in table 'TemplateDays'
ALTER TABLE [dbo].[TemplateDays]
ADD CONSTRAINT [FK_WorkoutTemplateTemplateDays]
    FOREIGN KEY ([WorkoutTemplateId])
    REFERENCES [dbo].[WorkoutTemplates]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkoutTemplateTemplateDays'
CREATE INDEX [IX_FK_WorkoutTemplateTemplateDays]
ON [dbo].[TemplateDays]
    ([WorkoutTemplateId]);
GO

-- Creating foreign key on [WorkoutTemplateId] in table 'Workouts'
ALTER TABLE [dbo].[Workouts]
ADD CONSTRAINT [FK_WorkoutWorkoutTemplate]
    FOREIGN KEY ([WorkoutTemplateId])
    REFERENCES [dbo].[WorkoutTemplates]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkoutWorkoutTemplate'
CREATE INDEX [IX_FK_WorkoutWorkoutTemplate]
ON [dbo].[Workouts]
    ([WorkoutTemplateId]);
GO

-- Creating foreign key on [DayOfWeekId] in table 'TemplateDays'
ALTER TABLE [dbo].[TemplateDays]
ADD CONSTRAINT [FK_TemplateDaysDayOfWeek]
    FOREIGN KEY ([DayOfWeekId])
    REFERENCES [dbo].[DayOfWeeks]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TemplateDaysDayOfWeek'
CREATE INDEX [IX_FK_TemplateDaysDayOfWeek]
ON [dbo].[TemplateDays]
    ([DayOfWeekId]);
GO

-- Creating foreign key on [WodUnitTypeId] in table 'WodUnitOfMeasures'
ALTER TABLE [dbo].[WodUnitOfMeasures]
ADD CONSTRAINT [FK_WodUnitOfMeasureWodUnitType]
    FOREIGN KEY ([WodUnitTypeId])
    REFERENCES [dbo].[WodUnitTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WodUnitOfMeasureWodUnitType'
CREATE INDEX [IX_FK_WodUnitOfMeasureWodUnitType]
ON [dbo].[WodUnitOfMeasures]
    ([WodUnitTypeId]);
GO

-- Creating foreign key on [WodRoundId] in table 'WodExercises'
ALTER TABLE [dbo].[WodExercises]
ADD CONSTRAINT [FK_WodExerciseWodRound]
    FOREIGN KEY ([WodRoundId])
    REFERENCES [dbo].[WodRounds]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WodExerciseWodRound'
CREATE INDEX [IX_FK_WodExerciseWodRound]
ON [dbo].[WodExercises]
    ([WodRoundId]);
GO

-- Creating foreign key on [WodId] in table 'WodRounds'
ALTER TABLE [dbo].[WodRounds]
ADD CONSTRAINT [FK_WodRoundWod]
    FOREIGN KEY ([WodId])
    REFERENCES [dbo].[Wods]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WodRoundWod'
CREATE INDEX [IX_FK_WodRoundWod]
ON [dbo].[WodRounds]
    ([WodId]);
GO

-- Creating foreign key on [ExerciseId] in table 'WodExercises'
ALTER TABLE [dbo].[WodExercises]
ADD CONSTRAINT [FK_WodExerciseExercise]
    FOREIGN KEY ([ExerciseId])
    REFERENCES [dbo].[Exercises]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WodExerciseExercise'
CREATE INDEX [IX_FK_WodExerciseExercise]
ON [dbo].[WodExercises]
    ([ExerciseId]);
GO

-- Creating foreign key on [UnitOfMeasureId] in table 'WodExercises'
ALTER TABLE [dbo].[WodExercises]
ADD CONSTRAINT [FK_WodExerciseUnitOfMeasure]
    FOREIGN KEY ([UnitOfMeasureId])
    REFERENCES [dbo].[UnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WodExerciseUnitOfMeasure'
CREATE INDEX [IX_FK_WodExerciseUnitOfMeasure]
ON [dbo].[WodExercises]
    ([UnitOfMeasureId]);
GO

-- Creating foreign key on [WodUnitOfMeasureId] in table 'Wods'
ALTER TABLE [dbo].[Wods]
ADD CONSTRAINT [FK_WodWodUnitOfMeasure]
    FOREIGN KEY ([WodUnitOfMeasureId])
    REFERENCES [dbo].[WodUnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WodWodUnitOfMeasure'
CREATE INDEX [IX_FK_WodWodUnitOfMeasure]
ON [dbo].[Wods]
    ([WodUnitOfMeasureId]);
GO

-- Creating foreign key on [WendlerGroupId] in table 'Exercises'
ALTER TABLE [dbo].[Exercises]
ADD CONSTRAINT [fk_ExerciseWendlerGroup]
    FOREIGN KEY ([WendlerGroupId])
    REFERENCES [dbo].[WendlerGroups]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'fk_ExerciseWendlerGroup'
CREATE INDEX [IX_fk_ExerciseWendlerGroup]
ON [dbo].[Exercises]
    ([WendlerGroupId]);
GO

-- Creating foreign key on [UserId] in table 'AspNetUserClaims'
ALTER TABLE [dbo].[AspNetUserClaims]
ADD CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId'
CREATE INDEX [IX_FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]
ON [dbo].[AspNetUserClaims]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'AspNetUserLogins'
ALTER TABLE [dbo].[AspNetUserLogins]
ADD CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId'
CREATE INDEX [IX_FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]
ON [dbo].[AspNetUserLogins]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'PersonalRecords'
ALTER TABLE [dbo].[PersonalRecords]
ADD CONSTRAINT [FK_PersonalRecordHistoryAspNetUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonalRecordHistoryAspNetUser'
CREATE INDEX [IX_FK_PersonalRecordHistoryAspNetUser]
ON [dbo].[PersonalRecords]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'UserPreferences'
ALTER TABLE [dbo].[UserPreferences]
ADD CONSTRAINT [FK_UserPreferenceAspNetUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserPreferenceAspNetUser'
CREATE INDEX [IX_FK_UserPreferenceAspNetUser]
ON [dbo].[UserPreferences]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'Workouts'
ALTER TABLE [dbo].[Workouts]
ADD CONSTRAINT [FK_WorkoutAspNetUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkoutAspNetUser'
CREATE INDEX [IX_FK_WorkoutAspNetUser]
ON [dbo].[Workouts]
    ([UserId]);
GO

-- Creating foreign key on [UserId] in table 'WorkoutTemplates'
ALTER TABLE [dbo].[WorkoutTemplates]
ADD CONSTRAINT [FK_WorkoutTemplateAspNetUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkoutTemplateAspNetUser'
CREATE INDEX [IX_FK_WorkoutTemplateAspNetUser]
ON [dbo].[WorkoutTemplates]
    ([UserId]);
GO

-- Creating foreign key on [RoleId] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetRole]
    FOREIGN KEY ([RoleId])
    REFERENCES [dbo].[AspNetRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [UserId] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_AspNetUserRoles_AspNetUser'
CREATE INDEX [IX_FK_AspNetUserRoles_AspNetUser]
ON [dbo].[AspNetUserRoles]
    ([UserId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------