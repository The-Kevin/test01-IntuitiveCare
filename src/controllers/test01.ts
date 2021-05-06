import axios from "axios";
import http from "http";
import cheerio from "cheerio";
import fs from "fs";

import { Response, Request } from "express";

export const test01 = async (req: Request, res: Response) => {
  const url =
    "http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const queryPrimary = $(".alert-icolink:first")
      .children()
      .toArray()
      .map((elementPrimary) => $(elementPrimary).attr("href"));

    const htmlTiss = await axios.get(
      url.substr(0, 21) + queryPrimary.toString()
    );

    const $$ = cheerio.load(htmlTiss.data);
    const tiss: any = $$('a[href$="202103.pdf"]').text();

    /*const file = fs.createWriteStream("./tiss.pdf");
    const request = http.get(tiss, (response) => {
      response.pipe(file);
      console.log("done");
    });*/
  } catch (error) {
    console.log(error);
    return res.send("error");
  }
};
