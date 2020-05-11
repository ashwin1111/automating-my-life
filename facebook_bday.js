// scrap facebook data and order it something like this in a text file
/**
 -  Name -> Friend A;;; - Profile Url -> https://m.facebook.com/xyz;;; Date -> Sunday, 14 June 2020;;;
 -  Name -> Friend B;;; - Profile Url -> https://m.facebook.com/xyz;;; Date -> Sunday, 14 June 2020;;;
 -  Name -> Friend C;;; - Profile Url -> https://m.facebook.com/xyz;;; Date -> Monday, 15 June 2020;;;
**/
request.get('http://localhost:2020/savedBirthdayFile.html', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        $('p').each(function () {
            var data = $(this);
            title = data.children().first()._root[0].children[0].data; // - name, dob
            if (data.children().first()._root[0].children[0].parent.prev !== null) {
                date++;
                title = 'Date -> ' + title + ';;;\n';
                profUrl = '';
            } else {
                profUrl = 'Profile Url -> ' + data.children().first()._root[0].parent.attribs.href + ';;;';
                title = 'Name -> ' + title + ';;;';
            }

            fs.appendFile("*BdayDumps*.txt", title + ' - ' + profUrl + ' ', function (err) {
                if (err) throw err;
            });
        });
    }
});


fs.readFile('pathToYorTxtFileName.txt', (err, fileContents) => {
    if (err) throw err;
    const data = fileContents.toString().split('\n');
    // loop though data and parse date and compare it with today's date + 1;
    // trigger msg on success;
});