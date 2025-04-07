class ToDoModel {
    constructor() {
        this._toDos = [];
    }

    addToDo(text) {
        let toDo = {id: Date.now(), text: text, completed: false};
        this._toDos.push(toDo);

        return toDo;
    }

    removeToDo(id) {
        this._toDos = this._toDos.filter(element => element.id !== id)
    }

    toggleToDo(id) {
        let element = this._toDos.find((element) => element.id === id);
        element.completed = !element.completed;
    }

    getToDos() {
        return this._toDos;
    }

    changeToDo(id, text) {
        let toDo = this._toDos.find(element => element.id === id);
        toDo.text = text;
    }

    clearCompleted() {
        this._toDos = this._toDos.filter(item => !item.completed);
    }

    isEmpty() {
        return this._toDos.length === 0;
    }

    //Filters for todo list all/completed/active
    getFilterdToDos(filter) {
        if (filter === "all")
            return this._toDos;

        if (filter === "completed")
            return this._toDos.filter(element => element.completed === true)


        if (filter === "active")
            return this._toDos.filter(element => element.completed === false)
    }

    getCountActiveToDo() {
        let count = 0;
        this._toDos.forEach(item => !item.completed ? count++ : count);
        return count;
    }

    getCountCompletedToDo() {
        let count = 0;
        this._toDos.forEach(item => item.completed ? count++ : count);
        return count;
    }
}