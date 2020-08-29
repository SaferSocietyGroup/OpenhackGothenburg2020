import urllib
import os

driver = '{ODBC Driver 17 for SQL Server}'
address = 'tcp:openhack2020.database.windows.net'
database = 'openhack2020'
user = os.environ['DATABASE_USERNAME']
password = os.environ['DATABASE_PASSWORD']
params = urllib.parse.quote_plus(f'Driver={driver};Server={address},1433;Database={database};Uid={user};Pwd={password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
DATABASE_NAME = f'mssql+pyodbc:///?odbc_connect={params}'
