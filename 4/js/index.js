var lastDiv = 0;

function addNewTask()
{
    if (document.getElementById('task_input').value === "") {
        alert('Введите задание');
        return;
    }
    if (document.getElementById('task_date').value === "") {
        alert('Выберите дату');
        return;
    }
    if (document.getElementById('task_none') != null) {
        document.getElementById('all_tasks').removeChild(document.getElementById('task_none'));
    }

    var newDiv = document.createElement('div');
    newDiv.className = "task";
    newDiv.id = 'div'+lastDiv;
    document.getElementById('all_tasks').appendChild(newDiv);

    var taskLeft = document.createElement('div');
    taskLeft.className = "t_left";
    taskLeft.id = "t_left"+lastDiv;
    document.getElementById('div'+lastDiv).appendChild(taskLeft);

    var taskRight = document.createElement('div');
    taskRight.className = "t_right";
    taskRight.id = "t_right"+lastDiv;
    document.getElementById('div'+lastDiv).appendChild(taskRight);

    var taskDate = document.createElement('div');
    taskDate.className = "date";
    taskDate.innerText = document.getElementById('task_date').value;
    document.getElementById('task_date').value = "";
    document.getElementById('t_right'+lastDiv).appendChild(taskDate);

    var taskDelete = document.createElement('div');
    taskDelete.className = "task_del";
    document.getElementById('t_right'+lastDiv).appendChild(taskDelete);
    taskDelete.onclick = function () {
        var myNode = this.parentElement.parentElement;
        document.getElementById('all_tasks').removeChild(myNode);
        createNone();
    };

    var taskP = document.createElement('p');
    taskP.className = "t_left p";
    taskP.id = "t_left p"+lastDiv;
    document.getElementById('t_left'+lastDiv).appendChild(taskP);


    var taskTitle = document.createElement('div');
    taskTitle.className = "task_title";
    taskTitle.innerText = document.getElementById('task_input').value;
    document.getElementById('task_input').value = "";
    document.getElementById('t_left' + lastDiv).appendChild(taskTitle);

    var taskCheck = document.createElement('INPUT');
    taskCheck.type= "checkbox";
    taskCheck.id = "checkbox"+lastDiv;
    taskCheck.value = "false";
    document.getElementById('t_left p'+lastDiv).appendChild(taskCheck);
    taskCheck.onclick = function () {
        if (this.value === 'false'){
            document.getElementById(this.id).parentElement.parentElement.getElementsByClassName('task_title').item(0).className = "task_title_left";
            document.getElementById(this.id).value = 'true';
        } else {
            document.getElementById(this.id).parentElement.parentElement.getElementsByClassName('task_title_left').item(0).className = "task_title";
            document.getElementById(this.id).value = 'false';
        }
    };

    lastDiv+=1;

}

function  createNone() {
    if(document.getElementById('all_tasks').childElementCount === 0)
    {
        var newTaskNone = document.createElement('div');
        newTaskNone.className = 'task_none';
        newTaskNone.id = 'task_none';
        newTaskNone.innerText = "Список заданий пуст";
        document.getElementById('all_tasks').appendChild(newTaskNone);
    }
}

function deleteAllTask()
{
	var myNode = document.getElementById("all_tasks");
	var fc = myNode.firstChild;

	while( fc ) {
		myNode.removeChild( fc );
		fc = myNode.firstChild;
	}
	 createNone();

	lastDiv = 0;
}