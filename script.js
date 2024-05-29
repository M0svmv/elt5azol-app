document.addEventListener("DOMContentLoaded", function () {
    const daysContainer = document.getElementById("days");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const dateCal = document.getElementById("cal");
    const scoreSpan = document.getElementById("score");
    const dailyBtn = document.getElementById("DailyBtn");
    const longTermBtn = document.getElementById("longTermBtn");

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date().toDateString();
    const longTermTasks = new Date(0).toDateString();
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let selectedDay = null;
    let todoObj = JSON.parse(localStorage.getItem("todoObj")) || {};
    let completedDays = JSON.parse(localStorage.getItem("completedDays")) || [];
    let score = completedDays.length;

    scoreSpan.innerText = `${score}`;
    displayDays(month, year);

    nextBtn.addEventListener("click", () => changeMonth(1));
    prevBtn.addEventListener("click", () => changeMonth(-1));
    dailyBtn.addEventListener("click", () => createTodoModal(today));
    longTermBtn.addEventListener("click", () => createTodoModal(longTermTasks));

    function changeMonth(offset) {
        month += offset;
        if (month > 11) {
            month = 0;
            year++;
        } else if (month < 0) {
            month = 11;
            year--;
        }
        daysContainer.innerHTML = "";
        displayDays(month, year);
    }

    function displayDays(month, year) {
        daysContainer.innerHTML = "";
        dateCal.innerText = `${months[month]} ${year}`;

        let firstDayOfMonth = new Date(year, month, 1).getDay();
        let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        let totalDays = firstDayOfMonth + lastDateOfMonth;

        for (let i = 1; i <= totalDays; i++) {
            let dayDiv = createDayElement(i, firstDayOfMonth, lastDateOfMonth, month, year);
            daysContainer.appendChild(dayDiv);
        }
    }

    function createDayElement(i, firstDayOfMonth, lastDateOfMonth, month, year) {
        let dayDiv = document.createElement("div");
        dayDiv.classList.add("day");

        if (i > firstDayOfMonth) {
            let dayNumber = i - firstDayOfMonth;
            let dayDate = new Date(year, month, dayNumber).toDateString();
            dayDiv.innerText = dayNumber;
            dayDiv.dataset.date = dayDate;

            if (dayDate === today) {
                dayDiv.style.border = "2px solid black";
            }

            if (completedDays.includes(dayDate)) {
                dayDiv.style.backgroundColor = "lightgreen";
            } else if (todoObj[dayDate] && todoObj[dayDate].some(task => !task.completed)) {
                dayDiv.style.backgroundColor = "lightcoral"; // Mark days with incomplete tasks
            }

            dayDiv.addEventListener("click", () => createTodoModal(dayDate));
        } else {
            dayDiv.style.backgroundColor = "#f0f0f0";
        }

        return dayDiv;
    }

    function createTodoModal(dayData) {
        selectedDay = dayData;

        let backDiv = document.createElement("div");
        backDiv.classList.add("backDiv");

        let closeButton = document.createElement("button");
        closeButton.classList.add("xbtn");
        closeButton.innerText = "X";
        closeButton.addEventListener("click", () => backDiv.remove());
        dayData === longTermTasks ?  closeButton.style.backgroundColor="#55c2b5" : "#c790fb";
        dayData === longTermTasks ?  closeButton.addEventListener("mouseover",()=>{closeButton.style.cssText=`
        background-color:#31a093;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === longTermTasks ?  closeButton.addEventListener("mouseout",()=>{closeButton.style.cssText=`
        background-color:#55c2b5;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";

        dayData === today ?  closeButton.style.backgroundColor="#f87d74" : "#c790fb";
        dayData === today ?  closeButton.addEventListener("mouseover",()=>{closeButton.style.cssText=`
        background-color:#f9a59f;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === today ?  closeButton.addEventListener("mouseout",()=>{closeButton.style.cssText=`
        background-color:#f87d74;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";

        backDiv.appendChild(closeButton);

        let containerDiv = document.createElement("div");
        containerDiv.classList.add("container");
        backDiv.appendChild(containerDiv);

        initTodoList(containerDiv, dayData);
        document.body.appendChild(backDiv);
    }

    function initTodoList(container, dayData) {
        container.innerHTML = `
            <h1>${dayData === longTermTasks ? "Long-Term Goals" : "Daily ToDos"} </h1>
            <div class="taskEntry">
                <input type="text" class="task-input" placeholder="Enter task">
                <button class="add-task-btn"><img src="./add.svg" alt="Add"></button>
            </div>
            <div class="taskShow">
                <ul class="task-list"></ul>
                <button class="clear-all-btn">Clear All</button>
            </div>
        `;

        const taskList = container.querySelector(".task-list");
        const addTaskBtn = container.querySelector(".add-task-btn");
        const clearAllBtn = container.querySelector(".clear-all-btn");

        dayData === longTermTasks ? addTaskBtn.style.backgroundColor="#55c2b5" : "#c790fb";
        dayData === longTermTasks ?  addTaskBtn.addEventListener("mouseover",()=>{addTaskBtn.style.cssText=`
        background-color:#31a093;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === longTermTasks ?  addTaskBtn.addEventListener("mouseout",()=>{addTaskBtn.style.cssText=`
        background-color:#55c2b5;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";

        dayData === today ?  addTaskBtn.style.backgroundColor="#f87d74" : "#c790fb";
        dayData === today ?  addTaskBtn.addEventListener("mouseover",()=>{addTaskBtn.style.cssText=`
        background-color:#f9a59f;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === today ?  addTaskBtn.addEventListener("mouseout",()=>{addTaskBtn.style.cssText=`
        background-color:#f87d74;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === longTermTasks ? clearAllBtn.style.backgroundColor="#55c2b5" : "#c790fb";
        dayData === longTermTasks ?  clearAllBtn.addEventListener("mouseover",()=>{clearAllBtn.style.cssText=`
        background-color:#31a093;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === longTermTasks ?  clearAllBtn.addEventListener("mouseout",()=>{clearAllBtn.style.cssText=`
        background-color:#55c2b5;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === today ?  clearAllBtn.style.backgroundColor="#f87d74" : "#c790fb";
        dayData === today ?  clearAllBtn.addEventListener("mouseover",()=>{clearAllBtn.style.cssText=`
        background-color:#f9a59f;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === today ?  clearAllBtn.addEventListener("mouseout",()=>{clearAllBtn.style.cssText=`
        background-color:#f87d74;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";

        let storedTasks = todoObj[dayData] || [];
        storedTasks.forEach(task => appendTask(task.text, task.completed, taskList, dayData));

        addTaskBtn.addEventListener("click", () => {
            const taskInput = container.querySelector(".task-input");
            const taskText = taskInput.value.trim();
            if (taskText) {
                appendTask(taskText, false, taskList, dayData);
                taskInput.value = "";
            } else {
                alert("Please enter a task!");
            }
        });

        clearAllBtn.addEventListener("click", () => clearAllTasks(dayData, taskList));
    }

    function appendTask(taskText, isCompleted, taskList, dayData) {
        let taskItem = document.createElement("li");
        taskItem.classList.add("task");

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''}>
            <span class="task-text ${isCompleted ? 'task-completed' : ''}">${taskText}</span>
            <span class="delete-btn"><i class="fas fa-trash-alt"></i></span>
        `;

        taskItem.querySelector(".task-checkbox").addEventListener("change", () => updateTaskStatus(taskItem, taskList, dayData));
        taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(taskItem, taskList, dayData));
        dayData === longTermTasks ? taskItem.querySelector(".delete-btn").style.backgroundColor="#55c2b5" : "#c790fb";
        dayData === longTermTasks ?  taskItem.style.backgroundColor="#d4e6e4" : "#c790fb";
        dayData === longTermTasks ?  taskItem.querySelector(".delete-btn").addEventListener("mouseover",()=>{taskItem.querySelector(".delete-btn").style.cssText=`
        background-color:#31a093;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === longTermTasks ?  taskItem.querySelector(".delete-btn").addEventListener("mouseout",()=>{taskItem.querySelector(".delete-btn").style.cssText=`
        background-color:#55c2b5;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";

        dayData === today ?  taskItem.querySelector(".delete-btn").style.backgroundColor="#f87d74" : "#c790fb";
        dayData === today ?  taskItem.querySelector(".delete-btn").addEventListener("mouseover",()=>{taskItem.querySelector(".delete-btn").style.cssText=`
        background-color:#f9a59f;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
        dayData === today ?  taskItem.querySelector(".delete-btn").addEventListener("mouseout",()=>{taskItem.querySelector(".delete-btn").style.cssText=`
        background-color:#f87d74;
        transition: all 500ms ease-in-out;
        `}) : "#c790fb";
       
        taskList.appendChild(taskItem);
        updateStoredTasks(dayData, taskList);
    }

    function updateTaskStatus(taskItem, taskList, dayData) {
        taskItem.querySelector(".task-text").classList.toggle("task-completed", taskItem.querySelector(".task-checkbox").checked);
        updateStoredTasks(dayData, taskList);
    }

    function deleteTask(taskItem, taskList, dayData) {
        taskList.removeChild(taskItem);
        updateStoredTasks(dayData, taskList);
    }

    function updateStoredTasks(dayData, taskList) {
        const tasks = Array.from(taskList.querySelectorAll(".task")).map(taskItem => ({
            text: taskItem.querySelector(".task-text").textContent,
            completed: taskItem.querySelector(".task-checkbox").checked
        }));
        todoObj[dayData] = tasks;
        localStorage.setItem("todoObj", JSON.stringify(todoObj));
        updateDayColor(dayData, taskList);
    }

    function clearAllTasks(dayData, taskList) {
        taskList.innerHTML = "";
        todoObj[dayData] = [];
        localStorage.setItem("todoObj", JSON.stringify(todoObj));
        updateDayColor(dayData, taskList);
    }

    function updateDayColor(dayData, taskList) {
        let dayTasks = todoObj[dayData] || [];
        let allCompleted = dayTasks.length > 0 && dayTasks.every(task => task.completed);
        let dayDiv = daysContainer.querySelector(`[data-date='${dayData}']`);

        if (dayDiv) { // Check if dayDiv is not null
            if (allCompleted) {
                dayDiv.style.backgroundColor = "lightgreen";
                if (!completedDays.includes(dayData)) {
                    completedDays.push(dayData);
                    score++;
                }
            } else {
                if (dayTasks.length > 0) {
                    dayDiv.style.backgroundColor = "lightcoral"; // Mark days with incomplete tasks
                } else {
                    dayDiv.style.backgroundColor = "";
                }
                completedDays = completedDays.filter(date => date !== dayData);
                score = completedDays.length;
            }

            localStorage.setItem("completedDays", JSON.stringify(completedDays));
            scoreSpan.innerText = `${score}`;
        }
    }
});
