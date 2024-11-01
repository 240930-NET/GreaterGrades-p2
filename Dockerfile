FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["GreaterGradesBackend.Api/GreaterGradesBackend.Api.csproj", "GreaterGradesBackend.Api/"]
RUN dotnet restore "./GreaterGradesBackend.Api/GreaterGradesBackend.Api.csproj"
COPY . .
WORKDIR "/src/GreaterGradesBackend.Api"
RUN dotnet build "./GreaterGradesBackend.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./GreaterGradesBackend.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GreaterGradesBackend.Api.dll"]