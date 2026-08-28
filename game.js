/* first object - training */
const characterState = {
    name: "Roderick",
    age: 0,
    stats: {
        physique: 0,
        sagesse: 0,
        intuition: 0,
    },
    flags: {

    },
    history: []
}

const firstEvent = {
    id: "naissance",
    title: "Naissance",
    age: 0,
    timeProgression: 1,
    location: {
        name: "Nom de lieu Test",
        image: "https://img.magnific.com/premium-vector/vector-black-white-image-medieval-knight-armor_983400-1778.jpg?semt=ais_hybrid&w=740&q=80",
        imageAlt: "Un chevalier tenant son épée"
    },
    text: [{
        content : "Vos yeux s'ouvrent pour la première fois. Une douleur empli votre cage thoracique, comme une brûlure insidieuse. Vous remarquez à vos cotés deux silhouettes imposantes."
    }, 
    {
        content : "L'une d'entre elle vous tient dans ses bras, d'un air protecteur. Vous ne pouvez pas encore distinguer clairement les éléments distinct, vos yeux ne s'étant pas encore parfaitement adapté. Pourtant, votre instinct vous indique qu'un sourire orne son visage. L'autre silhouette, plus austère, vous fixe de son regard. Vous n'êtes pas réellement certains de ses attentions, mais dans votre esprit, ces deux silhouettes sont vos géniteurs."
    }, 
    {
        content :"Vous exhaler enfin votre première bouffée d'oxygène, et la sensation de brûlure s'accentue d'autant plus... Vous..."
    }],
    choices: [
        {
        text: "La douleur est insoutenable, vous pleurez",
        effects: {
            stats: {
                sagesse: 1
            }
        }
    },
    {
        text: "Vous vous blotissez dans les bras protecteurs de votre mère avant d'éclater en sanglots",
        effects: {
            stats: {
                intuition: 1
            }
        }
    },
    {
        text: "La douleur vous assaille, pourtant vous semblez vous en réjouir...",
        effects: {
            stats: {
                physique: 1
            },
            flags: {
                surnom: "Solide petit Gaillard"
            },
            history: {
                id: "title_solide_petit_gaillard",
                title: "Solide Petit Gaillard",
                desc: "Avant même votre premier cri, vous montriez une résilience rare."
            }
        }
    }
]
}

/* ---- Game Elements ----*/
const characterName = document.getElementById("name")
const characterAge = document.getElementById("age")

const locationName = document.getElementById("location-name")
const locationImg = document.getElementById("location-image")

const eventTitle = document.getElementById("event-title")
const eventText = document.getElementById("narrative")
const eventOptions = document.getElementById("options")

const characterPhysique = document.getElementById("physique")
const characterSagesse = document.getElementById("sagesse")
const characterIntuition = document.getElementById("intuition")

/* ---- Game Functions ---- */

const displayEvent = (character, event) => {

    locationName.textContent = event.location.name
    locationImg.src = event.location.image
    locationImg.alt = event.location.imageAlt

    eventTitle.textContent = event.title

    eventText.replaceChildren()

    for(let i = 0; i < event.text.length; i++) {
        const paragraph = document.createElement("p")
        paragraph.textContent = event.text[i].content
        eventText.appendChild(paragraph)
    }

    eventOptions.replaceChildren()

    for(let i = 0; i < event.choices.length; i++) {
        const button = document.createElement("button")
        button.textContent = event.choices[i].text
        button.addEventListener("click", (e) => {
            e.preventDefault()

            const optionChosen = event.choices[i]

            applyEffects(character, optionChosen.effects, event)
            updateTime(character, optionChosen, event)
            updateInfoDisplay(character)
            updateYourStory(character, optionChosen.effects)
            for(let i = 0; i < eventOptions.children.length; i++){
                eventOptions.children[i].disabled = true
            }
        })
        eventOptions.appendChild(button)
    }

    updateInfoDisplay(character)
}

const applyEffects = (character, effects) => {

    const statsEvent = effects.stats

    if(statsEvent !== undefined) {
        for(const [key, value] of Object.entries(statsEvent)) {
            const nameStatToAdd = key
            const valueStatToAdd = value
    
            character.stats[nameStatToAdd] += valueStatToAdd
        }
    
    }
  
}

const updateTime = (character, choice, option) => {
    
    if(choice.timeProgression !== undefined && choice.timeProgression !== null) {
        character.age += choice.timeProgression
        console.log(choice.timeProgression)
        
    } else if(option.timeProgression !== undefined && option.timeProgression !== null) {
        character.age += option.timeProgression
        console.log(option.timeProgression)
        
    }
    
}

const updateStatsDisplay = (character) => {
    characterPhysique.textContent = character.stats.physique
    characterSagesse.textContent = character.stats.sagesse
    characterIntuition.textContent = character.stats.intuition
}

const updateCharacterDisplay = (character) => {
    characterName.textContent = character.name

    characterAge.textContent = character.age > 1 ? `${character.age} ans` : `${character.age} an`
}

const updateInfoDisplay = (character) => {
    updateStatsDisplay(character)
    updateCharacterDisplay(character)
}

const updateYourStory = (character, option) => {
    if(option.history !== undefined){
        character.history.push(option.history)
    }
}

displayEvent(characterState, firstEvent)
