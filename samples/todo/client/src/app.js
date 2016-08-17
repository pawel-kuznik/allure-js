import { View, Router } from '../../../../lib/allure'

class AddTodo extends View {

    constructor (data) {
        super(data);
    }

    initialize() {
        this.$el = document.createElement('SECTION'); 
    }

    render() {

        var header = document.createElement('HEADER');

        this.$el.append(header);
    }
}

class List extends View {

    constructor (data) {
        super(data);
    }

    initialize() {
        this.$el = document.createElement('SECTION');
    }

    render() {

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


    var router = new Router();

    router.init();

    var current;

    router.append('/list', function () {

        if (current) current.destroy();

        current = new List();

        console.log(document.querySelector('.content'));

        document.querySelector('.content').appendChild(current.$el);

    });

    router.append('/add', function () {

        if (current) current.destroy();

        current = new AddTodo();

        document.querySelector('.content').appendChild(current.$el);
    });

});

