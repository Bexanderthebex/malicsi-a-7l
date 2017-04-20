mysql -u root malicsi --password=$1 < malicsi.sql;
mysql -u root malicsi --password=$1 < import.sql;
mysql -u root malicsi --password=$1 < game-procedures.sql;
mysql -u root malicsi --password=$1 < game-sponsor-procedures.sql;
mysql -u root malicsi --password=$1 < sport-procedures.sql;
mysql -u root malicsi --password=$1 < sport-match-procedures.sql;
mysql -u root malicsi --password=$1 < team-procedures.sql;
mysql -u root malicsi --password=$1 < user-procedures.sql;
mysql -u root malicsi --password=$1 < organizer-procedures.sql;
mysql -u root malicsi --password=$1 < competitor-procedures.sql;
mysql -u root malicsi --password=$1 < admin-procedures.sql;

# Append this to file for each procedure.sql file
# mysql -u root --password=$1 < module-procedures.sql
