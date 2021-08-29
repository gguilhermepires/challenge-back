var fs = require('fs');
const csv = require("fast-csv");
const Author = require('./model/author');

var myArgs = process.argv.slice(2);
console.log("processing");
try{

    switch (myArgs[0]) {
        case 'import_authors':
            try {
                let fileName = myArgs[1];
                if(fileName == undefined){
                    throw Error('Filename can not be empty')
                }

                let path = __dirname + "/temp/" + fileName;
                path = ''+myArgs[1] 
                if (!fs.existsSync(path)) 
                    throw Error('File not exists')
                  
            
                let authors = [];
             
            
                fs.createReadStream(path)
                  .pipe(csv.parse({ headers: true }))
                  .on("error", (error) => {
                    throw error.message;
                  })
                  .on("data", (row) => {
                    authors.push(row);
                  })
                  .on("end", () => {
        
                    Author.bulkCreate(authors)
                      .then(() => {
                        console.log("Uploaded the file successfully: " + fileName);
                      })
                      .catch((error) => {
        
                        console.log("Fail to import data into database!");
                      });
                  });
              } catch (error) {
                console.log(error);
              }
            break;
    
        default:
            console.log('Command not found')
            break;
    }
}catch(e){
    console.log(e);
}

