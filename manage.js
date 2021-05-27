const theTable = document.querySelector('#table_detail');

function renderData(doc,count){
let tr = document.createElement('tr');
let trInv = document.createElement('tr');
let email = document.createElement('td');
let location = document.createElement('td');
let message = document.createElement('td');
let name = document.createElement('td');
let phoneNumber = document.createElement('td');


tr.setAttribute('onclick',"showHideRow('hidden_row"+count+"');");
trInv.setAttribute('id','hidden_row'+count+'');
trInv.setAttribute('class','hidden_row');

email.innerHTML=doc.data().email;
location.innerHTML=doc.data().location;
name.innerHTML=doc.data().name;
phoneNumber.innerHTML=doc.data().phoneNumber;
message.innerHTML=doc.data().message;

tr.appendChild(email);
tr.appendChild(location);
tr.appendChild(name);
tr.appendChild(phoneNumber);


message.setAttribute('colspan',4)
trInv.appendChild(message)

theTable.appendChild(tr);
theTable.appendChild(trInv);

}

db.collection('Data').get().then(snapshot => {
    var count = 1;
    snapshot.docs.forEach(doc => {
        renderData(doc,count);
        count++;
    });
});
