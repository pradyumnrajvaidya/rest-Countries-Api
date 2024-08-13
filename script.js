let selectedCountries = [];

fetch("https://restcountries.com/v3.1/all").then((data) => {

    return data.json();

}).then((jsonData) => {

    jsonData.forEach((country) => {

        selectedCountries.push(country);

    })
    display();
})

let selectOption = document.getElementById('selectRegion');

selectOption.addEventListener("change", (eventObject) => {

    let card = document.getElementById('cards');
    card.innerHTML = '';

    let region = eventObject.target.value;

    if (region != 'Filter by Region') {

        selectedCountries = [];

    }
    fetch("https://restcountries.com/v3.1/all").then((data) => {

        return data.json();

    }).then((jsonData) => {

        if (region == 'Africa') {

            jsonData.forEach((country) => {

                if (country.region == 'Africa') {

                    selectedCountries.push(country);

                }

            })

        } else if (region == 'America') {

            jsonData.forEach((country) => {

                if (country.region == 'Americas') {

                    selectedCountries.push(country);

                }

            })

        } else if (region == 'Asia') {

            jsonData.forEach((country) => {

                if (country.region == 'Asia') {

                    selectedCountries.push(country);

                }

            })

        } else if (region == 'Europe') {

            jsonData.forEach((country) => {

                if (country.region == 'Europe') {

                    selectedCountries.push(country);

                }

            })

        } else if (region == 'Oceania') {

            jsonData.forEach((country) => {

                if (country.region == 'Oceania') {

                    selectedCountries.push(country);

                }

            })
        }

        // Creat the option for subregion drop down.

        if (region != 'Filter by Region') {
            let subRegionScroll = document.getElementById('selectSubRegion');
            subRegionScroll.innerHTML = '';
            let subCountries = [];
            selectedCountries.forEach((country) => {
                if (country.hasOwnProperty("subregion")) {
                    if (!subCountries.includes(country.subregion)) {
                        subCountries.push(country.subregion);
                    }
                }
            })
            subCountries.forEach((subregion) => {
                let opt = document.createElement('option');
                opt.innerText = subregion;
                subRegionScroll.append(opt);
            })
        }

        display(selectedCountries);

    }).catch((error) => {

        let card = document.getElementById('cards');
        card.innerHTML = '';
        let errorTag = document.createElement('div')
        errorTag.innerHTML = `There is an Error While Fetching the data. \n ${error}`;
        card.append(errorTag);

    })

})

// append the card to the section.


function appendInSection(country) {
    let anchorTag = document.createElement('a');
    anchorTag.setAttribute("href", "#")

    let container = document.createElement('div');
    container.setAttribute("class", "w-72 inline-block border-2 rounded-xl overflow-hidden m-7 bg-slate-200");
    anchorTag.append(container);

    let img = document.createElement('img');
    img.src = country.flags.png;
    img.alt = "img";
    img.setAttribute("class", "w-full h-36");
    container.append(img);

    let conatinerTags = document.createElement('div');
    conatinerTags.setAttribute("class", "pl-5 flex flex-col my-3");
    container.append(conatinerTags);

    let heading = document.createElement('h1');
    heading.setAttribute("class", "font-bold text-2xl my-3");
    heading.innerText = country.name.common;
    conatinerTags.append(heading);

    let population = document.createElement('div');
    population.innerHTML = "<b>Population</b>: " + country.population;
    conatinerTags.append(population);

    let region = document.createElement('div');
    region.innerHTML = "<b>Region</b>: " + country.region;
    conatinerTags.append(region);

    let capital = document.createElement("div");
    if (country.capital != undefined) {
        capital.innerHTML = "<b>Capital</b>: " + country.capital;
    }
    conatinerTags.append(capital);

    let card = document.getElementById('cards');
    card.append(anchorTag);
}


// Switch dark mode..


let switchMode = document.getElementById('mode');

switchMode.addEventListener('click', () => {

    let body = document.getElementById('bodyTag');

    let bodyStyle = getComputedStyle(body);

    if (bodyStyle.backgroundColor == 'rgb(241, 245, 249)') {
        // if white.
        body.style.backgroundColor = 'rgb(15, 23, 42)';

    } else if (bodyStyle.backgroundColor == 'rgb(15, 23, 42)') {
        // if black.
        body.style.backgroundColor = 'rgb(241, 245, 249)';

    }
})


// Search a single country..


let inputTag = document.getElementById("searchCountry");

inputTag.addEventListener("input", (event) => {

    let card = document.getElementById('cards');
    card.innerHTML = '';
    selectedCountries.forEach((country) => {

        if (country.name.common.includes((event.target.value).trim())) {

            appendInSection(country);

        }
    })
})

// display by subregion 

let subregionScroll = document.getElementById('selectSubRegion');

subregionScroll.addEventListener("change", (eventObject) => {

    let card = document.getElementById('cards');
    card.innerHTML = '';
    selectedCountries = [];
    fetch("https://restcountries.com/v3.1/all").then((data) => {

        return data.json();

    }).then((jsonData) => {

        jsonData.forEach((country) => {

            if (country.hasOwnProperty("subregion")) {

                if (country.subregion == eventObject.target.value) {

                    selectedCountries.push(country);

                }
            }
        })
        display();
    })
})

// sort the countries

// let Sort = document.getElementById("sort");

// Sort.addEventListener("change",(eventObject) => {

//     // selectedCountries.sort((a,b) =>  )

// })


// display all card in screen.

function display() {

    selectedCountries.forEach((country) => {

        appendInSection(country);

    })
}