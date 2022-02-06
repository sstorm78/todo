import { Component } from "react";
import {
    getTaskList,
    createTask,
    updateTask,
    deleteTask,
} from "./services/task_service";

class Tasks extends Component {
    state = { 
        tasks: [],
        currentTask: "",
        currentView: "all"
    };

    async componentDidMount() {
        try {

            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css';
            link.media = 'all';
            document.head.appendChild(link);

            await this.loadTasks();
        } catch (error) {
            console.log(error);
        }
    }

    loadTasks = async () => {

        const { data } = await getTaskList();
        this.setState({ tasks: data });
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };

    handleView = async (view) => {

        await this.loadTasks();
        const originalTasks = this.state.tasks;
        var tasks;

        switch (view) {
            case "active":
                tasks = originalTasks.filter(
                    (task) => task.completed == false
                );
                this.setState({ tasks });
                break;
            case "completed":
                tasks = originalTasks.filter(
                    (task) => task.completed == true
                );
                this.setState({ tasks });
                break;
        }

        this.setState({ currentView: view });
    };

    handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createTask({ content: e.target.elements.content.value });
            this.setState({ currentTask: "" });
            await this.loadTasks();
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task.id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            this.setState({ tasks });

            await updateTask(currentTask, {
                completed: tasks[index].completed,
            });

        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(
                (task) => task.id !== currentTask
            );
            this.setState({ tasks });
            await deleteTask(currentTask);
     } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };


}

export default Tasks;