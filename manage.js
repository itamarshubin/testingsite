const theTable = document.querySelector('table');

function renderData(doc,count){
let tr = document.createElement('tr');
let trInv = document.createElement('tr');
let email = document.createElement('td');
let location = document.createElement('td');
let message = document.createElement('td');
let name = document.createElement('td');
let phoneNumber = document.createElement('td');
let status = document.createElement('td');

tr.setAttribute('onclick',"showHideRow('hidden_row"+count+"');");
tr.setAttribute('id',doc.id);
trInv.setAttribute('id','hidden_row'+count+'');
trInv.setAttribute('class','hidden_row');

email.innerHTML=doc.data().email;
location.innerHTML=doc.data().location;
name.innerHTML=doc.data().name;
phoneNumber.innerHTML=doc.data().phoneNumber;
message.innerHTML=doc.data().message;
doc.data().status
status.innerHTML=`
<select name="status" class="status" id="status-select`+count+`">
<option value="לא התקבל">לא התקבל</option>
<option value="התקבל">התקבל</option>
<option value="בטיפול">בטיפול</option>
<option value="הועבר לגורמים הרלוונטים">הועבר לגורמים הרלוונטים</option>
<option value="הסתיים">הסתיים</option>

</select>
`


tr.appendChild(email);
tr.appendChild(location);
tr.appendChild(name);
tr.appendChild(phoneNumber);
tr.appendChild(status);


message.setAttribute('colspan',5)
trInv.appendChild(message)

theTable.appendChild(tr);
theTable.appendChild(trInv);


document.getElementById("status-select"+count).value = doc.data().status;


}
let keyArr = [];
let statusArr = [];
db.collection('Data').get().then(snapshot => {
    var count = 1;
    
    snapshot.docs.forEach(doc => {
        keyArr.push(doc.id);
        renderData(doc,count);
        count++;
    });
});




function updateStatus(){


var table,rows,x;
table=document.getElementById("table_detail");
rows= table.rows;

for (let  i = 0;  i <(rows.length-1);  i++) {
    sel = document.getElementsByClassName("status")[i];
    x  = sel?.options[sel.selectedIndex].text;
    if(x) { 
        statusArr.push(x);
    }
}
console.log(statusArr);


for (let i = 0; i < statusArr.length; i++) {
    db.collection('Data').doc(keyArr[i]).update({
        status:statusArr[i]
    });
    
}
alert("work.");
}

