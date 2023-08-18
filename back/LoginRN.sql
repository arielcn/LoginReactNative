USE [master]
GO
/****** Object:  Database [LoginRN]    Script Date: 18/8/2023 09:41:34 ******/
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
/****** Object:  User [alumno]    Script Date: 18/8/2023 09:41:34 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 18/8/2023 09:41:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [LoginRN] SET  READ_WRITE 
GO
