const country = document.getElementById("country");
const flag = document.getElementById("flag");
const totalCase = document.getElementById("totalCase");
const totalCaseToday = document.getElementById("totalCaseToday");
const totalDath = document.getElementById("totalDath");
const totalDathToday = document.getElementById("totalDathToday");
const totalRecovered = document.getElementById("totalRecovered");
const totalTestsToday = document.getElementById("totalTestsToday");
const updateTime = document.getElementById("updateTime");
const covid19SearchInput = document.getElementById("covid19SearchInput");
const covid19SearchBtn = document.getElementById("covid19SearchBtn");
const title =   document.getElementsByTagName('title');

const populateDataInRow = document.getElementById("populateDataInRow");

// let cunt = country.innerHTML != "" ? country.innerHTML : 'Bangladesh';

let API = `https://disease.sh/v2/countries/`;

window.onload = callApi(API + "Bangladesh");

window.onload = callApiAll(API);

covid19SearchInput.addEventListener("keypress", function (e) {
  e.preventDefault();
  // console.log(e.target.value)
  if (e.target.value != "") {
    if (e.key == "Enter") {
      //  country.innerHTML= e.target.value
      callApi(API + e.target.value);
      e.target.value = "";
    }
  }else{
    if (e.key == "Enter") {
        e.preventDefault();
        alert('Please Type your desired Country and Hit Enter or Click on the Button');
    }
}
});

covid19SearchBtn.addEventListener("click", function (e) {
    // console.log(e.target.value)
    e.preventDefault();
    if (covid19SearchInput.value != "") {
      
        //  country.innerHTML= e.target.value
        callApi(API + covid19SearchInput.value);
        covid19SearchInput.value = "";
      
    }else{
        e.preventDefault();
        alert('Please Type your desired Country and Hit Enter or Click on the Button');
    }
  });

function covid19Report(data) {
  let covid19report = {
    active: data.active,
    cases: data.cases,
    casesPerOneMillion: data.casesPerOneMillion,
    continent: data.continent,
    country: data.country,
    countryInfo: {
      flag: data.countryInfo.flag,
      iso2: data.countryInfo.iso2,
      lat: data.countryInfo.lat,
      long: data.countryInfo.long,
      _id: data.countryInfo._id,
    },
    critical: data.critical,
    deaths: data.deaths,
    deathsPerOneMillion: data.deathsPerOneMillion,
    recovered: data.recovered,
    tests: data.tests,
    testsPerOneMillion: data.testsPerOneMillion,
    todayCases: data.todayCases,
    todayDeaths: data.todayDeaths,
    updated: data.updated,
  };

  //Implement Data to HTML
  totalCase.innerHTML = covid19report.cases;
  totalDath.innerHTML = covid19report.deaths;
  totalTestsToday.innerHTML = covid19report.tests;
  totalRecovered.innerHTML = covid19report.recovered;
  totalCaseToday.innerHTML = covid19report.todayCases;
  totalDathToday.innerHTML = covid19report.todayDeaths;
  flag.src = covid19report.countryInfo.flag;
  country.innerHTML = covid19report.country;

  let metaInfo = `Corona Live Update - BD  
  Today Case ${covid19report.todayCases}, 
  Death ${covid19report.todayDeaths},
  Total Case ${covid19report.cases},
  Death Case ${covid19report.deaths},
  Total Test ${covid19report.tests},
  Recoverd ${covid19report.recovered}
  `;
  document.title = metaInfo;
  $('document.title').replaceWith('document.title="'+metaInfo+'">');
  $('meta[property="og:title"]').replaceWith('<meta property="og:title" content="'+metaInfo+'">');
  $('meta[property="twitter:title"]').replaceWith('<meta property="twitter:title" content="'+metaInfo+'">');
  $('meta[property="twitter:card"]').replaceWith('<meta property="twitter:card" content="'+metaInfo+'">');

  // document.title= 'Hello World';
  updateTime.innerHTML =
    new Date(covid19report.updated).toLocaleDateString() +
    " - " +
    new Date(covid19report.updated).toLocaleTimeString();

   
    
}

function callApi(COVID19_API) {
  axios
    .get(COVID19_API)
    .then((response) => {
      // console.log(response.data);
      // console.log(response.data.active);
      covid19Report(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
}

function callApiAll(api) {
  axios
    .get(api)
    .then((response) => {
      // console.log(response.data);
      let deathArr = [];
      response.data.forEach((indivData, i) => {

        let tr = document.createElement("tr");

        let thId = document.createElement("th");
        let thCont = document.createElement("th");
        let thCase = document.createElement("th");
        let thNewCase = document.createElement("th");
        let thDeath = document.createElement("th");
        let thRecover = document.createElement("th");
        let thActive = document.createElement("th");
        let thCritical = document.createElement("th");
        let thTotCases1mPop = document.createElement("th");
        let thdeathsPerOneMillion = document.createElement("th");
        let thTests = document.createElement("th");
        let testsPerOneMillion = document.createElement("th");

        thId.innerHTML = i + 1;
        thCont.innerHTML = indivData.country;
        thCase.innerHTML = indivData.cases;
        thNewCase.innerHTML = indivData.todayCases;
        thDeath.innerHTML = indivData.deaths;
        thDeath.style.color = "red";
        thDeath.style.fontSize = "20px";

        thRecover.innerHTML = indivData.recovered;
        thRecover.style.color = "green";
        thActive.innerHTML = indivData.active;
        thCritical.innerHTML = indivData.critical;
        thCritical.style.color = "red";
        thCritical.style.fontSize = "20px";
        thTotCases1mPop.innerHTML = indivData.casesPerOneMillion;
        thdeathsPerOneMillion.innerHTML = indivData.deathsPerOneMillion;
        thTests.innerHTML = indivData.tests;
        testsPerOneMillion.innerHTML = indivData.testsPerOneMillion;
        
        // console.log(indivData.deaths);
        if (indivData.deaths > 1000) {
          tr.classList.add("table-danger");
        } else if (indivData.deaths > 501 && indivData.deaths < 1000) {
          tr.classList.add("table-warning");
        } else if (indivData.deaths > 100 && indivData.deaths < 500) {
          tr.classList.add("table-warning");
        } else {
          tr.classList.add("table-primary");
        }

        tr.appendChild(thId);
        tr.appendChild(thCont);
        tr.appendChild(thCase);
        tr.appendChild(thNewCase);
        tr.appendChild(thDeath);
        tr.appendChild(thRecover);
        tr.appendChild(thActive);
        tr.appendChild(thCritical);
        tr.appendChild(thTotCases1mPop);
        tr.appendChild(thdeathsPerOneMillion);
        tr.appendChild(thTests);
        tr.appendChild(testsPerOneMillion);

        // console.log(tr);

        populateDataInRow.appendChild(tr);
      

        // console.log(populateDataInRow);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

// let tr = document.createElement('tr');
// let th = document.createElement('th');
// th.innerHTML = indivData._id;
// th.innerHTML = indivData.country;
// tr.appendChild(thElm);
// populateDataInRow.appendChild(tr);
