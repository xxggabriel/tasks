
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

// const user_database = {};
// let user_id = false;
// (function () {

//     function init_user(userId) {
//         user_database.user_id = userId
//     }

//     function new_user(name, admin) {
//         const user_data = {
//             userName: name,
//             admin: admin,
//             createdat: firebase.database.ServerValue.TIMESTAMP,
//         }

//         if (!user_database.user_id) {
//             user_database.user_id = firebase.database().ref().child('users').push().key
//         }

//         let updates = {};
//         updates['/users/' + user_database.user_id] = user_data;

//         let user_ref = firebase.database().ref();
//         user_ref.update(updates)
//             .then(function () {
//                 return {
//                     success: true,
//                     message: 'Usuário criado.'
//                 };
//             })
//             .catch(function (error) {
//                 console.log(error.message);
//                 return {
//                     success: false,
//                     message: 'Erro ao criar usuário'
//                 }
//             });
//     }

//     function user() {
//         if (!user_database.user_id) return { success: false, message: 'Usuário inválido' }

//         let user_ref = firebase.database().ref('/users/' + user_database.user_id);

//         return user_ref.get().then((snapshot) => {
//             if (snapshot.exists()) {
//                 return snapshot.val()
//             } else {
//                 return { success: false, message: "Usuário não existe." }
//             }
//         }).catch((error) => {
//             if (!user_database.user_id) return { success: false, message: error.message }
//         });
//     }

//     function edit_user(user) {
//         if (!user_database.user_id) return { success: false, message: 'Usuário inválido' }

//         let user_ref = firebase.database().ref('/users/' + user_database.user_id);

//         user_ref.set(user)
//             .then(function () {
//                 return {
//                     success: true,
//                     message: 'Usuário atualizado.'
//                 };
//             })
//             .catch(function (error) {
//                 console.log(error.message);
//                 return {
//                     success: false,
//                     message: 'Erro ao atualizar o usuário'
//                 }
//         });
//     }

//     function remove_user() {
//         if (!user_database.user_id) return { success: false, message: 'Usuário inválido' }

//         let user_ref = firebase.database().ref('/users/' + user_database.user_id);
//         user_ref.remove()
//             .then(function () {
//                 return {
//                     success: true,
//                     message: 'Usuário excluido com sucesso.'
//                 };
//             })
//             .catch(function (error) {
//                 console.log(error.message);
//                 return {
//                     success: false,
//                     message: 'Erro ao criar usuário'
//                 }
//         });
//     }



//     user_database.user_id = user_id;
//     user_database.init = init_user;
//     user_database.new = new_user;
//     user_database.user = user;
//     user_database.edit = edit_user
//     user_database.remove = remove_user;
// })()

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

    function show_task(taskId, task) {
        if (!task) return { success: false, message: 'Usuário inválido' }

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

    function completed(taskId, status = true)
    {
        let task_ref = firebase.database().ref('/tasks/' + taskId);

        task_ref.update({completed: status})
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

$(function () {

    loadTasks()
})

let showTasks = true
function showTasksCompleted(){
    showTasks = !showTasks

    if(showTasks){
        $("#btn-show-task-completed").html("Mostrar concluídas")
    } else {
        $("#btn-show-task-completed").html("Mostrar não concluídas")
    }

    loadTasks()
}

function loadTasks(){
    console.log("loadTask");
    tasks = task_database.showAll()
    tasks.then((values) => {
        $("#tasks-list").html('')
        
        if(values.success==false){
            $("#tasks-list").html(`
                <p style="text-align: center;margin-top: 50px;"><b>Nenhuma tarefa criada</b></p>
            `)
        } else {
            Object.keys(values).forEach(key => {
                let task = values[key];
    
                

                if(task.completed == showTasks){
                    
                    return;
                }
    
                $("#tasks-list").prepend(`
                    <div class="tasks-card" id="task-item-${key}">
                        <div class="row">
                            <div class="col-md-10">
                                <div class="tasks-header">
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

                if(task.completed){
                    $(`#taks-done-${key}`).hide();
                    $(`#taks-edit-${key}`).hide();
                    $(`#taks-delete-${key}`).hide();
                }
            });
        }

    })
}

$("#createTaks").submit(function(e){
    e.prenvetDefault();
})

function doneTask(taskId){
    task_database.completed(taskId, true)
    $(`#task-item-${taskId}`).hide("slow");
    loadTasks()
}

function createTaks(){
    task = {
        userName: $("#task-username-input option:selected").val(),
        title: $("#task-title-input").val(),
        description: $("#task-description-input").val(),
        completed: false,
        createdat: firebase.database.ServerValue.TIMESTAMP,	
    }
    
    task_database.new(task);
    loadTasks()
}

function editTask(id, title, description, userName){
    $("#task-id-input").val(id)
    $("#task-title-input").val(title)
    $("#task-description-input").val(description)
    $("#task-username-input").val(userName).change();
    $("#btn-create").hide();
    $("#btn-edit").show();
    $("#exampleModalLabel").html("Atualizar tarefa")
}

function newTask(){
    $("#task-id-input").val("")
    $("#task-title-input").val("")
    $("#task-description-input").val("")
    $("#task-username-input").val("").change();
    $("#btn-create").show();
    $("#btn-edit").hide();
    $("#exampleModalLabel").html("Nova tarefa")
}

function updateTaks(){
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

function removeTask(key){
    task_database.remove(key)
    loadTasks()
}
