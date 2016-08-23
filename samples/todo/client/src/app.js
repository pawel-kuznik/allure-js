import { View, Router, Collection, Model } from '../../../../lib/allure'

class Todo extends Model {

}

var todos = new Collection(Todo);

class AddTodo extends View {

    constructor (data) {
        super(data);
    }

    initialize() {
        this.$el = document.createElement('SECTION');
        this.$el.className = 'add-todo';
    }

    render() {


        var form = document.createElement('FORM');

        this.$el.appendChild(form);

        var textarea = document.createElement('TEXTAREA');
        textarea.placeholder = "Type your todo here...";

        form.appendChild(textarea);

        var button = document.createElement('BUTTON');

        button.textContent = 'Add new';

        form.appendChild(button);

        form.addEventListener('submit', function (event) {

            event.preventDefault();

            todos.append(new Todo({ 
                content: textarea.value
            }));

            this.trigger('todo-added');

            window.location.hash = '/list';
        }.bind(this));
    }
}

class List extends View {

    constructor (data) {
        super(data);
    }

    initialize() {
        this.$el = document.createElement('SECTION');
        this.$el.className = 'list-wrapper';
    }

    render() {
        var list = document.createElement('DIV');
        list.className = 'list';
        
        this.$el.appendChild(list);

        todos.each(function(todo) {

            var todoView = new TodoView({ model: todo });

            todoView.initialize();

            list.appendChild(todoView.$el);

            todoView.render();

            todoView.on('remove', function () {
                this.trigger('todo-removed');
            }.bind(this));

        }.bind(this));
    }
}

class TodoView extends View {

    initialize() {
        this.$el = document.createElement('DIV');
        this.$el.className = 'todo';
    }

    render() {

        var content = document.createElement('DIV');

        content.textContent = this.model.data.content;

        this.$el.appendChild(content);

        var remove = document.createElement('SPAN');
        remove.className = 'done'; 

        remove.textContent = 'Done';

        content.appendChild(remove);

        remove.addEventListener('click', function () {

            todos.remove(this.model);

            this.destroy();
        }.bind(this));
    }
}

window.addEventListener('load', function () {

    var header = document.createElement('HEADER');
    document.querySelector('body').appendChild(header);

    var link1 = document.createElement('A');
    link1.href = '#/list';
    link1.textContent = 'List';
    header.appendChild(link1);

    var link2 = document.createElement('A');
    link2.href = '#/add';
    link2.textContent = 'Add';
    header.appendChild(link2);

    var content = document.createElement('SECTION');
    content.className = 'content';
    document.querySelector('body').appendChild(content);

    var counter = document.createElement('SPAN');
    header.appendChild(counter);


    var router = new Router();

    router.init();

    var current;

    router.append('/list', function () {

        if (current) current.destroy();

        current = new List();

        current.initialize();

        document.querySelector('.content').appendChild(current.$el);

        current.render();

        current.on('todo-removed', function () {

            counter.textContent = parseInt(counter.textContent) - 1;
        });
    });

    router.append('/add', function () {

        if (current) current.destroy();

        current = new AddTodo();

        current.initialize();

        document.querySelector('.content').appendChild(current.$el);

        current.render();

        current.on('todo-added', function () {

            counter.textContent = parseInt(counter.textContent) + 1;
        });
    });
});

