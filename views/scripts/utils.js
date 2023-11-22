const convertFromBytes = (x) => {
    const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    let l = 0, n = parseInt(x, 10) || 0;

    while(n >= 1024 && ++l){
        n = n/1024;
    }

    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

const createHardwareTable = (obj, columns) => {
    const table = document.createElement('table');
    table.classList.add('table');

    const tbody = document.createElement('tbody');

    columns.forEach(column => {
        const tbodyTr = document.createElement('tr');

        const labelTd = document.createElement('td');
        labelTd.innerText = column.label;
        labelTd.style.width = "50%";

        const valueTd = document.createElement('td');
        valueTd.innerHTML = `<b>${column.needRecalculate ? convertFromBytes(obj[column.prop]) : obj[column.prop]} ${column.unit ? column.unit : ''}</b>`;
        valueTd.style.width = "50%";

        tbodyTr.append(labelTd, valueTd);
        tbody.append(tbodyTr);
    })


    table.appendChild(tbody);

    return table;
}


module.exports = {createHardwareTable};