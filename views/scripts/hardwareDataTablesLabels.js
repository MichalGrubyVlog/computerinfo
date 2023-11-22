module.exports =  [
    {
        header: 'Procesor',
        prop: 'cpu',
        columns: [
            {
                prop: 'manufacturer',
                label: 'Producent',
            },
            {
                prop: 'brand',
                label: 'Model',
            },
            {
                prop: 'cores',
                label: 'Liczba rdzeni',
            },
            {
                prop: 'speed',
                label: 'Prędkość',
                unit: 'GHz'
            }
        ]
    },
    {
        header: 'RAM',
        prop: 'ramLayout',
        columns: [
            {
                prop: 'manufacturer',
                label: 'Producent',
            },
            {
                prop: 'serialNum',
                label: 'Numer seryjny',
            },
            {
                prop: 'size',
                label: 'Rozmiar',
                needRecalculate: true

            },
            {
                prop: 'clockSpeed',
                label: 'Prędkość',
                unit: 'MHz'
            },
            {
                prop: 'bank',
                label: 'Bank (slot)',
            },
        ]
    },
    {
        header: 'Karty graficzne',
        prop: 'graphics',
        columns: [
            {
                prop: 'vendor',
                label: 'Producent',
            },
            {
                prop: 'model',
                label: 'Model',
            },
            {
                prop: 'vram',
                label: 'Pamięć VRAM',
                needRecalculate: true
            },
            {
                prop: 'driverVersion',
                label: 'Sterownik',
            },
            {
                prop: 'bus',
                label: 'Szyna',
            },
        ]

    },
    {
        header: 'Monitory',
        prop: 'displays',
        columns: [
            {
                prop: 'connection',
                label: 'Złącze',
            },
            {
                prop: 'resolutionX',
                label: 'Szerokość',
                unit: 'px'
            },
            {
                prop: 'resolutionY',
                label: 'Wysokość',
                unit: 'px'
            }
        ]
    },
    {
        header: 'Dyski',
        prop: 'disksLayout',
        columns: [
            {
                prop: 'name',
                label: 'Nazwa',
            },
            {
                prop: 'type',
                label: 'Typ',
            },
            {
                prop: 'size',
                label: 'Rozmiar',
                needRecalculate: true
            },
        ]
    },

];