const nn = ml5.neuralNetwork({task: 'regression'})
nn.load('model/model.json', modelLoaded)

async function modelLoaded() {
    console.log("the model was loaded!")
}

let predictButton = document.getElementById('predict')
predictButton.addEventListener('click', ev => predict(ev))

async function predict(ev) {
    let saleValue = document.getElementById('sale').value;
    let weightValue = document.getElementById('weight').value;
    let ppiValue = document.getElementById('ppi').value;
    let coresValue = document.getElementById('cores').value;
    let cpuValue = document.getElementById('cpu').value;
    let memoryValue = document.getElementById('memory').value;
    let storageValue = document.getElementById('storage').value;
    let rearcamValue = document.getElementById('rearcam').value;
    let frontcamValue = document.getElementById('frontcam').value;
    let batteryValue = document.getElementById('battery').value;
    let thicknessValue = document.getElementById('thickness').value;

    const result = await nn.predict({
        sale: parseInt(saleValue),
        weight: parseInt(weightValue),
        ppi:parseInt(ppiValue),
        cores: parseInt(coresValue),
        cpu: parseInt(cpuValue),
        memory: parseInt(memoryValue),
        storage: parseInt(storageValue),
        rearcam: parseInt(rearcamValue),
        frontcam: parseInt(frontcamValue),
        battery: parseInt(batteryValue),
        thickness: parseInt(thicknessValue)
    })
    console.log(result)

    //prediction
    let prediction = document.getElementById('prediction')
    prediction.innerHTML = `De prijs is: €${result[0].price.toFixed(2)}`;
}
