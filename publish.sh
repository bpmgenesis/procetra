npm run buildwebprod
cd ../../publish

file="tuval-core.js"
if [ -f "$file" ]
then
	rm tuval-core.js
else
	echo "$file not found."
fi

rm -d -r samples
rm -d -r latest

cp ../Tuval_v_0_1/core_/dist_web/tuval-core.js tuval-core.js
cp ../Tuval_v_0_1/core_/test/settings.js settings.js
cp -r ../Tuval_v_0_1/core_/test/samples samples
value=`cat version.txt`
versionNo="$((value + 1))"
versionString="0.0.$((value + 1))"
replaceString="s/VERSION_NO/"$versionString"/g"

cp package_template.json package.json
sed -i $replaceString package.json
rm version.txt
echo $versionNo >> version.txt

mkdir -p ./latest
cd ./latest
cp ../../Tuval_v_0_1/core_/dist_web/tuval-core.js tuval-core.js
cp ../package.json package.json
cp ../readme.md readme.md
cp ../settings.js settings.js
cp -r ../samples samples
npm publish --access public





