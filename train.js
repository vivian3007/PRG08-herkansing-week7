function loadData() {
    Papa.parse("./data/mobilephones.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => prepareData(results.data)
    })
}

function prepareData(data) {
    const nn = ml5.neuralNetwork({task: 'regression', debug: true})

    //split into test and train data
    data.sort(() => Math.random() > 0.5)
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    function selectFeatures(row) {
        return {
            sale: row.sale,
            weight: row.weight,
            // resolution: row.resolution,
            ppi: row.ppi,
            cores: row.cores,
            cpu: row.cpu,
            memory: row.memory,
            storage: row.storage,
            rearcam: row.rearcam,
            frontcam: row.frontcam,
            battery: row.battery,
            thickness: row.thickness
        };
    }

    for (let row of trainData) {
        const selectedFeatures = selectFeatures(row);
        nn.addData(selectedFeatures, { price: row.price });
    }

    nn.normalizeData();
    nn.train({ epochs: 6 }, () => trainCompleted(nn));
}

function trainCompleted(nn) {
    let button = document.getElementById('save')
    button.addEventListener('click', () => saveModel(nn));
}

function saveModel(nn) {
    nn.save()
}

loadData()
