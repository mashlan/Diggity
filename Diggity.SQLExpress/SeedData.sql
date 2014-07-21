USE [WodDiggity]
GO

INSERT INTO [dbo].[UnitOfMeasures]([Name],[Description])
     VALUES ('lbs','Pounds');
GO
INSERT INTO [dbo].[UnitOfMeasures]([Name],[Description])
     VALUES ('kgs','Kilograms');
GO
INSERT INTO [dbo].[UnitOfMeasures]([Name],[Description])
     VALUES ('yards','Yards');
GO
INSERT INTO [dbo].[UnitOfMeasures]([Name],[Description])
     VALUES ('meters','Meters');
GO
INSERT INTO [dbo].[UnitOfMeasures]([Name],[Description])
     VALUES ('miles','Miles');
GO
INSERT INTO [dbo].[UnitOfMeasures]([Name],[Description])
     VALUES ('reps','Repetitions');
GO
INSERT INTO [dbo].[UnitOfMeasures]([Name],[Description])
     VALUES ('calories','Calories');
GO
INSERT INTO [dbo].[UnitOfMeasures]([Name],[Description])
     VALUES ('minutes','Minutes');
GO


insert into AspNetRoles (id, Name)values (1,'Admin');
go
insert into AspNetRoles (id, Name)values (2,'Coach');
go

--insert into AspNetUserRoles (UserId, RoleId)
--values ((select Id from AspNetUsers where UserName = 'eric.mashlan@gmail.com'), 1);
--go
