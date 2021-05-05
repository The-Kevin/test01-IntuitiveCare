import axios from "axios";
import cheerio from "cheerio";

import { Response } from "express";

export const test01 = async (res: Response) => {
  const url =
    "http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar";

  try {
    axios.get(url).then((responsePrimary) => {
      const htmlPrimary = responsePrimary.data;
      const $ = cheerio.load(htmlPrimary);
      const queryPrimary = $(".alert-icolink:first")
        .children()
        .toArray()
        .map((elementPrimary) => $(elementPrimary).attr("href"));
      // enter on primary url ^^

      axios.get(url.substr(0, 21) + queryPrimary).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const query = $(".table-responsive");

        query
          .children()
          .toArray()
          .map((element) => console.log(element));
      });
    });

    /*   axios.get(url.substr(0, 21) + query).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const query = $(".table-responsive:first")
        .children()
        .toArray()
        .map((element) => $(element).attr("href"));
      // enter on primary url ^^
    });*/
    return 0;
  } catch (error) {
    console.log(error);
    return res.send("error");
  }
};
