
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/31/2014 08:26:29
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

IF OBJECT_ID(N'[dbo].[FK_ExerciseTypeExercise]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Exercises] DROP CONSTRAINT [FK_ExerciseTypeExercise];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutSetUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkoutSets] DROP CONSTRAINT [FK_WorkoutSetUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_ExerciseWorkoutSet]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkoutSets] DROP CONSTRAINT [FK_ExerciseWorkoutSet];
GO
IF OBJECT_ID(N'[dbo].[FK_WorkoutWorkoutSet]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[WorkoutSets] DROP CONSTRAINT [FK_WorkoutWorkoutSet];
GO
IF OBJECT_ID(N'[dbo].[FK_UserPreferenceExerciseType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserPreferences] DROP CONSTRAINT [FK_UserPreferenceExerciseType];
GO
IF OBJECT_ID(N'[dbo].[FK_UserPreferenceUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserPreferences] DROP CONSTRAINT [FK_UserPreferenceUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_UnitOfMeasureExerciseType_UnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UnitOfMeasureExerciseType] DROP CONSTRAINT [FK_UnitOfMeasureExerciseType_UnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_UnitOfMeasureExerciseType_ExerciseType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UnitOfMeasureExerciseType] DROP CONSTRAINT [FK_UnitOfMeasureExerciseType_ExerciseType];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_dbo_AspNetUserClaims_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_dbo_AspNetUserLogins_dbo_AspNetUsers_UserId];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetRole]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRole];
GO
IF OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_UserPreferenceAspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserPreferences] DROP CONSTRAINT [FK_UserPreferenceAspNetUser];
GO
IF OBJECT_ID(N'[dbo].[FK_PersonalRecordHistoryUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PersonalRecordHistories] DROP CONSTRAINT [FK_PersonalRecordHistoryUnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_PersonalRecordHistoryExercise]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PersonalRecordHistories] DROP CONSTRAINT [FK_PersonalRecordHistoryExercise];
GO
IF OBJECT_ID(N'[dbo].[FK_PersonalRecordHistoryAspNetUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PersonalRecordHistories] DROP CONSTRAINT [FK_PersonalRecordHistoryAspNetUser];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Exercises]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Exercises];
GO
IF OBJECT_ID(N'[dbo].[ExerciseTypes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ExerciseTypes];
GO
IF OBJECT_ID(N'[dbo].[UnitOfMeasures]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UnitOfMeasures];
GO
IF OBJECT_ID(N'[dbo].[Workouts]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Workouts];
GO
IF OBJECT_ID(N'[dbo].[WorkoutSets]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WorkoutSets];
GO
IF OBJECT_ID(N'[dbo].[UserPreferences]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserPreferences];
GO
IF OBJECT_ID(N'[dbo].[AspNetRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetRoles];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserClaims]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserClaims];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserLogins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserLogins];
GO
IF OBJECT_ID(N'[dbo].[AspNetUsers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUsers];
GO
IF OBJECT_ID(N'[dbo].[PersonalRecordHistories]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PersonalRecordHistories];
GO
IF OBJECT_ID(N'[dbo].[UnitOfMeasureExerciseType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UnitOfMeasureExerciseType];
GO
IF OBJECT_ID(N'[dbo].[AspNetUserRoles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[AspNetUserRoles];
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
    [ExerciseTypeId] int  NOT NULL
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
    [StartDateTime] nvarchar(max)  NOT NULL,
    [EndDateTime] nvarchar(max)  NOT NULL,
    [UserId] int  NOT NULL,
    [AspNetUserId] nvarchar(128)  NOT NULL
);
GO

-- Creating table 'WorkoutSets'
CREATE TABLE [dbo].[WorkoutSets] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [SortOrder] nvarchar(max)  NOT NULL,
    [PlannedReps] nvarchar(max)  NOT NULL,
    [ActualReps] nvarchar(max)  NOT NULL,
    [PlannedWeight] nvarchar(max)  NOT NULL,
    [ActualWeight] nvarchar(max)  NOT NULL,
    [UnitOfMeasureId] int  NOT NULL,
    [ExerciseId] int  NOT NULL,
    [WorkoutId] int  NOT NULL
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

-- Creating table 'PersonalRecordHistories'
CREATE TABLE [dbo].[PersonalRecordHistories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RecordDate] datetime  NOT NULL,
    [Value] float  NOT NULL,
    [UnitOfMeasureId] int  NOT NULL,
    [ExerciseId] int  NOT NULL,
    [AspNetUserId] nvarchar(128)  NOT NULL
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

-- Creating primary key on [Id] in table 'PersonalRecordHistories'
ALTER TABLE [dbo].[PersonalRecordHistories]
ADD CONSTRAINT [PK_PersonalRecordHistories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [UnitOfMeasures_Id], [ExerciseTypes_Id] in table 'UnitOfMeasureExerciseType'
ALTER TABLE [dbo].[UnitOfMeasureExerciseType]
ADD CONSTRAINT [PK_UnitOfMeasureExerciseType]
    PRIMARY KEY CLUSTERED ([UnitOfMeasures_Id], [ExerciseTypes_Id] ASC);
GO

-- Creating primary key on [AspNetRoles_Id], [AspNetUsers_Id] in table 'AspNetUserRoles'
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

-- Creating foreign key on [ExerciseId] in table 'WorkoutSets'
ALTER TABLE [dbo].[WorkoutSets]
ADD CONSTRAINT [FK_ExerciseWorkoutSet]
    FOREIGN KEY ([ExerciseId])
    REFERENCES [dbo].[Exercises]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ExerciseWorkoutSet'
CREATE INDEX [IX_FK_ExerciseWorkoutSet]
ON [dbo].[WorkoutSets]
    ([ExerciseId]);
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

-- Creating foreign key on [AspNetRoles_Id] in table 'AspNetUserRoles'
ALTER TABLE [dbo].[AspNetUserRoles]
ADD CONSTRAINT [FK_AspNetUserRoles_AspNetRole]
    FOREIGN KEY ([RoleId])
    REFERENCES [dbo].[AspNetRoles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [AspNetUsers_Id] in table 'AspNetUserRoles'
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

-- Creating foreign key on [UnitOfMeasureId] in table 'PersonalRecordHistories'
ALTER TABLE [dbo].[PersonalRecordHistories]
ADD CONSTRAINT [FK_PersonalRecordHistoryUnitOfMeasure]
    FOREIGN KEY ([UnitOfMeasureId])
    REFERENCES [dbo].[UnitOfMeasures]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonalRecordHistoryUnitOfMeasure'
CREATE INDEX [IX_FK_PersonalRecordHistoryUnitOfMeasure]
ON [dbo].[PersonalRecordHistories]
    ([UnitOfMeasureId]);
GO

-- Creating foreign key on [ExerciseId] in table 'PersonalRecordHistories'
ALTER TABLE [dbo].[PersonalRecordHistories]
ADD CONSTRAINT [FK_PersonalRecordHistoryExercise]
    FOREIGN KEY ([ExerciseId])
    REFERENCES [dbo].[Exercises]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonalRecordHistoryExercise'
CREATE INDEX [IX_FK_PersonalRecordHistoryExercise]
ON [dbo].[PersonalRecordHistories]
    ([ExerciseId]);
GO

-- Creating foreign key on [AspNetUserId] in table 'PersonalRecordHistories'
ALTER TABLE [dbo].[PersonalRecordHistories]
ADD CONSTRAINT [FK_PersonalRecordHistoryAspNetUser]
    FOREIGN KEY ([AspNetUserId])
    REFERENCES [dbo].[AspNetUsers]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PersonalRecordHistoryAspNetUser'
CREATE INDEX [IX_FK_PersonalRecordHistoryAspNetUser]
ON [dbo].[PersonalRecordHistories]
    ([AspNetUserId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------