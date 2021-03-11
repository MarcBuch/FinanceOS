# FinanceDashboard
Dashboard used to explore data on personal finance and spending habits.

## Problem
To save successfully, you need to know where your hard earned money is going.

### Finance Dashboard V1
The first version of this project consisted of a excel spreadsheet and PowerBi. I've added every single transaction from my accounts into the excel file and created reports in PowerBi.

![Finance Dashboard V1](./frontend/assets/img/financeDashboardV1.png)


### Finance Dashboard V2 - Work In Progress
I'm using MongoDB to store all transactions and stats like Net Income, serve it via a Node.js API and display it via Chart.js.

![Finance Dashboard V2](./frontend/assets/img/financeDashboardV2.png)

#### How To
cd into ./docker and run "docker-compose -f docker-compose.yml up -d"
