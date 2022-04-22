npm run uglify

cd ../../publish

file="tuval-core.js"
if [ -f "$file" ]
then
	rm tuval-core.js
else
	echo "$file not found."
fi

cp ../Tuval_v_0_1/core/dist_web/tuval-core.min.js tuval-core.js
cp ../Tuval_v_0_1/core/dist/types ./ -r
cp ../Tuval_v_0_1/core/dist/lib ./ -r
value=`cat version.txt`
versionNo="$((value + 1))"
versionString="0.0.$((value + 1))"
replaceString="s/VERSION_NO/"$versionString"/g"

cp package_template.json package.json
sed -i $replaceString package.json
rm version.txt
echo $versionNo >> version.txt
npm publish --access public



