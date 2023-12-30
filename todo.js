let count = 1;
let actualcount=1;
let limit=15;
let completedTask=0;
let ar = new Array(count).fill(0);
let statusarray = new Array(0);
function addlist() {
    if(actualcount<=limit)
    {

        /*addlist function, you are updating the entire HTML content of
        the listbox element with the new card, and this results in the
        removal of the existing input and textarea elements along with
        their values.To solve this issue, you can modify the addlist
        function to preserve the existing HTML content of the listbox
        element and append the new card to it.*/
            let newcard = document.createElement("div");
            newcard.className = "card";
            newcard.id = "card" + count;
            newcard.style.width = "271px";
            newcard.style.height = "250px";
            newcard.innerHTML = `<div class="card-body">
                  <h5 class="card-title"><input type="text" placeholder="Enter Task" class="listtitle" id="listtitle${count}" onkeypress="storeTaskTitle(event,'listtitle${count}')"></h5>
        
        
                  <p class="card-text"><textarea name="" class="listDescription" id="listDescription${count}" onkeypress="storeTaskDescription(event,'listDescription${count}')" cols="30" rows="3" placeholder="Task Description"></textarea></p>
        
                  <p id="status${count}">Status : ongoing</p>
        
                  <a href="#" class="btn btn-primary" onclick="taskcomplete('card${count}')">Task Complete</a>
        
                  <a href="#" class="btn btn-primary" onclick="removetask('card${count}')">remove</a>
                </div>`;
            document.getElementById("listbox").appendChild(newcard);
            ar[count] = 1;
            localStorage.setItem("ar", ar);
            count++;
            actualcount++;
            localStorage.setItem("actualcount",actualcount);
            document.getElementById("addcontentimg").style.backgroundColor="white";
            progressTask();
    }
    else
    {
        document.getElementById("addcontentimg").style.backgroundColor="rgba(255, 113, 36, 0.4)";
    }
}
function taskcomplete(id) {
    let ar = Array.from(document.getElementById(id).firstElementChild.childNodes);
    document.getElementById(ar[5].id).innerHTML = "Status : completed";
    document.getElementById(id).style.backgroundColor = "rgba(144, 245, 39, 0.25)";
    statusarray.push(onlyNumber(id));
    localStorage.setItem("statusarray",statusarray);
    completedTask++;
    localStorage.setItem("completedTask",completedTask);
    progressTask();
}
function removetask(id) 
{
    ar = Array.from(localStorage.getItem("ar"));
    ar = ar.filter((value) => {
        if (value != ',')
        return value;
    });

    //completed task progress
    if(Array.from(document.getElementById(id).firstElementChild.childNodes)[5].textContent=="Status : completed")
    {
        completedTask=localStorage.getItem("completedTask");
        completedTask--;
        localStorage.setItem("completedTask",completedTask);
    }
    //completed task progress end

    localStorage.removeItem(document.getElementById(id).firstElementChild.firstElementChild.firstElementChild.id);
    localStorage.removeItem(document.getElementById(id).firstElementChild.firstElementChild.nextElementSibling.firstElementChild.id);
    let index=onlyNumber(id);
    ar[index] = 0;
    localStorage.setItem("ar", ar);
    statusarray=deleteElement(statusarray,index);
    localStorage.setItem("statusarray", statusarray);
    document.getElementById(id).remove();
    if (checkEmpty() == 1) {
        count = 1;
        ar = new Array(count).fill(0);
        localStorage.setItem("ar", ar);
        statusarray = new Array(0);
        localStorage.setItem("statusarray", statusarray);
    }
    actualcount--;
    localStorage.setItem("actualcount",actualcount);
    if(actualcount<=limit)
    {
        document.getElementById("addcontentimg").style.backgroundColor="white";
    }
    progressTask();
}
function checkEmpty() {
    if (document.getElementById("listbox").firstElementChild.nextElementSibling) {
        return 0;
    }
    else {
        return 1;
    }
}
// storing the task in local storage
function storeTaskTitle(event, title) {
    if (event.key == "Enter") {
        let inputvalue = document.getElementById(title).value;
        localStorage.setItem(title, inputvalue);//i have set key name same as title.
    }
}
function storeTaskDescription(event, description) {
    if (event.key == "Enter") {
        let inputvalue = document.getElementById(description).value;
        localStorage.setItem(description, inputvalue);
    }
}
window.onload = function () {
    restoreData();
};

