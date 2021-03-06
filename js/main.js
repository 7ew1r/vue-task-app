(function () {
  'use strict';
  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      newTag: '',
      todos: []
    },
    watch: {
      todos: {
        handler: function () {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function () {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function () {
        var item = {
          title: this.newItem,
          tag: this.newTag,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
        this.newTag = '';
      },
      deleteItem: function (index) {
        if (confirm('削除しますか?')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function (index) {
        if (!confirm('完了済タスクを削除します')) {
          return;
        }
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining: function () {
        return this.todos.filter(function (todo) {
          return !todo.isDone;
        });
      },
      tagList: function () {
        var tags = [];
        for (var todo in this.todos) {
          tags.push(this.todos[todo].tag)
        }
        return tags.filter(function (x, i, self) {
          return self.indexOf(x) === i;
        });
      }
    }
  });
})();