#!/bin/sh
echo Testing speed - 1 
rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s1.js

rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s2.js

echo Testing speed - 2 
rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s1.js

rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s2.js




sleep 20

echo Reverse Testing speed - 1 

rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s2.js

rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s1.js



echo Reverse Testing speed - 2 

rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s2.js

rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s1.js

#echo Testing speed on dirty DB
#rm -rf default.realm.management default.realm.note default.realm.* default.realm
#time node s1.js
#time node s2.js

#echo Testing speed on dirty DB - 2
#rm -rf default.realm.management default.realm.note default.realm.* default.realm
#time node s2.js
#time node s1.js
