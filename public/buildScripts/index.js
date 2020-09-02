const fs = require('fs');
const { exec } = require('child_process');

function incrementPackage(){
    const file = require('./../package.json');
    file.build.number++;
    var curDate = new Date();
    file.build.date = `${curDate.getFullYear()}_${curDate.getMonth()}_${curDate.getDate()}`;
    file.build.timestamp = Math.round(curDate.valueOf()/1000);

    fs.writeFile("./../package.json", JSON.stringify(file,null,"\t"), function writeJSON(err) {
        if (err) return console.log(err);
        console.log("incremented package number");
    });
}

var preWebpackBuild = function() {
    // Increment Package Build
        console.log("## Removing old bundles")
        exec("rm -rf dist/*.js",()=>{
            console.log("## Removed old bundles")
        })
        incrementPackage();
}

// Pack dist and source folders
var postWebpackBuild = function() {
    // Contents of "./src_autoZip.sh" in base64
const autoZipBase = `
        IyEvYmluL2Jhc2gKCmJ1aWxkPSJAJWJ1aWxkJUAiCgojIHJlbW92ZSAuRFNfU3RvcmUKCWVjaG8gIiMjIFJlbW92aW5nIC5EU19TdG9yZSIKCWZ1bmN0aW9uIGRzUmVtb3ZlKCl7CgkJZmluZCAuIC1uYW1lICcuRFNfU3RvcmUnIC10eXBlIGYgLWRlbGV0ZQoJfQoKCWNkIGRpc3QvCglkc1JlbW92ZQoJY2QgLi4KCgljZCBzcmMvCglkc1JlbW92ZQoJY2QgcHJvY2Vzc2luZy8KCWRzUmVtb3ZlCgljZCAuLgoJY2QgLi4KCWVjaG8gIiMjIFJlbW92ZWQgLkRTX1N0b3JlIgoKCiMgemlwIHVwIGRpc3QgYW5kIHNyYwoJemlwIC1yIHJlbGVhc2UvYnVpbGQtJGJ1aWxkLVJFTEVBU0UuemlwIGRpc3QvCgl6aXAgLXIgcmVsZWFzZS9idWlsZC0kYnVpbGQtU09VUkNFLnppcCBzcmMvCgllY2hvICIiCgllY2hvICIjIyBaaXBwZWQgdXAgZmlsZXMiCgojIG1kNSBzdW0KCWNkIHJlbGVhc2UvCgllY2hvICIiCgllY2hvICItLS0tLS0tLSBNRDUgU1VNIC0tLS0tLS0tIgoJbWQ1IGJ1aWxkLSRidWlsZCouemlwCgllY2hvICItLS0tLS0tLSBFTkQgTUQ1IC0tLS0tLS0tIgoJY2QgLi4K
`;

        var autoZipContents = Buffer.from(autoZipBase,'base64').toString('utf8').replace("@%build%@",require("./../package.json").build.number);
        fs.writeFile("./.autoZipTemp.sh",autoZipContents,()=>{
            exec('bash ./.autoZipTemp.sh',(err,stdout,stderr)=>{
                if (err) {
                    console.error(err)
                } else {
                    console.log(`${stdout}`);
                    console.log(`${stderr}`);
                }
            });
        })
}

switch (process.argv[2]) {
    case "pre":
        preWebpackBuild();
        break;
    case "post":
        postWebpackBuild();
        break;
}
