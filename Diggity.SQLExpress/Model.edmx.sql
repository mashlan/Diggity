
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/05/2014 10:10:34
-- Generated from EDMX file: C:\Users\EricandAngela\Documents\GitHub\Diggity\Diggity.SQLExpress\Model.edmx
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
IF OBJECT_ID(N'[dbo].[FK_ExerciseTypeUnitOfMeasure]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UnitOfMeasures] DROP CONSTRAINT [FK_ExerciseTypeUnitOfMeasure];
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
    [Description] nvarchar(max)  NOT NULL,
    [IsUserPreference] bit  NOT NULL
);
GO

-- Creating table 'UnitOfMeasures'
CREATE TABLE [dbo].[UnitOfMeasures] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [ExerciseTypeId] int  NOT NULL
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

-- Creating foreign key on [ExerciseTypeId] in table 'UnitOfMeasures'
ALTER TABLE [dbo].[UnitOfMeasures]
ADD CONSTRAINT [FK_ExerciseTypeUnitOfMeasure]
    FOREIGN KEY ([ExerciseTypeId])
    REFERENCES [dbo].[ExerciseTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ExerciseTypeUnitOfMeasure'
CREATE INDEX [IX_FK_ExerciseTypeUnitOfMeasure]
ON [dbo].[UnitOfMeasures]
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

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------