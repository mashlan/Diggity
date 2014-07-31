USE [WodDiggity]

SET IDENTITY_INSERT [dbo].[UnitOfMeasures] ON
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (1, N'lbs', N'Pounds')
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (2, N'kgs', N'Kilograms')
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (3, N'yards', N'Yards')
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (4, N'meters', N'Meters')
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (5, N'miles', N'Miles')
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (6, N'reps', N'Repetitions')
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (7, N'calories', N'Calories')
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (8, N'minutes', N'Minutes')
INSERT INTO [dbo].[UnitOfMeasures] ([Id], [Name], [Description]) VALUES (9, N'seconds', N'when a minute is too much')
SET IDENTITY_INSERT [dbo].[UnitOfMeasures] OFF
go

--User and roles seed data
insert into AspNetRoles (id, Name)values (1,'Admin');
go
insert into AspNetRoles (id, Name)values (2,'Coach');
go

INSERT INTO [dbo].[AspNetUsers] ([Id], [Hometown], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName])
VALUES (N'3692ec33-5b1b-44a6-b919-d180be23459d', NULL, N'eric.mashlan@gmail.com', 0, NULL, N'9b408ead-0e56-4c8d-8a9b-d32f2113c7bd', NULL, 0, 0, NULL, 0, 0, N'eric.mashlan@gmail.com')
GO

INSERT INTO [dbo].[AspNetUserLogins] ([LoginProvider], [ProviderKey], [UserId])
VALUES (N'GooglePlus', N'106049790352278785517', N'3692ec33-5b1b-44a6-b919-d180be23459d')
go

insert into AspNetUserRoles (UserId, RoleId)
values ((select Id from AspNetUsers where UserName = 'eric.mashlan@gmail.com'), 1);
go
--

SET IDENTITY_INSERT [dbo].[ExerciseTypes] ON
INSERT INTO [dbo].[ExerciseTypes] ([Id], [Name], [Description]) VALUES (1, N'Calories', N'it''s a type and a unit of measure. it''s special')
INSERT INTO [dbo].[ExerciseTypes] ([Id], [Name], [Description]) VALUES (2, N'Distance', N'How far can you go!')
INSERT INTO [dbo].[ExerciseTypes] ([Id], [Name], [Description]) VALUES (3, N'Reps', N'These are body weight exercises.')
INSERT INTO [dbo].[ExerciseTypes] ([Id], [Name], [Description]) VALUES (4, N'Time', N'It keeps on ticking into the future')
INSERT INTO [dbo].[ExerciseTypes] ([Id], [Name], [Description]) VALUES (5, N'Weight', N'Weight Lifting')
SET IDENTITY_INSERT [dbo].[ExerciseTypes] OFF
GO

INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (7, 1)
INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (3, 2)
INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (4, 2)
INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (5, 2)
INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (6, 3)
INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (8, 4)
INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (9, 4)
INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (1, 5)
INSERT INTO [dbo].[UnitOfMeasureExerciseType] ([UnitOfMeasures_Id], [ExerciseTypes_Id]) VALUES (2, 5)
GO

SET IDENTITY_INSERT [dbo].[Exercises] ON
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (1, N'Air Squat', N'Air SQ', N'Body weight Squat', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (2, N'Bench Press', N'BP', N'Standard Bench Press', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (3, N'Back Squat', N'BS', N'Squat with weight behind neck', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (4, N'Clean', N'CLN', N'Lift barbell from the ground to the shoulders', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (5, N'Clean and Jerk', N'C&J', N'Lift barbell from the ground to shoulders and then lifting the bar overhead', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (6, N'Deadlift', N'DL', N'Lift the barbell off the ground to the hips.', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (7, N'Double Unders', N'DU', N'jump rope while swinging the rope twice under your feet', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (8, N'Front Squat', N'FS', N'Squat with barbell held in front of the body across the clavicles and deltoids in either a clean grip, as is used in weightlifting, or with the arms crossed and hands placed on top of the barbell.', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (9, N'Hand stand push up', N'HSPU', N'Kick up into a handstand. bend arms until nose touches floor and push back up.', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (10, N'Kettlebell swing', N'KBS', N'Swing Kettlebell from between legs to overhead keeping arms straight.', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (11, N'Knees to elbows', N'KBS', N'Hanging from pullup bar, lift knees to elbows', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (12, N'Military Press', N'MP', N'Lift bar from shoulders to overhead in strict form (i.e. no push press)', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (13, N'Muscle Ups', N'MU', N'Hanging from rings you do a combination pull-up and dip so you end in an upright support.', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (14, N'Overhead Squat', N'OHS', N'Full depth squat performed with arms locked out in a wide grip press position', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (15, N'Power Clean', N'PC', N'Weight is raised from the floor to shoulder height', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (16, N'Push Press', N'PP', N'Thrust barbell overhead from standing position', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (17, N'Pull Ups', N'PU', N'Hanging from pull-up bar, pull up until chin is over bar.', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (18, N'Sumo deadlift high pull', N'SDHP', N'name says it all.', 5)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (19, N'Toes to bar', N'T2B', N'Hang from bar. Bending only at waist raise your toes to touch the bar, slowly lower them and repeat', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (20, N'Calorie Row', N'Row', N'Rowing for set number of calories, not distance or time', 1)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (21, N'Rowing', N'Row', N'Rowing machine', 2)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (22, N'Burpees', N'Burpees', N'A physical exercise consisting of a squat thrust made from and ending in a standing position.', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (23, N'Situps', N'SU', N'Situps', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (24, N'Push ups', N'Push ups', N'push ups', 3)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (25, N'Run', N'run', N'Jogging pace', 2)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (26, N'Sprint', N'sprint', N'Run as close to 100% as possible.', 2)
INSERT INTO [dbo].[Exercises] ([Id], [Name], [Abbreviation], [Description], [ExerciseTypeId]) VALUES (27, N'Box Jumps', N'Box jumbs', N'From ground jump upon raised platform and jump down. repeate', 3)
SET IDENTITY_INSERT [dbo].[Exercises] OFF
GO