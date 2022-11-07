function attachEvents() {
  document.getElementById("refresh").addEventListener("click", displayData)
  document.getElementById("submit").addEventListener("click", createMsg)

  function showRefreshedData(data){
   const textArea = document.getElementById("messages");
   const content =  Object.values(data).map(entry =>`${entry.author}: ${entry.content}`).join("\n")
   textArea.textContent = content;
   
   
  }
  function createMsg(){
    const author = document.querySelector("input[name='author']");
    const content = document.querySelector("input[name='content']");
    const body = {
        author: author.value,
        content: content.value
    }
    author.value = "";
    content.value = "";
    postData(body);
    
  }

    async function displayData(){

         const url = "http://localhost:3030/jsonstore/messenger";
         const response = await fetch(url);
         const data = await response.json();

         return showRefreshedData(data);

    }

    async function postData(body){
        const url = "http://localhost:3030/jsonstore/messenger"
        const response = await fetch(url,{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        const data = await response.json()
        displayData()
    }
}

attachEvents();