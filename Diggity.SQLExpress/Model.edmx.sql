
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/07/2014 08:05:07
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
IF OBJECT_ID(N'[dbo].[FK_WorkoutUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Workouts] DROP CONSTRAINT [FK_WorkoutUser];
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
IF OBJECT_ID(N'[dbo].[FK_UserPreferenceUser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UserPreferences] DROP CONSTRAINT [FK_UserPreferenceUser];
GO
IF OBJECT_ID(N'[dbo].[FK_UnitOfMeasureExerciseType_UnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UnitOfMeasureExerciseType] DROP CONSTRAINT [FK_UnitOfMeasureExerciseType_UnitOfMeasure];
GO
IF OBJECT_ID(N'[dbo].[FK_UnitOfMeasureExerciseType_ExerciseType]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UnitOfMeasureExerciseType] DROP CONSTRAINT [FK_UnitOfMeasureExerciseType_ExerciseType];
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
IF OBJECT_ID(N'[dbo].[Users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Users];
GO
IF OBJECT_ID(N'[dbo].[WorkoutSets]', 'U') IS NOT NULL
    DROP TABLE [dbo].[WorkoutSets];
GO
IF OBJECT_ID(N'[dbo].[UserPreferences]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserPreferences];
GO
IF OBJECT_ID(N'[dbo].[UnitOfMeasureExerciseType]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UnitOfMeasureExerciseType];
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
    [UserId] int  NOT NULL
);
GO

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FirstName] nvarchar(max)  NOT NULL,
    [LastName] nvarchar(max)  NOT NULL,
    [Email] nvarchar(max)  NOT NULL
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
    [UserId] int  NOT NULL
);
GO

-- Creating table 'UnitOfMeasureExerciseType'
CREATE TABLE [dbo].[UnitOfMeasureExerciseType] (
    [UnitOfMeasures_Id] int  NOT NULL,
    [ExerciseTypes_Id] int  NOT NULL
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

-- Creating primary key on [Id] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'WorkoutSets'
ALTER TABLE [dbo].[WorkoutSets]
ADD CONSTRAINT [PK_WorkoutSets]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [ExerciseTypeId], [UnitOfMeasureId] in table 'UserPreferences'
ALTER TABLE [dbo].[UserPreferences]
ADD CONSTRAINT [PK_UserPreferences]
    PRIMARY KEY CLUSTERED ([ExerciseTypeId], [UnitOfMeasureId] ASC);
GO

-- Creating primary key on [UnitOfMeasures_Id], [ExerciseTypes_Id] in table 'UnitOfMeasureExerciseType'
ALTER TABLE [dbo].[UnitOfMeasureExerciseType]
ADD CONSTRAINT [PK_UnitOfMeasureExerciseType]
    PRIMARY KEY CLUSTERED ([UnitOfMeasures_Id], [ExerciseTypes_Id] ASC);
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

-- Creating foreign key on [UserId] in table 'Workouts'
ALTER TABLE [dbo].[Workouts]
ADD CONSTRAINT [FK_WorkoutUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_WorkoutUser'
CREATE INDEX [IX_FK_WorkoutUser]
ON [dbo].[Workouts]
    ([UserId]);
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

-- Creating foreign key on [UserId] in table 'UserPreferences'
ALTER TABLE [dbo].[UserPreferences]
ADD CONSTRAINT [FK_UserPreferenceUser]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UserPreferenceUser'
CREATE INDEX [IX_FK_UserPreferenceUser]
ON [dbo].[UserPreferences]
    ([UserId]);
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

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------