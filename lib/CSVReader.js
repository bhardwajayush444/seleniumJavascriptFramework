const fs = require('fs');
const csv = require('csv-parser');

class CSVReader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async readAllData() {
        return new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (row) => {
                    data.push(row);
                })
                .on('end', () => {
                    resolve(data);
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }

    async readRow(rowNumber) {
        return new Promise((resolve, reject) => {
            let count = 0;
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (row) => {
                    count++;
                    if (count === rowNumber) {
                        resolve(row);
                    }
                })
                .on('end', () => {
                    reject(new Error('Row not found'));
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }

    async readColumn(columnName) {
        return new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (row) => {
                    if (row.hasOwnProperty(columnName)) {
                        data.push(row[columnName]);
                    }
                })
                .on('end', () => {
                    resolve(data);
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }
}
module.exports=CSVReader