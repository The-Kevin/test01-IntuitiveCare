import axios from "axios";
import http from "http";
import cheerio from "cheerio";
import fs from "fs";

import { Response, Request } from "express";

export const test01 = async (req: Request, res: Response) => {
  const url =
    "http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar";

  const value = [];
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const queryPrimary = $(".alert-icolink:first")
      .children()
      .toArray()
      .map((elementPrimary) => $(elementPrimary).attr("href"));

    // ^^ login primary page

    const htmlTiss = await axios.get(
      url.substr(0, 21) + queryPrimary.toString()
    );

    const $$ = cheerio.load(htmlTiss.data);
    const link = $$('a[class="btn btn-primary btn-sm center-block"]:first');

    const getLinkTiss = $$(link).each((i, href) => {
      const lastLink = $$(href).attr("href");
      value.push({ link: lastLink });
    });

    await axios({
      method: "get",
      url: url.substr(0, 21) + value[0]["link"],
      responseType: "stream",
    }).then((response) => {
      response.data.pipe(fs.createWriteStream("./src/archives/tiss.pdf"));
    });
    //const request = await axios.get(url.substr(0, 21) + value[0]["link"]);
    /*const request = http.get(url.substr(0, 21) + value[0]["link"], (response) =>
      response.pipe(fs.createWriteStream("./src/archives/tiss.pdf"))
    );*/
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
};
