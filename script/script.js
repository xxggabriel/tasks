
(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyCNeaPbnMM41w3m7ddXQL1zW7fT0RkBOYE",
        authDomain: "task-thiago-01.firebaseapp.com",
        projectId: "task-thiago-01",
        storageBucket: "task-thiago-01.appspot.com",
        messagingSenderId: "156681751803",
        appId: "1:156681751803:web:32604eaa1f5822e3fbb45e",
        measurementId: "G-2T8GCZF7R6"
    };

    firebase.initializeApp(firebaseConfig);
})()

painelUserName = false

const task_database = {};
(function () {
    function new_task(task) {
        taskId = firebase.database().ref().child('tasks').push().key

        let updates = {};
        updates['/tasks/' + taskId] = task;

        let task_ref = firebase.database().ref();
        task_ref.update(updates)
            .then(function () {
                return {
                    success: true,
                    message: 'tarefa criado.'
                };
            })
            .catch(function (error) {
                console.log(error.message);
                return {
                    success: false,
                    message: 'Erro ao criar tarefa'
                }
            });
    }

    function show_task(taskId) {
        let task_ref = firebase.database().ref('/tasks/' + taskId);

        return task_ref.get().then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                return { success: false, message: "Usuário não existe." }
            }
        }).catch((error) => {
            return { success: false, message: error.message }
        });
    }

    function show_all_task() {
        let task_ref = firebase.database().ref('/tasks');

        // if(painelUserName){
        //     console.log("AQUI", painelUserName);
        //     task_ref = task_ref.equalTo(painelUserName, "userName")
        // }

        return task_ref.get().then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                return { success: false, message: "Usuário não existe." }
            }
        }).catch((error) => {
            return { success: false, message: error.message }
        });
    }

    function completed(taskId, timesFinished = 1,status = true) {
        let task_ref = firebase.database().ref('/tasks/' + taskId);

        task_ref.update({ completed: status, timesFinished })
            .then(function () {
                return {
                    success: true,
                    message: 'Usuário atualizado.'
                };
            })
            .catch(function (error) {
                console.log(error.message);
                return {
                    success: false,
                    message: 'Erro ao atualizar o usuário'
                }
            });
    }

    function edit_task(taskId, task) {

        let task_ref = firebase.database().ref('/tasks/' + taskId);

        task_ref.set(task)
            .then(function () {
                return {
                    success: true,
                    message: 'Usuário atualizado.'
                };
            })
            .catch(function (error) {
                console.log(error.message);
                return {
                    success: false,
                    message: 'Erro ao atualizar o usuário'
                }
            });
    }

    function remove_task(taskId) {
        let task_ref = firebase.database().ref('/tasks/' + taskId);
        task_ref.remove()
            .then(function () {
                return {
                    success: true,
                    message: 'Usuário excluido com sucesso.'
                };
            })
            .catch(function (error) {
                console.log(error.message);
                return {
                    success: false,
                    message: 'Erro ao criar usuário'
                }
            });
    }

    task_database.new = new_task
    task_database.show = show_task
    task_database.showAll = show_all_task
    task_database.completed = completed
    task_database.edit = edit_task
    task_database.remove = remove_task

})()
totalTasks = 0
$(function () {
    loadTasks()
})

function showTasksPainel(){

    painelUserName = $("#painel-task option:selected").val() == "" ? false : $("#painel-task option:selected").val()
    console.log(painelUserName);
    loadTasks()
}


