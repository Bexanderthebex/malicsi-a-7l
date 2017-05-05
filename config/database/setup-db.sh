#mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < malicsi.sql;
#mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < import.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < competitor-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < game-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < game-sponsor-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < sport-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < sport-match-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < organizer-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < team-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < user-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < admin-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < log-procedures.sql;
mysql -u b8683e6c21f02f -pb6051e50 -h us-cdbr-iron-east-03.cleardb.net heroku_ce2b03d42f2b112 < organization-procedures.sql;

# Append this to file for each procedure.sql file
# mysql -u root --password=$1 < module-procedures.sql
