const path = require('path');

const hardwareDataTables = require(path.join(__dirname, 'views/scripts/hardwareDataTablesLabels.js'));
const {ipcRenderer} = require('electron');
const {createHardwareTable} = require(path.join(__dirname, 'views/scripts/utils.js'));

ipcRenderer.on("data:hardware", (e, data) => {
    const details_data_wrapper = document.querySelector('#details_data_wrapper');
    hardwareDataTables.forEach(hardwareDataTable => {
        const header = document.createElement('h4');
        header.classList.add('mt-5', 'mb-4');
        header.innerText = hardwareDataTable.header;
        details_data_wrapper.appendChild(header);

        if(Array.isArray(data[hardwareDataTable.prop])){
            data[hardwareDataTable.prop].forEach(item => details_data_wrapper.appendChild(createHardwareTable(item, hardwareDataTable.columns)));
        }
        else{
            details_data_wrapper.appendChild(createHardwareTable(data[hardwareDataTable.prop], hardwareDataTable.columns));
        }
    })
});

ipcRenderer.on("data:receive", (e, data) => {
    for(const prop in data){
        for(const subprop in data[prop]){
            if(document.querySelector(`[data-${prop}="${subprop}"]`)){
                document.querySelector(`[data-${prop}="${subprop}"]`).innerText = data[prop][subprop]
            }
            if(document.querySelector(`[data-${prop}_chart="${subprop}"]`)){
                document.querySelector(`[data-${prop}_chart="${subprop}"]`).innerText = data[prop][subprop];
                document.querySelector(`[data-${prop}_chart="${subprop}"]`).style.width = data[prop][subprop];
            }
        }
    }
})

new Promise((resolve) => {
    setInterval(() => {
        if(document.querySelector('#details_data_wrapper').innerText && document.querySelector('[data-usage="disks"]').innerText && document.querySelector('[data-free="cpu"]').innerText){
            resolve();
        }
    }, 500)
}).then(() => {
    document.querySelector('#loader').remove();
    document.body.style.overflow = 'auto';
});