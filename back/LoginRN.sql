USE [master]
GO
/****** Object:  Database [LoginRN]    Script Date: 8/9/2023 12:02:51 ******/
CREATE DATABASE [LoginRN]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LoginRN', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\LoginRN.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'LoginRN_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\LoginRN_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [LoginRN] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [LoginRN].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [LoginRN] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [LoginRN] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [LoginRN] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [LoginRN] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [LoginRN] SET ARITHABORT OFF 
GO
ALTER DATABASE [LoginRN] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [LoginRN] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [LoginRN] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [LoginRN] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [LoginRN] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [LoginRN] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [LoginRN] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [LoginRN] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [LoginRN] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [LoginRN] SET  DISABLE_BROKER 
GO
ALTER DATABASE [LoginRN] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LoginRN] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LoginRN] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [LoginRN] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [LoginRN] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [LoginRN] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [LoginRN] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [LoginRN] SET RECOVERY FULL 
GO
ALTER DATABASE [LoginRN] SET  MULTI_USER 
GO
ALTER DATABASE [LoginRN] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [LoginRN] SET DB_CHAINING OFF 
GO
ALTER DATABASE [LoginRN] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [LoginRN] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [LoginRN] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'LoginRN', N'ON'
GO
ALTER DATABASE [LoginRN] SET QUERY_STORE = OFF
GO
USE [LoginRN]
GO
/****** Object:  User [user]    Script Date: 8/9/2023 12:02:51 ******/
CREATE USER [user] FOR LOGIN [user] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 8/9/2023 12:02:51 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [user]
GO
/****** Object:  Table [dbo].[Perfil]    Script Date: 8/9/2023 12:02:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Perfil](
	[Nombre] [varchar](50) NULL,
	[Apellido] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 8/9/2023 12:02:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
	[Mail] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (1, N'juan', N'123', N'juan@example.com')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (2, N'morro', N'321', N'morro@example.com')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (7, N'pedro', N'123', N'pedro@example.com')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (8, N'ari', N'123', N'ari@example.com')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (9, N'marpe', N'123', N'marpe@example.com')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (10, N'assad', N'213', N'asqwewq@sad')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (11, N'juan', N'123', N'pederoqwr@weqwe1')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (12, N'awqeqwe', N'123', N'asdsad@wqeqwe')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (13, N'asdasd', N'123', N'qweqwewq@wqe')
INSERT [dbo].[Usuarios] ([id], [Nombre], [Contraseña], [Mail]) VALUES (14, N'wrwrg', N'rwbgwr', N'wrgwrg')
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
USE [master]
GO
ALTER DATABASE [LoginRN] SET  READ_WRITE 
GO
