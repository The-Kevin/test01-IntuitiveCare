import axios from "axios";
import http from "http";
import cheerio from "cheerio";
import fs from "fs";

import { Response, Request } from "express";

export const test01 = async (req: Request, res: Response) => {
  const URL_SERVER = "http://www.ans.gov.br";
  const url = "/prestadores/tiss-troca-de-informacao-de-saude-suplementar";
  const value = [];
  try {
    const { data } = await axios.get(URL_SERVER + url);
    const $ = cheerio.load(data);
    const queryPrimary = $(".alert-icolink:first")
      .children()
      .toArray()
      .map((elementPrimary) => $(elementPrimary).attr("href"));

    // ^^ login primary page

    const htmlTiss = await axios.get(URL_SERVER + queryPrimary.toString());

    const $$ = cheerio.load(htmlTiss.data);
    const link = $$('a[class="btn btn-primary btn-sm center-block"]:first');

    $$(link).each((i, href) => {
      const lastLink = $$(href).attr("href");
      value.push({ link: lastLink });
    });

    const urlLink = URL_SERVER + value[0]["link"];

    http.get(urlLink, (response) =>
      response.pipe(fs.createWriteStream("./src/archives/tiss.pdf"))
    );
    return res.redirect(urlLink);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
};
