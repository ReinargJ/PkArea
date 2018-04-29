const openSqliteDb = (name, location,sqlite) =>{
    console.log(sqlite);

    return sqlite.openDatabase({
        name: name,
        location: location,
        androidDatabaseImplementation: 2, //Workaround pour eviter la corruption si ouverture de plusieurs instances
    });
}

const loadFromUrl = (url, callback) => {
    let req = new XMLHttpRequest();
    
    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                let result= JSON.parse(this.responseText);
               
                callback(result);
            }
        }
    };

    req.open('GET', url, true);
    req.send(null);
}



const resetDb = (db, pks) => {
    db.executeSql('DROP TABLE IF EXISTS pks');
    db.executeSql('CREATE TABLE IF NOT EXISTS pks (id unique, pk_debut, pk_fin, pk_autoroute, pk_voie, pk_sens, pk_type, pk_debut_zone, pk_fin_zone)');

    pks.forEach( pk => {
        db.executeSql('INSERT INTO pks VALUES (?,?,?,?,?,?,?,?,?)', [pk.id, pk.pk_debut, pk.pk_fin, pk.pk_autoroute, pk.pk_voie, pk.pk_sens, pk.pk_type, pk.pk_debut_zone, pk.pk_fin_zone], function(err){
            console.log(err);
        })
    })
}

const loadFromDb = (db, storeCallback) => {
    db.executeSql('SELECT * FROM pks', [], (rs) => {
        let allPks = []
        if (rs.rows.length) {
            for (let i = 0; i < rs.rows.length; i++) {
                allPks.push(rs.rows.item(i));
            }
        }

        storeCallback(allPks)
    }, (error) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS pks (id unique, pk_debut, pk_fin, pk_autoroute, pk_voie, pk_sens, pk_type, pk_debut_zone, pk_fin_zone)');
        return []
    });
}
export {openDb, resetDb, loadFromUrl, loadFromDb};