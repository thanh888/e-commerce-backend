const express = require("express");
// const lichamhomnay = require("./routes");
// const db = require("./db");
const cheerio = require("cheerio");

const fetchData = async (link) => {
  const response = await fetch(link);

  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const body = $("div.main-body");
  return $(body).html().replace(/"/g, "'");
};

const crawlData = async () => {
  for (let year = 2035; year <= 2050; year++) {
    const result = await fetchData(
      "https://www.xemlicham.com/am-lich/nam/${year}"
    );

    console.log(`Saving ${year}`);
    console.log(result);
    // var insertStatement = `INSERT INTO lichnamtot (ngay, html) VALUES ('${year}-1-1', "${result}")`;
    // db.query(insertStatement, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
    // for (let month = 1; month <= 12; month++) {
    //   console.log(`Saving ${year}-${month}`);
    //   const result = await fetchData(
    //     https://www.xemlicham.com/am-lich/nam/${year}/thang/${month}
    //   );
    //   var insertStatement = INSERT INTO lichthangtot (ngay, html) VALUES ('${year}-${month}-1', "${result}");
    //   db.query(insertStatement, (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    //   for (let day = 1; day <= new Date(year, month, 0).getDate(); day++) {
    //     console.log(`Saving ${year}-${month}-${day}`);
    //     const result = await fetchData(
    //       https://www.xemlicham.com/am-lich/nam/${year}/thang/${month}/ngay/${day}
    //     );
    //     var insertStatement = INSERT INTO xemlicham (ngay, html) VALUES ('${year}-${month}-${day}', "${result}");
    //     db.query(insertStatement, (err, result) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //     });
    //   }
    // }
  }
};

crawlData();
