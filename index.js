const puppet = require('puppeteer');
const fs = require('fs');

(async ()=> {
    let chanteurs = [];
    const browser = await puppet.launch();
    let annee = 1955 ;
    const page = await browser.newPage();
    await page.on('console', consoleObj => console.log(consoleObj.text()));

    for (annee ; annee <= 2021; annee++ ){
        await page.goto(`https://fr.wikipedia.org/wiki/Liste_des_titres_musicaux_num%C3%A9ro_un_en_France_en_${annee}`)
        const result = await page.evaluate((annee) => {
                let titres = document.querySelectorAll(".wikitable tr")
                console.log(annee)
                return Array.prototype.map.call(titres, function (titre) {

                    let title = titre.querySelector("td:nth-child(0n+4)")
                    let author = titre.querySelector("td:nth-child(0n+3)")
                    if (title !== null) {
                        return {auteur: author.innerText, titre: title.innerText, annee: annee};
                    }

                }, annee)
            },
            annee
        )

        await chanteurs.push(result);
        await console.log(chanteurs);
        fs.writeFile('./src/test.txt', JSON.stringify(chanteurs) , function (err) {})
    }


    await browser.close();
})();