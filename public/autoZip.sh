#!/bin/bash

#remove .DS_Store
	echo "## Removing .DS_Store"
	function dsRemove(){
		find . -name '.DS_Store' -type f -delete
	}

	cd dist/
	dsRemove
	cd ..

	cd src/
	dsRemove
	cd processing/
	dsRemove
	cd ..
	cd ..
	echo "## Removed .DS_Store"


#zip up dist and src
	zip -r build-000-RELEASE.zip dist/
	zip -r build-000-SOURCE.zip src/
	echo ""
	echo "## Zipped up files"

# md5 sum
	echo ""
	echo "-------- MD5 SUM --------"
	md5 *.zip
	echo "-------- END MD5 --------"

echo "Done! "
echo "Make sure to rename the release files to the appropiate builds."
echo ""
