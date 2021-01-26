import * as puppeteer from 'puppeteer';
import * as fs from 'fs' ;

class Scrapper {
    public annee: number

    constructor() {
        this.annee = 1955
    }

    evaluate(an) : object {
        let singles = document.querySelectorAll(".wikitable:first-child tr")
        let res = [];
        for (let i = 1 ; i <= singles.length ; i++){
            let titre = singles[i].querySelector("td:nth-child(0n+4)")
            let auteur = singles[i].querySelector("td:nth-child(0n+3)")
            console.log('tttt')
            if (titre !== null) {
                res.push({auteur: auteur.textContent, titre: titre.textContent, annee: an}) ;
            }
        }
        return res ;
    }

    async extract(url) : Promise<any>{
        try {
            let data = [];
            const browser = await puppeteer.launch({headless : false});
            const page = await browser.newPage();

            page.on('console', consoleObj => console.log(consoleObj.text()));

            for (this.annee ; this.annee <= 1958 ; this.annee = this.annee + 1){
                await page.goto(url + this.annee)
                let an = this.annee
                const resultat = page.evaluate(this.evaluate , an);
                await data.push(resultat);
                await console.log(resultat);
                await console.log(JSON.stringify(data));
                fs.writeFile('./src/Singles.txt', JSON.stringify(data), function (err) {
                })
            };
            await browser.close()
        } catch (err) {
            console.error(err)
        }
    }

}

const scrapper = new Scrapper();

scrapper.extract('https://fr.wikipedia.org/wiki/Liste_des_titres_musicaux_num%C3%A9ro_un_en_France_en_')