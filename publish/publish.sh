value="cat version.txt"
versionNo="$((value + 1))"
versionString="0.0.$((value + 1))"
replaceString="s/VERSION_NO/"$versionString"/g"

cp package_template.json package.json
sed -i $replaceString package.json
cp package_template.json ../dist/package.json
rm version.txt
echo $versionNo >> version.txt