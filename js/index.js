document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById("forward")
    const prevBtn = document.getElementById("back")
    const monsterContainer = document.getElementById("monster-container")
    let pageCounter = 1

    nextBtn.addEventListener("click", nextPage)
    prevBtn.addEventListener("click", prevPage)

    function getMonsters(page) {
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(res => res.json())
            .then(data => {
                monsterContainer.innerHTML = ''
                createForm()
                data.forEach(element => {
                    createMonsterDom(element)
                });
            })
    }

    function nextPage() {
        pageCounter++
        getMonsters(pageCounter)
    }

    function prevPage() {
        if (pageCounter > 1) {
            pageCounter--;
            getMonsters(pageCounter)
        }
    }

    function createMonsterDom(data) {
        let card = document.createElement("div");
        card.setAttribute("class", "monster-card")
        let template = `
            <h3>${data.name}</h3>
            <p>${data.age} years old</p>
            <p>${data.description}</p>
        `
        card.innerHTML = template
        monsterContainer.append(card)
    }

    function createForm() {
        let form = document.createElement("form")
        let fields = `
            <input type="text" id="name" name="name" placeholder="Monster Name">
            <input type="text" id="age" name="age" placeholder="Monster Age">
            <input type="text" id="description" name="description" placeholder="Monster Description">
            <input type="submit" id="submit">
        `
        form.innerHTML = fields
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let inputData = {
                name: e.target.name.value,
                age: e.target.age.value,
                description: e.target.description.value
            }
            postFormData(inputData)
        })
        monsterContainer.append(form)
    }

    function postFormData(data) {
        fetch("http://localhost:3000/monsters", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => result)
    }

    getMonsters()
})