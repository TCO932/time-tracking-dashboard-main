const cardContainer = document.getElementById('card-container')
const createSection = (item) => {
    filters = ['daily', 'weekly', 'monthly']
    return (filter) => {
        const section = document.createElement('section');
        section.classList.add(item.title.toLowerCase().split(' ').join('-'))
        section.innerHTML = `
            <div class="card">
                <div class="header">
                    <span>
                        ${item.title}
                    </span>
                    <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
                </div>
                <div class="container">
                    <h1>
                        ${item.timeframes[filter].current}hrs
                    </h1>
                    <span>
                        Previous - ${item.timeframes[filter].previous}hrs   
                    </span>
                </div>
            </div>
        `
        return section;
    }
};


const radioButtons = document.querySelectorAll('input[name="filter"]');
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            onFilterUpdate(radio.value);
        }
    });
});

function onFilterUpdate(filter) {
    cardContainer.innerHTML = '';
    dashboardData.forEach(item => cardContainer.appendChild(item(filter)))
}

const dashboardData = [] 
window.onload = () => {
    fetch('/data.json').then((request) => {
        if(!request.ok) {
            console.log('Oops! Something went wrong.');
            return null;
        }
  
        return request.json();
    }).then((data) => {
        data.forEach(item => dashboardData.push(createSection(item)))
        dashboardData.forEach(item => cardContainer.appendChild(item('daily')))
    });
}
