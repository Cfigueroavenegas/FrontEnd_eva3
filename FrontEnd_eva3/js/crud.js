var selectedRow = null

function onFormSubmit(){
    if(validate()){
        var formData = readFormData();
        if(selectedRow == null){
            insertNewRecord(formData);
        }else{
            updateRecord(formData);
            resetForm();
        };
    };
};


function readFormData() {
    var formData = {};
    formData["nombreProducto"]=document.getElementById("nombreProducto").value;
    formData["numeroProducto"]=document.getElementById("numeroProducto").value;
    formData["precio"]=document.getElementById("precio").value;
    formData["stock"]=document.getElementById("stock").value;
    return formData;
    
};

function insertNewRecord(data){
    var table = document.getElementById("productoList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length)
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.nombreProducto;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.numeroProducto;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.precio;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.stock;

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick="onEdit(this)">Editar</a><a onClick="onDelete(this)">Eliminar</a>`;

};

function resetForm(){
    document.getElementById("nombreProducto").value = "";
    document.getElementById("numeroProducto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    selectedRow = null;
};  

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nombreProducto").value = selectedRow.cells[0].innerHTML;
    document.getElementById("numeroProducto").value = selectedRow.cells[1].innerHTML;
    document.getElementById("precio").value = selectedRow.cells[2].innerHTML;
    document.getElementById("stock").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nombreProducto;
    selectedRow.cells[1].innerHTML = formData.numeroProducto;
    selectedRow.cells[2].innerHTML = formData.precio;
    selectedRow.cells[3].innerHTML = formData.stock;
};

function onDelete(td) {
    if(confirm('Estas seguro de eliminar este registro ?')){
        row = td.parentElement.parentElement;
        document.getElementById("productoList").deleteRow(row.rowIndex);
        resetForm();
    }
};

function validate(){
    isValid = true;
    if(document.getElementById("nombreProducto").value ==""){
        isValid = false;
        document.getElementById("nombreCompletoValidationError").classList.remove("hide")
    }else{
        isValid = true;
        if(!document.getElementById("nombreCompletoValidationError").classList.contains("hide"))
            document.getElementById("nombreCompletoValidationError").classList.add("hide")
    }
    return isValid
};