// List of quotes API:
// - http://quotes.stormconsultancy.co.uk/api
// - http://programming-quotes-api.herokuapp.com/Quotes/random
// - https://api.quotable.io/random

// Include node fs (file stream) and https modules
const fs = require('fs');
const http = require('http');

// API url
const url = "http://api.quotable.io/random";

function main() {
    http.get(url, res => {
        let data = '';
        res.on('data', chunk => { data += chunk; });

        res.on('end', () => {
            data = JSON.parse(data);
            quote = `\n> *${data.content}* - **${data.author}** \n\n`;

            // Update README using FS
            fs.readFile('README.md', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

            // Replace the quote with the new one
            const updatedReadme = data.replace(
                /(?<=\*\*quote of the day\*\*\n)[\s\S]*(?=\[!\[README)/gim,
                quote
            );

            // Write the new README
            fs.writeFile('README.md', updatedReadme, 'utf-8', (err) => {
                if (err) {
                    throw err;
                }
            });

            console.log('README updated!');
            });
        });
    }).on('error', err => {
        console.log(err.message);
    })
}

main()