function restoreData() 
{
    if(!localStorage.getItem("ar"))
    {
        return;
    }
    ar = Array.from(localStorage.getItem("ar"));
    ar = ar.filter((value) => {
        if (value != ',')
            return value;
    });
    let i = 1;
    //restoring cards
    for (; i < ar.length; i++) 
    {
        if (ar[i]=='1') 
        {
            let newcard = document.createElement("div");
            newcard.className = "card";
            newcard.id = "card" + i;
            newcard.style.width = "271px";
            newcard.style.height = "250px";
            newcard.innerHTML = `<div class="card-body">
              <h5 class="card-title"><input type="text" placeholder="Enter Task" class="listtitle" id="listtitle${i}" onkeypress="storeTaskTitle(event,'listtitle${i}')"></h5>
    
    
              <p class="card-text"><textarea name="" class="listDescription" id="listDescription${i}" onkeypress="storeTaskDescription(event,'listDescription${i}')" cols="30" rows="3" placeholder="Task Description"></textarea></p>
    
              <p id="status${i}">Status : ongoing</p>
    
              <a href="#" class="btn btn-primary" onclick="taskcomplete('card${i}')">Task Complete</a>
    
              <a href="#" class="btn btn-primary" onclick="removetask('card${i}')">remove</a>
            </div>`;
            document.getElementById("listbox").appendChild(newcard);
        }
    }
    //restoring contents
    i=1;
    let actualcount1=1;
    for (; i < ar.length; i++) 
    {
        if (ar[i]=='1') 
        {
            document.getElementById(`listtitle${i}`).value=localStorage.getItem(`listtitle${i}`);
            document.getElementById(`listDescription${i}`).value=localStorage.getItem(`listDescription${i}`);
            actualcount1++;
        }
    }
    count=i;
    actualcount=actualcount1;
    localStorage.setItem("actualcount",actualcount);

    //restoring status
    if(!localStorage.getItem("statusarray"))
    {
        return;
    }
    statusarray = localStorage.getItem("statusarray");
    statusarray = stringToArray(statusarray);
    for(let i=0;i<statusarray.length;i++)
    {
        let ar = Array.from(document.getElementById(`card${statusarray[i]}`).firstElementChild.childNodes);
        document.getElementById(ar[5].id).innerHTML = "Status : completed"
        document.getElementById(`card${statusarray[i]}`).style.backgroundColor="rgba(144, 245, 39, 0.25)";
    }
}
//function to get number present in the string.
function onlyNumber(s)
{
    let result="";
    for(let i=s.length-1;i>=0;i--)
    {
        if(!isNaN(s[i]))
        {
            result=s[i]+result;
        }
        else
        {
            break;
        }
    }
    return result;
}
function deleteElement(ar,ele)
{
    for(let i=0;i<ar.length;i++)
    {
        if(ar[i]==ele)
        {
            delete ar[i];
        }
    }
    ar = ar.filter((value) => {
        if (value != null)
        return value;
    });
    return ar;
}
//function to convert string to array
function stringToArray(s)
{
    let ele="";
    let ar=new Array(0);
    for(let i=0;i<s.length;i++)
    {
        if(s[i]!=",")
        {
            // console.log(s[i]);
            ele+=s[i];
        }
        else
        {
            ar.push(ele);
            ele="";
        }
    }
    ar.push(ele);
    return ar;
}


//progress chart
function progressTask()
{
    let bar1=document.getElementById("bar1");
    let bar2=document.getElementById("bar2");
    let bar3=document.getElementById("bar3");
    let bar4=document.getElementById("bar4");


    completedTask=localStorage.getItem("completedTask");
    let totalTask=localStorage.getItem("actualcount")-1;
    let removedTask=(stringToArray(localStorage.getItem("ar"))).length-1;
    removedTask=removedTask-totalTask;
    if(completedTask!='0')
    {
        document.getElementById("completedcount").innerHTML=completedTask;
        let percentage=parseInt((completedTask/totalTask)*100);
        bar1.firstElementChild.style=`width: ${percentage}%`;
        bar1.firstElementChild.innerHTML=percentage+"%";
    }
    else
    {
        document.getElementById("completedcount").innerHTML=0;
        bar1.firstElementChild.style=`width: 0%`;
        bar1.firstElementChild.innerHTML="0%";
    }
    document.getElementById("totalcount").innerHTML=totalTask;
    let p=parseInt((totalTask/15)*100);
    bar2.firstElementChild.style=`width: ${p}%`;
    bar2.firstElementChild.innerHTML=totalTask+" / 15";

    console.log(removedTask)
    if(removedTask)
    {
        document.getElementById("removedcount").innerHTML=removedTask;
        let rp=parseInt(removedTask);
        bar3.firstElementChild.style=`width: ${rp}%`;
        bar3.firstElementChild.innerHTML=`${rp}`;
    }   
    else
    {
        document.getElementById("removedcount").innerHTML=0;
        bar3.firstElementChild.style=`width: 0%`;
        bar3.firstElementChild.innerHTML=`0%`;
    }   

    if(completedTask!='0')
    {
        let eff=parseInt(completedTask/(totalTask+removedTask)*100);
        bar4.firstElementChild.style=`width: ${eff}%`;
        bar4.firstElementChild.innerHTML=`${eff}%`;
    }
    else
    {
        bar4.firstElementChild.style=`width: 0%`;
        bar4.firstElementChild.innerHTML=`0%`;
    }
}
progressTask();

//reset function
function resetAll()
{
    //removing cards

    ar=localStorage.getItem("ar");
    if(ar)
    {
        ar=stringToArray(ar);
        for(let i=1;i<ar.length;i++)
        {
            if(ar[i]=='1'&& document.getElementById(`card${i}`))
            {
                document.getElementById(`card${i}`).remove();
            }
        }
    }

    //removing title and description
    for (let i=1; i < ar.length; i++) 
    {
        if (ar[i]=='1') 
        {
            localStorage.removeItem(`listtitle${i}`);
            localStorage.removeItem(`listDescription${i}`);
        }
    }
    //removing title and description end

    count = 1;
    actualcount=1;
    localStorage.setItem("actualcount",actualcount);
    ar = new Array(count).fill(0);
    localStorage.setItem("ar",ar);
    statusarray = new Array(0);
    localStorage.setItem("statusarray",statusarray);
    completedTask=0;
    localStorage.setItem("completedTask",completedTask);
    document.getElementById("addcontentimg").style.backgroundColor="white";
    progressTask();
}