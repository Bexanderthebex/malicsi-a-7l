pword=$1
runsql() {
    echo -n "Executing $1... "
    mysql -u root malicsi --password=$pword < $1;
    # mysql -u root malicsi --password=$1 < import.sql;
    if [ $? -ne 0 ]
    then
        echo "Failed. Exiting..."
        exit 1
    fi
    echo "Done."
}

runsql malicsi.sql
runsql MOCK/init.sql

for file in *-procedures.sql
do
    runsql $file
done