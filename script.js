// Load data from localStorage
let total = localStorage.getItem("totalCount");
let topicData = JSON.parse(localStorage.getItem("topicData"));

if (!total) total = 0;
if (!topicData) {
    topicData = {
        Arrays: 0,
        Strings: 0,
        DP: 0,
        Graphs: 0,
        Trees: 0
    };
}

total = parseInt(total);

let chart; // for Chart.js

updateUI(); // initial UI update

// Function to add a problem
function addProblem() {
    let selectedTopic = document.getElementById("topic").value;

    total++;
    topicData[selectedTopic]++;

    // Save data in localStorage
    localStorage.setItem("totalCount", total);
    localStorage.setItem("topicData", JSON.stringify(topicData));

    updateUI();
}

// Function to update UI
function updateUI() {
    // Update total problems
    document.getElementById("total").innerText = total;

    // Update topic list
    let topicList = document.getElementById("topicList");
    topicList.innerHTML = "";

    let weakest = null;
    let min = Infinity;

    let labels = [];
    let data = [];

    for (let topic in topicData) {
        topicList.innerHTML += `<li>${topic}: ${topicData[topic]}</li>`;

        labels.push(topic);
        data.push(topicData[topic]);

        // Find weakest topic
        if (topicData[topic] < min) {
            min = topicData[topic];
            weakest = topic;
        }
    }

    // Show weakest topic
    document.getElementById("weakTopic").innerText =
        "⚠ Weakest Topic: " + weakest;

    // Create or update chart
    let ctx = document.getElementById("progressChart").getContext("2d");

    if (chart) {
        chart.destroy(); // destroy old chart
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Problems Solved",
                data: data,
                backgroundColor: [
                    "#4CAF50",
                    "#2196F3",
                    "#FF9800",
                    "#E91E63",
                    "#9C27B0"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Topic-wise Problems Solved"
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    precision:0
                }
            }
        }
    });
}

// ✅ Function to reset all data
function resetData() {
    if (confirm("Are you sure you want to reset all data?")) {
        total = 0;
        topicData = {
            Arrays: 0,
            Strings: 0,
            DP: 0,
            Graphs: 0,
            Trees: 0
        };

        localStorage.setItem("totalCount", total);
        localStorage.setItem("topicData", JSON.stringify(topicData));

        updateUI();
    }
}
