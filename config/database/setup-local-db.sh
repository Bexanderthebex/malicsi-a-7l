pword=$1
function runsql() {
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
runsql import.sql

for file in *-procedures.sql
do
    runsql $file
done