function loadTasks() {
    totalTasks = 0
    tasks = task_database.showAll()
    tasks.then((values) => {
        console.log(values);
        $("#tasks-list").html('')

        if (values.success == false) {
            $("#tasks-list").html(`
                <p style="text-align: center;margin-top: 50px;"><b>Nenhuma tarefa criada</b></p>
            `)
        } else {
            Object.keys(values).sort(function (a, b) {
                return values[a].createdat > values[b].createdat;
            }).forEach(key => {
                totalTasks += 1;
                let task = values[key];

                if(painelUserName &&  painelUserName != task.userName){
                    return;
                }

                if (!task.completed) {
                    $("#tasks-list").prepend(`
                    <div class="tasks-card ${task.completed ? 'task-completed' : ''}" id="task-item-${key}">
                        <div class="row">
                            <div class="col-md-10">
                                <div class="tasks-header">
                                    <h4 class="tasks-number">Nº ${task.number ?? 'sem número'}</h4>
                                    <h1 class="tasks-title">${task.title}</h1>
                                </div>
                                <div class="tasks-body">
                                    <p class="task-description">
                                        ${task.description}
                                    </p>
                                </div>
                                <div class="tasks-footer">
                                    <b class="responsible-name">${task.userName}</b>
                                </div>
                            </div>
    
                            <div class="col-md-2 d-flex align-items-center">
                                <button class="btn btn-primary"  id="taks-done-${key}" style="margin-right: 10px;" onclick="doneTask('${key}');">
                                    <span class="material-icons">done</span>
                                </button>
    
                                <button class="btn btn-success" id="taks-edit-${key}" style="margin-right: 10px;" onclick="editTask('${key}', '${task.title}', '${task.description}', '${task.userName}');" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <span class="material-icons">edit</span>
                                </button>
    
                                <button class="btn btn-danger" id="taks-delete-${key}" onclick="removeTask('${key}');">
                                    <span class="material-icons">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `)
                } else {
                    $("#tasks-list").append(`
                    <div class="tasks-card ${task.completed ? 'task-completed' : ''}" id="task-item-${key}">
                        <div class="row">
                            <div class="col-md-10">
                                <div class="tasks-header">
                                    <h4 class="tasks-number">Nº ${task.number ?? 'sem número'}</h4>
                                    <h1 class="tasks-title">${task.title}</h1>
                                </div>
                                <div class="tasks-body">
                                    <p class="task-description">
                                        ${task.description}
                                    </p>
                                </div>
                                <div class="tasks-footer">
                                    <b class="responsible-name">${task.userName}</b>
                                </div>
                            </div>
    
                            <div class="col-md-2 d-flex align-items-center">
                                <button class="btn btn-primary"  id="taks-done-${key}" style="margin-right: 10px;" onclick="doneTask('${key}');">
                                    <span class="material-icons">done</span>
                                </button>
    
                                <button class="btn btn-success" id="taks-edit-${key}" style="margin-right: 10px;" onclick="editTask('${key}', '${task.title}', '${task.description}', '${task.userName}');" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <span class="material-icons">edit</span>
                                </button>
    
                                <button class="btn btn-danger" id="taks-delete-${key}" onclick="removeTask('${key}');">
                                    <span class="material-icons">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `)
                }



                if (task.completed) {
                    if(task.timesFinished > 2){
                        $(`#taks-done-${key}`).hide();
                        $(`#taks-edit-${key}`).hide();
                    } else {
                        $(`#taks-done-${key}`).show();
                        $(`#taks-edit-${key}`).show();
                    }
                }
            });
        }

    })
}

$("#createTaks").submit(function (e) {
    e.prenvetDefault();
})

function getTask(taskId){
    return task_database.show(taskId)
}

function doneTask(taskId) {
    getTask(taskId).then((task) => {
        if(task.completed){
            task_database.completed(taskId, task.timesFinished, false)
        } else {
            task_database.completed(taskId, task.timesFinished += 1,true)
            $(`#task-item-${taskId}`).hide("slow");
        }
        
        loadTasks()
    })
}

function createTaks() {

    tasks = task_database.showAll()
    tasks.then((values) => {

        task = {
            number: totalTasks + 1,
            userName: $("#task-username-input option:selected").val(),
            title: $("#task-title-input").val(),
            description: $("#task-description-input").val(),
            completed: false,
            timesFinished: 0,
            createdat: firebase.database.ServerValue.TIMESTAMP,
        }

        task_database.new(task);
        loadTasks()
    })


}

function editTask(id, title, description, userName) {
    $("#task-id-input").val(id)
    $("#task-title-input").val(title)
    $("#task-description-input").val(description)
    $("#task-username-input").val(userName).change();
    $("#btn-create").hide();
    $("#btn-edit").show();
    $("#exampleModalLabel").html("Atualizar tarefa")
}

function newTask() {
    $("#task-id-input").val("")
    $("#task-title-input").val("")
    $("#task-description-input").val("")
    $("#task-username-input").val("").change();
    $("#btn-create").show();
    $("#btn-edit").hide();
    $("#exampleModalLabel").html("Nova tarefa")
}

function updateTaks() {
    task = {
        userName: $("#task-username-input option:selected").val(),
        title: $("#task-title-input").val(),
        description: $("#task-description-input").val(),
        completed: false,
        createdat: firebase.database.ServerValue.TIMESTAMP,
    }
    task_database.edit($("#task-id-input").val(), task)
    loadTasks()
}

function removeTask(key) {
    if (confirm("Você realmente quer excluir essa tarefa?")) {
        task_database.remove(key)
        $(`#task-item-${key}`).hide("slow");
        loadTasks()
    }
}
