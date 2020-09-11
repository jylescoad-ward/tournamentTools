#!/bin/bash

build="@%build%@"
currentTimestamp="@%curUTX%@"
USER=$(whoami)

# remove .DS_Store
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


# zip up dist and src
	zip -r release/build-$build-RELEASE.zip dist/
	zip -r release/build-$build-SOURCE.zip src/
	echo ""
	echo "## Zipped up files"

# add to release history
	echo "$build,$currentTimestamp,$USER" >> release/history.csv
	echo "## Added Release to 'release/history.csv'"

# md5 sum
	cd release/
	echo ""
	echo "-------- MD5 SUM --------"
	md5 build-$build*.zip
	echo "-------- END MD5 --------"
	cd ..
