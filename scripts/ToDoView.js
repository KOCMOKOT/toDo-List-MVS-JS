class ToDoView {
    constructor() {
        this.toDo_input = document.getElementById('todo_input');
        this.toDo_list = document.getElementById('todo_list');
        this.toDo_footer = document.getElementById("todo_footer");

        // State of editing one of the todo
        this.isEditing = false;
    }

    renderToDos(toDos, filter) {
        this.renderToDoFooter(toDos.getCountActiveToDo(), toDos.getCountCompletedToDo(), toDos.isEmpty());
        this.renderToDoList(toDos.getFilterdToDos(filter));
    }

    renderToDoList(toDos) {
        this.toDo_list.innerHTML = '';
        toDos.forEach(toDo => {
            let li= document.createElement("li");
            li.id = toDo.id;
            li.className = toDo.completed ? "completed" : "";
            li.addEventListener("click", () => {
                this.isEditing || this.onToggle(toDo.id);
            });
            li.addEventListener("mouseover", (e) => {
                this.isEditing || this.onMouseoverTodo(toDo.id)
            });
            li.addEventListener("mouseout", (e) => {
                this.isEditing || this.onMouseoutTodo(toDo.id)
            });

            let label = document.createElement("label");
            label.innerHTML = toDo.text;
            label.addEventListener("dblclick", (e) => {
                this.isEditing || this.onDbClickTodo(toDo.id)
            })

            let button = document.createElement("button");
            button.hidden = true;
            button.className = "delete";
            button.innerHTML = "X";
            button.addEventListener("click", (event) => {
                this.onRemove(toDo.id);
                event.stopPropagation();
            });

            li.appendChild(label);
            li.appendChild(button);
            this.toDo_list.appendChild(li);
        });


    }

    renderToDoFooter(countActive, countCompleted, isEmptyList) {
        if (this.toDo_footer.children.length !== 0)
        {
            if (isEmptyList) {
                this.removeToDoFooter();
                return;
            }

            countCompleted === 0 ? this.offClearCompletedButton() : this.onClearCompletedButton();
            this.toDo_footer.getElementsByTagName("span")[0].innerHTML = "Count of tasks: " + countActive
            return;
        }

        if (!isEmptyList) {
            this.addToDoFooter(countActive);
            return;
        }
    }

    addToDoFooter(count) {
        let span_div = document.createElement("div");
        let span = document.createElement("span");

        let list_filter_buttons = document.createElement("div");
        let radiobtn_all = RadioButton("todo_filter", "all", true);
        let radiobtn_completed = RadioButton("todo_filter", "completed");
        let radiobtn_active = RadioButton("todo_filter", "active");
        let label_all = LabelWith("All", radiobtn_all);
        let label_completed= LabelWith("Completed", radiobtn_completed);
        let label_active = LabelWith("Active", radiobtn_active);

        let btnClearCompleted_div = document.createElement("div");
        let btnClearCompleted = document.createElement("button");

        span.innerHTML = "Count of tasks: " + count;
        span_div.appendChild(span);

        radiobtn_all.addEventListener("click", this.onClickFilterButton);
        radiobtn_completed.addEventListener("click", this.onClickFilterButton);
        radiobtn_active.addEventListener("click", this.onClickFilterButton);

        list_filter_buttons.appendChild(label_all);
        list_filter_buttons.appendChild(label_completed);
        list_filter_buttons.appendChild(label_active);

        btnClearCompleted.id = ("clear_completed");
        btnClearCompleted.innerHTML = "Clear completed";
        btnClearCompleted.hidden = true;
        btnClearCompleted.addEventListener("click", this.onClickClearCompleted);
        btnClearCompleted_div.appendChild(btnClearCompleted);

        this.toDo_footer.appendChild(span_div);
        this.toDo_footer.appendChild(list_filter_buttons);
        this.toDo_footer.appendChild(btnClearCompleted);
    }

    removeToDoFooter() {
        let children = this.toDo_footer.children;
        Array.from(children).forEach((item) => {item.remove()});
    }

    toggleDeleteButton(id) {
        let li = document.getElementById(id);
        let button = li.getElementsByTagName("button")[0];
        button.hidden = !button.hidden;
    }

    onClearCompletedButton() {
        let button = document.getElementById("clear_completed");
        button.hidden = false;
    }

    offClearCompletedButton() {
        let button = document.getElementById("clear_completed");
        button.hidden = true;
    }

    // Insert input to ToDo
    addEditingInputToDo(id, changeToDo) {
        let input = document.createElement("input");
        let li = document.getElementById(id);
        let label = li.getElementsByTagName("label")[0];
        let clearInput = function () {
            this.isEditing = false;
            label.innerHTML = input.value;
            input.remove();
        }.bind(this);

        this.isEditing = true;

        input.value = label.innerHTML;
        label.innerHTML = "";
        input.addEventListener("change", event => {
            changeToDo(id, input.value);
            input.blur();
        })
        input.addEventListener("blur", (e) => {
            clearInput();
        })


        li.appendChild(input);
        input.focus();
    }

    bindAddToDo(handler) {
        this.toDo_input.addEventListener("change", event => {
            handler(this.toDo_input.value);
            this.toDo_input.value = "";
        });
    }

    bindRemoveToDo(handler) {
        this.onRemove = handler;
    }

    bindToggleToDo(handler) {
        this.onToggle = handler;
    }

    bindMouseoverTodo(handler) {
        this.onMouseoverTodo = handler;
    }

    bindMouseoutTodo(handler) {
        this.onMouseoutTodo = handler;
    }

    bindDbClickToDo(handler) {
        this.onDbClickTodo = handler;
    }

    bindClickFilterButton(handler) {
        this.onClickFilterButton = handler;
    }

    bindClickClearCompleted(handler) {
        this.onClickClearCompleted = handler;
    }
}