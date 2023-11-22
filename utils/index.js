const {cpu, mem} = require("node-os-utils");
const exec = require('child_process').exec;
const checkDiskSpace = require('check-disk-space').default;
const si = require('systeminformation');

const getAllDiskLetters = () => new Promise((resolve) => {
    exec("wmic logicaldisk get caption", async (error, stdout, stderr) => {
        const letters = stdout.split('\n').map(letter => letter.replace(/\s/g, '')).filter(letter => letter);
        letters.shift();
        resolve(letters);
    });
})

const getAllDiskUsedSpace = async () => {
        const disksLetters = await getAllDiskLetters();

        let allSize = 0;
        let freeSize = 0;

        for(let i = 0; i < disksLetters.length; i++){
            const diskSpace = await checkDiskSpace(disksLetters[i]);
            allSize += diskSpace.size;
            freeSize += diskSpace.free;
        }

        return (1 - (freeSize / allSize)).toFixed(2) * 100;
}

const getAllDiskFreeSpace = async () => {
    const disksLetters = await getAllDiskLetters();

    let allSize = 0;
    let freeSize = 0;

    for(let i = 0; i < disksLetters.length; i++){
        const diskSpace = await checkDiskSpace(disksLetters[i]);
        allSize += diskSpace.size;
        freeSize += diskSpace.free;
    }

    return freeSize / allSize.toFixed(2) * 100;
}

const getAllData = async () => {
    return {
        usage: {
            cpu: (await cpu.usage()).toFixed() + "%",
            ram: (await mem.info()).usedMemPercentage + "%",
        },
        free: {
            cpu: (await cpu.free()).toFixed() + "%",
            ram: (await mem.info()).freeMemPercentage + "%",
        }
    }
}

const getDisksData = async () => {
    return {
        usage: {
            disks: (await getAllDiskUsedSpace()).toFixed() + "%"
        },
        free: {
            disks: (await getAllDiskFreeSpace()).toFixed() + "%"
        }
    }
}

const getHardwareSystemPartInfo = (callback = []) => new Promise((resolve) => callback(resolve));

const getObjectSelectedProperties = (inputObject, properties) => {
    if(properties.length){
        if(Array.isArray(inputObject)){
            const arr = [];
            inputObject.forEach(resultItem => {
                const obj = {};
                properties.forEach(prop => obj[prop] = resultItem[prop]);
                arr.push(obj);
            })
            return (arr);
        }
        else {
            const obj = {};
            properties.forEach(prop => obj[prop] = inputObject[prop]);
            return(obj)
        }
    }
    return inputObject;
}



const getHardwareSystemAllInfo = async () => {
    return {
        cpu: getObjectSelectedProperties(await getHardwareSystemPartInfo(si.cpu), ['manufacturer', 'brand', 'speed', 'speedMin', 'speedMax', 'cores']),
        ramLayout: getObjectSelectedProperties(await getHardwareSystemPartInfo(si.memLayout), ['manufacturer', 'serialNum', 'size','bank', 'clockSpeed']),
        graphics: getObjectSelectedProperties((await getHardwareSystemPartInfo(si.graphics)).controllers, ['vendor', 'model', 'bus', 'vram', 'driverVersion']),
        displays: getObjectSelectedProperties((await getHardwareSystemPartInfo(si.graphics)).displays, ['connection', 'resolutionX', 'resolutionY']),
        disksLayout: getObjectSelectedProperties((await getHardwareSystemPartInfo(si.diskLayout)), ['name', 'type', 'size', ]),
    }
}


module.exports = {getAllDiskLetters, getAllDiskUsedSpace, getAllDiskFreeSpace, getAllData, getDisksData, getHardwareSystemAllInfo }