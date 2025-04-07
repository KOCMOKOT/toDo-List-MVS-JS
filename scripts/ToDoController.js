class ToDoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.filter = "all";

        this.view.bindAddToDo(this.handleAddToDo.bind(this));
        this.view.bindToggleToDo(this.handleToggleToDo.bind(this));
        this.view.bindRemoveToDo(this.handleRemoveToDo.bind(this));
        this.view.bindMouseoverTodo(this.handleMouseoverToDo.bind(this));
        this.view.bindMouseoutTodo(this.handleMouseoutToDo.bind(this));
        this.view.bindDbClickToDo(this.handleDbClickToDo.bind(this));
        this.view.bindClickFilterButton(this.handleClickFilterButton.bind(this));
        this.view.bindClickClearCompleted(this.handleClickClearCompleted.bind(this));
    }

    handleAddToDo(text) {
        this.model.addToDo(text);
        this.updateView();
    }

    handleToggleToDo(id) {
        this.model.toggleToDo(id);
        this.updateView();
    }

    handleRemoveToDo(id) {
        this.model.removeToDo(id);
        this.updateView();
    }

    handleMouseoverToDo(id) {
        this.view.toggleDeleteButton(id);
    }

    handleMouseoutToDo(id) {
        this.view.toggleDeleteButton(id);
    }

    handleDbClickToDo(id) {
        this.view.addEditingInputToDo(id, this.model.changeToDo.bind(this.model));
    }

    handleClickFilterButton(event) {
        this.filter = event.target.value;
        this.updateView();
    }

    handleClickClearCompleted() {
        this.model.clearCompleted();
        this.updateView();
    }

    updateView() {
        let filteredToDos = this.model.getFilterdToDos(this.filter);
        this.view.renderToDos(this.model, this.filter);
    }
}