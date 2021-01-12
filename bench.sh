#!/bin/sh
echo Testing speed - Simple Test 
rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node simple_1.js

rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node simple_2.js

echo Testing speed - 2 
rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s1.js

rm -rf default.realm.management default.realm.note default.realm.* default.realm
time node s2.js


rm -rf default.realm.management default.realm.note default.realm.* default.realm

