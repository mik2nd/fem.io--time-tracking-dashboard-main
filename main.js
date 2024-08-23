const main = document.querySelector("main");
const URL = "./data.json";
var reportsData = [];

showDataUser();
async function connectData() {
     const response = await fetch(URL);
     const result = await response.json();

     reportsData = result;
}

async function showDataUser(active) {
     await connectData();

     main.innerHTML += reportsData
          .map((report) => {
               let activeActivity = active;

               function activityActiveCurrent(act) {
                    if (act == "daily") {
                         let prev = report.timeframes.daily.previous;
                         return report.timeframes.daily.current;
                    }
                    if (act == "weekly") {
                         return report.timeframes.weekly.current;
                    }
                    if (act == "monthly") {
                         return report.timeframes.monthly.current;
                    }
                    return report.timeframes.weekly.current;
               }
               function activityActivePrevious(act) {
                    if (act == "daily") {
                         return report.timeframes.daily.previous;
                    }
                    if (act == "weekly") {
                         return report.timeframes.weekly.previous;
                    }
                    if (act == "monthly") {
                         return report.timeframes.monthly.previous;
                    }
                    return report.timeframes.weekly.previous;
               }
               function activeTime() {
                    if (activeActivity == "daily") {
                         return "day";
                    }
                    if (activeActivity == "weekly") {
                         return "week";
                    }
                    if (activeActivity == "monthly") {
                         return "month";
                    }
                    return "week";
               }

               return `
    <div class="borad ${report.title.toLowerCase().replace(" ", "-")}">
      <div class="accent_box"></div>
      <div class="stats">
        <div class="line_rad"></div>
        <h3>${report.title}</h3>
        <h1>${activityActiveCurrent(activeActivity)} hrs</h1>
        <span>Last ${activeTime(activeActivity)} - ${activityActivePrevious(activeActivity)} hrs</span>
        <div class="container--tri__dots">
          <svg id="tri-dot" width="21" height="5" ="http://www.w3.org/2000svg">
            <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>
  `;
          })
          .join("");
}

window.addEventListener("click", (e) => {
     if (e.target.matches(".daily")) {
          removeActivityActive();
          e.target.classList.add("activity-active");
          buttonActivityFunc("daily");
     }
     if (e.target.matches(".weekly")) {
          removeActivityActive();
          e.target.classList.add("activity-active");
          buttonActivityFunc("weekly");
     }
     if (e.target.matches(".monthly")) {
          removeActivityActive();
          e.target.classList.add("activity-active");
          buttonActivityFunc("monthly");
     }
});

function buttonActivityFunc(activity) {
     loopingForDeleteSixChildrenWithIndexOne();
     showDataUser(activity);
}

function loopingForDeleteSixChildrenWithIndexOne() {
     for (let i = 1; i <= 6; i++) {
          main.children[1].remove();
     }
}

function removeActivityActive() {
     const allBtn = document.querySelectorAll(".container-actvity button");

     for (item of allBtn) {
          item.classList.remove("activity-active");
     }
}
