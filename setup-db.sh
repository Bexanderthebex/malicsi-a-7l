mysql -u root --password=$1 < config/database/malicsi.sql;

# Append this to file for each procedure.sql file
# mysql -u root --password=$1 < module-procedures.sql
