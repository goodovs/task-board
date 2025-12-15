console.log("Frontend connected to backend");

// یک تابع ساده برای گرفتن تسک‌ها از backend
async function fetchTasks() {
    try {
        const response = await fetch("http://localhost:8000/tasks");
        const tasks = await response.json();
        console.log("Tasks from backend:", tasks);

        // نمایش در صفحه
        const body = document.querySelector("body");
        const ul = document.createElement("ul");
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.title || JSON.stringify(task);
            ul.appendChild(li);
        });
        body.appendChild(ul);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

fetchTasks();

