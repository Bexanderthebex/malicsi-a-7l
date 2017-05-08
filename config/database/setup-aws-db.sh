mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < malicsi.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < import.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < competitor-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < game-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < game-sponsor-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < sport-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < sport-match-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < organizer-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < team-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < user-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < admin-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < log-procedures.sql;
mysql -u malicsia7l -pmalicsia7lthebetels -h malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com -P 3306 malicsi < organization-procedures.sql;
# Append this to file for each procedure.sql file
# mysql -u root --password=$1 < module-procedures.sql
