// JSZIP Library
// JSZIPUTILS Library
//SaveAs Library


var downloadlist = {results:{url: "http://...", filename:"filename.pdf"}
 
 
function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
function test() {
    //const urls = [
    //    'https://www..../Cani-spiaggia.png',
    //    'https://www..../39052fe544a95dbf6ccfdd106fcabb3e_L.jpg'
   // ];
   var fileNameArr = [];
    const zip = new JSZip();
    var maxCount = downloadList.results.length;
    var minCount = 0;
    //var maxCount = 650;
    let count = 0;
    const zipFilename = "all-documents-collection.zip";
    downloadList.results.forEach(async function (download){
        var url = download.url;
        var filename = download.filename;
        if(fileNameArr.includes(filename)){
            console.log("Filename-already-exist: "+filename);
            var firstFilename = filename.substr(0,filename.lastIndexOf('.'));
            var fileExt = filename.substr(filename.lastIndexOf('.')+1,filename.length);
 
            filename = firstFilename+"-"+count+"."+fileExt;
            console.log("updated filename: "+filename);
            fileNameArr.push(filename);
        }else{
            fileNameArr.push(filename);
        }
      try {
        //var docFile = await JSZipUtils.getBinaryContent(url); //mimeType
        //let res = await zip.file(fileName).async("uint8array");
        //zip.file(filename, docFile, { binary: true});
        //0 >=0 && 101 <= 100 
        //if((count >= minCount) && (count <= maxCount))
        { 
            var docFile = urlToPromise(url); 
            zip.file(filename, docFile, {binary:true}); 
            console.log("file added "+count+": "+filename); 
            //console.log("file content: "); //console.log(docFile); 
        }
        count++;
        if(count === maxCount) {
          /*zip.generateAsync({type:'blob'}).then(function(content) {
            console.log("All files added...");
            saveAs(content, zipFilename);
          });*/
          // when everything has been downloaded, we can trigger the dl
            zip.generateAsync({type:"blob"}, function updateCallback(metadata) {
                var msg = "progression : " + metadata.percent.toFixed(2) + " %";
                if(metadata.currentFile) {
                    msg += ", current file = " + metadata.currentFile;
                }
                console.log("Download Message: "+msg);
                console.log("Download Perchantage: "+metadata.percent);
                //showMessage(msg);
                //updatePercent(metadata.percent|0);
            }).then(function callback(blob) {
                // see FileSaver.js
                saveAs(blob, zipFilename);
            }, function (e) {
                console.log("Error..."+e);
                //showError(e);
            });
        }
      } catch (err) {
        console.log(err);
      }
    });
    console.log("Total Count:"+count);
    console.log("Max Count:"+downloadList.results.length);
}
test();
